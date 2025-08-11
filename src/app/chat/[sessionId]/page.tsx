"use client";

import ChatNavbar from "@/components/ChatNavbar";
import MessageLogs from "@/components/MessageLogs";
import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";

export default function Chat() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  return (
    <div className="h-screen flex flex-col overflow-auto">
      <ChatNavbar />
      <MessageLogs sessionId={sessionId} />
    </div>
  );
}
