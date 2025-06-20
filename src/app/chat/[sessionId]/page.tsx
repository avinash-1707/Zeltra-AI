"use client";

import ChatNavbar from "@/components/ChatNavbar";
import MessageLogs from "@/components/MessageLogs";
import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";

export default function Chat() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  return (
    <div className="flex h-screen">
      <div className="overflow-y-auto">
        <SideBar />
      </div>
      <div className="flex-1 h-full flex flex-col items-center bg-neutral-950 text-white">
        <div className="w-full">
          <ChatNavbar />
        </div>

        <div className="px-32 overflow-y-auto scrollbar-hide">
          <MessageLogs sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
}
