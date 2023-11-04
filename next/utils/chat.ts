import { SupabaseClient } from "@supabase/supabase-js";

type chatDetails = {
    msg: string;
    sender: string;
}

export async function updateChat(newChat: Array<chatDetails>, user: { id: number }, supabase: SupabaseClient) {
    try {
        if (user?.id) {
            console.log("init updateChat");

            const { data, error } = await supabase
                .from("profiles")
                .update({ chat: newChat })
                .eq("id", user.id);

            if (error) {
                console.error("Error when updating chat history:", error);
            } else {
                console.log("Successfully pushed the changes", data);
            }
        }
    } catch (e) {
        console.error("Error in updateChat:", e);
    }
}

export async function fetchChat(user: { id: number }, supabase:SupabaseClient): Promise<chatDetails[]>{
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`chat`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data && data.chat) {
        return data.chat;
      }

      return [];
    } catch (error) {
      alert("Error loading user data!");
      return [];
    }
  }

export default {
    updateChat,
    fetchChat
}