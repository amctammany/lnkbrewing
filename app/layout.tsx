import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavSidebar from "@/components/NavSidebar/NavSidebar";
import { RouteChangeListener } from "@/components/RouteChangeListener";
import { Suspense } from "react";
//import { SessionProvider } from "next-auth/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "LNK",
  description: "LNK app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <RouteChangeListener />
          <NavSidebar />

          <SidebarInset className="overflow-hidden">{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
