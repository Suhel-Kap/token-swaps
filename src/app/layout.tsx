import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Web3Provider } from "@/components/Web3Provider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TokenSwap",
  description: "A simple app to track token prices and swap tokens.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Web3Provider>
          <Header />
          {children}
          {modal}
          <div id="modal-root" />
        </Web3Provider>
        <Toaster />
      </body>
    </html>
  );
}
