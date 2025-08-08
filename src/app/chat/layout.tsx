import SideBar from "@/components/SideBar";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
