import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700"], // optional: define your needed weights
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Zeltra AI",
  description: "An AI tool to get you the prompt for your idea.",
  icons: { icon: "/zeltra-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${orbitron.variable} ${shareTechMono.variable} antialiased`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
