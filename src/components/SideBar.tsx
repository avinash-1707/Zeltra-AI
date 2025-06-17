"use client";

import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const sidebarVariants = {
  closed: {
    width: "4.5rem",
  },
  open: {
    width: "16rem",
  },
};

const parentVariants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const childVariants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -10,
  },
};

const newChatButtonVariants = {
  open: {
    opacity: 1,
    x: 0,
  },
  closed: {
    opacity: 0,
    x: -20,
  },
};

export default function SideBar() {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  const [chatLogs, setChatLogs] = useState<z.infer<typeof ChatSessionSchema>[]>(
    []
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const handleNewChat = async () => {
    try {
      const res = await axios.post("/api/new-chat");
      const { sessionId } = res.data;
      router.push(`/chat/${sessionId}`);
    } catch (err) {
      console.error("Failed to create new chat session", err);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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

  return (
    <div className="h-full bg-gray-950">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={isCollapsed ? "closed" : "open"}
        variants={sidebarVariants}
        // initial={{
        //   width: "4.5rem",
        // }}
        // animate={{
        //   width: isCollapsed ? "4.5rem" : "16rem",
        // }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="bg-gray-950 shadow-lg text-white overflow-hidden"
      >
        {/* Rest of the sidebar content remains the same */}
        <div className="p-4 flex justify-between items-center bg-gray-950">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-white">Zeltra AI</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-800 rounded text-white"
          >
            <Menu size={24} />
          </button>
        </div>
        <motion.div
          variants={newChatButtonVariants}
          className="flex justify-center"
        >
          {!isCollapsed && (
            <button
              onClick={handleNewChat}
              className="w-3/4 px-3 py-2 text-white bg-blue-950 hover:bg-blue-800 rounded-3xl text-center"
            >
              + New Chat
            </button>
          )}
        </motion.div>
        <motion.nav
          variants={parentVariants}
          className="mt-6 flex flex-col h-fit flex-1"
        >
          {chatLogs.map((item, index) => (
            <motion.div
              variants={childVariants}
              key={index}
              onClick={() => router.push(`/chat/${item.id}`)}
              className={`px-4 py-3 flex items-center hover:bg-gray-700 bg-gray-800 cursor-pointer border-b border-gray-500 text-white/80 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>
    </div>
  );
}
