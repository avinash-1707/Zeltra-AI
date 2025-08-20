"use client";

import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { Menu, PanelRightOpen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const handleChatDelete = async (chatId: string) => {
    const res = await axios.delete(`/api/delete-chat/${chatId}`);
    if (res.data.message) {
      console.log(res.data.message);
    }
    router.push("/chat");
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
              className={`relative px-4 py-3 flex items-center hover:bg-gray-300 group dark:hover:bg-gray-700 bg-transparent duration-300 rounded-2xl text-black/80 dark:text-white/80 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="absolute p-2 hover:bg-white/10 rounded-2xl opacity-0 group-hover:opacity-90 right-0 border-none z-50 cursor-pointer">
                    <Trash className="size-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you want to delete the chat history '{item.title}'?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleChatDelete(item.id as string)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>
    </div>
  );
}
