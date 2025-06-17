"use client";

import MessageLogs from "@/components/MessageLogs";
import { useParams } from "next/navigation";

export default function Chat() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  return <MessageLogs sessionId={sessionId} />;
}
