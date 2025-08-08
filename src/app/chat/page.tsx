"use client";

import NewChatModal from "@/components/NewChatModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import NewChatNavbar from "@/components/NewChatNavbar";
import NewMessageBox from "@/components/NewMessageBox";

const parentVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function ChatHome() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatLogs, setChatLogs] = useState<z.infer<typeof ChatSessionSchema>[]>(
    []
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchSessions = async () => {
        const res = await fetch(`/api/get-sessions?userId=${session.user.id}`);
        const data = await res.json();
        setChatLogs(data.sessions);
      };

      fetchSessions();
    }
  }, [session]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/?loginRequired=true");
    }
  }, [status, router]);

  const handleNewChat = async (title: string) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/new-chat", { title });
      const { sessionId } = res.data;
      router.push(`/chat/${sessionId}`);
      setLoading(false);
    } catch (err) {
      console.error("Failed to create new chat session", err);
    }
  };

  if (status === "loading")
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-black to-gray-950 p-8">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-12 justify-center items-center">
      <h1 className="text-4xl font-semibold">What're you upto today?</h1>
      <NewMessageBox />
    </div>
  );
}
