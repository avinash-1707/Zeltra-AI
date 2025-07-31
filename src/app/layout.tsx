import type { Metadata } from "next";
import { Nunito_Sans, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";

const ns = Nunito_Sans({
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
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className={`${ns.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
