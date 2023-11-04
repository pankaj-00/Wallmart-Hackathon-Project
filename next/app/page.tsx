import Categories from "@/components/Categories";
import TopProducts from "@/components/TopProducts";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Session,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import { useEffect } from "react";

export default async function Home() {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return (
      <main className="flex min-h-screen flex-col items-center md:gap-y-20 gap-y-5 max-w-screen overflow-x-hidden">
        <Navbar session={session as Session} />
        <Categories />
        <TopProducts />
        <Contact session={session as Session} />
        <Footer />
      </main>
    );
  } catch (e) {
    console.log("Error in main page.tsx file", e);
  }
}
