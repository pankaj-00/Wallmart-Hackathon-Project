"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <div className="flex justify-center items-center h-[100vh]">
    <div className="p-5 bg-stone-900 w-1/4 rounded-md">
    <Auth
      supabaseClient={supabase}
      providers={['google', 'github']}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "rgb(66, 103, 178)",
              brandAccent: "blue",
            },
          },
        },
      }}
      theme="dark"
      showLinks={true}
      redirectTo="http://localhost:3000/auth/callback"
    />
    </div>
    </div>
  );
}
