import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--montserrat" });

export const metadata: Metadata = {
  title: "ConvAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen montserrat antialiased",
          montserrat.variable
        )}>
        <NextTopLoader/>
        <main>{children}</main>
      </body>
    </html>
  );
}
