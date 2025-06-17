"use client";

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
      <div className="flex-1 h-full overflow-y-auto bg-black text-white px-32">
        <MessageLogs sessionId={sessionId} />
      </div>
    </div>
  );
}
