"use client";

import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { Menu, PanelRightOpen } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleNewChat = async (title: string) => {
    try {
      const res = await axios.post("/api/new-chat", { title });
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
    <div className="h-full bg-neutral-200 dark:bg-neutral-900">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={isCollapsed ? "closed" : "open"}
        variants={sidebarVariants}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className=" h-full bg-neutral-200 dark:bg-neutral-900 shadow-lg text-white overflow-hidden"
      >
        {/* Rest of the sidebar content remains the same */}
        <div className="p-4 flex justify-between items-center">
          {!isCollapsed && (
            <h2
              role="button"
              onClick={() => router.push("/")}
              className="text-xl font-bold text-black dark:text-white cursor-pointer"
            >
              Zeltra AI
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-neutral-300 dark:hover:bg-gray-800 rounded text-black dark:text-white"
          >
            {isCollapsed ? <Menu size={24} /> : <PanelRightOpen size={24} />}
          </button>
        </div>
        <motion.div
          variants={newChatButtonVariants}
          className="flex justify-center"
        >
          {!isCollapsed && (
            <motion.button
              variants={childVariants}
              onClick={() => router.push("/chat")}
              className="w-3/4 px-3 py-2 mt-6 bg-blue-400 hover:bg-blue-300 dark:bg-blue-950 dark:hover:bg-blue-800 text-black dark:text-white rounded-3xl text-center"
            >
              + New Chat
            </motion.button>
          )}
        </motion.div>
        <motion.nav
          variants={parentVariants}
          className="my-6 h-3/4 flex flex-col flex-1 overflow-y-auto custom-scrollbar"
        >
          {chatLogs.map((item, index) => (
            <motion.div
              variants={childVariants}
              key={index}
              onClick={() => router.push(`/chat/${item.id}`)}
              className={`px-4 py-3 flex items-center hover:bg-gray-300 dark:hover:bg-gray-700 bg-transparent cursor-pointer rounded-2xl text-black/80 dark:text-white/80 ${
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
