import { prisma } from "@/lib/prisma";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import MessageBox from "./MessageBox";
import MessageContainer from "./MessageContainer";
import { v4 } from "uuid";
import { motion } from "motion/react";
import { Separator } from "./ui/separator";
interface Message {
  role: "human" | "ai";
  content: string;
  createdAt: Date;
}

export default function MessageLogs({ sessionId }: { sessionId: string }) {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasMounted = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages from DB on mount
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/api/get-messages?sessionId=${sessionId}`);
      const { messages } = await res.data;
      console.log(messages);

      const parsed: Message[] = messages.map((msg: any) => ({
        ...msg,
        createdAt: new Date(msg.createdAt),
      }));

      setMessages(parsed);
      setHasLoaded(true);
    };
    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // Skip scroll on initial load
    }
    scrollToBottom();
  }, [messages]);

  const handleSend = async (userInput: string) => {
    if (!userInput.trim()) return;
    setLoading(true);

    // UI update
    const userMessage: Message = {
      role: "human",
      createdAt: new Date(),
      content: userInput,
    };
    setMessages((prev) => [...prev, userMessage]);

    // sending to chatbot
    const res = await axios.post("/api/analyze", {
      sessionId,
      message: userInput,
    });

    const now = new Date();
    // AI message
    const aiMessage: Message = {
      role: "ai",
      content: res.data.content,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);

    setLoading(false);
  };
  return (
    <div className="bg-neutral-950 flex flex-col min-h-screen justify-between items-center">
      <div className="max-w-4xl mt-3 space-y-4 overflow-y-auto  mb-20">
        {hasLoaded && messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 flex-col h-screen items-center justify-center"
          >
            <div className="text-center bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent text-5xl">
              Hi{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
            </div>
            <div className="text-center text-white/70 text-2xl">
              What are you thinking about building today?
            </div>
          </motion.div>
        ) : (
          messages.map((msg, idx) => (
            <MessageContainer
              key={v4()}
              role={msg.role}
              name={user?.name ?? "Anonymous"}
              avatarUrl={user?.avatarUrl ?? ""}
              content={msg.content}
              isStreaming={idx === messages.length - 1 && msg.role === "ai"}
            />
          ))
        )}
        {loading && (
          <MessageContainer
            role="ai"
            name="Zeltra"
            avatarUrl="/ai-avatar.jpg"
            content="Typing..."
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex justify-center w-full">
        <MessageBox onSend={handleSend} />
      </div>
    </div>
  );
}
