"use client";

import ChatNavbar from "@/components/ChatNavbar";
import ChatWrapper from "@/components/ChatWrapper";
import MessageLogs from "@/components/MessageLogs";
import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";

export default function Chat() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  return (
    <ChatWrapper>
      <div className="w-full h-full overflow-auto scrollbar-hide">
        <MessageLogs sessionId={sessionId} />
      </div>
    </ChatWrapper>
  );
}
