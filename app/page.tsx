import Categories from "@/components/Categories";
import TopProducts from "@/components/TopProducts";
import Contact from "@/components/Contact";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-20">
      <Categories />
      <TopProducts />
      <Contact />
    </main>
  );
}
