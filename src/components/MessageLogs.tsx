import { prisma } from "@/lib/prisma";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import MessageBox from "./MessageBox";
import MessageContainer from "./MessageContainer";
import { v4 } from "uuid";
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
    };
    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
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
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto mb-20">
        {messages.map((msg) => (
          <MessageContainer
            key={v4()}
            role={msg.role}
            name={user?.name ?? "Anonymous"}
            avatarUrl={
              user?.avatarUrl ??
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.futurepedia.io%2Fai-tools%2Favatar-generator&psig=AOvVaw3ncGsSnztS05jmOKhOfIaI&ust=1750114924940000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjq_6XE9I0DFQAAAAAdAAAAABAE"
            }
            content={msg.content}
          />
        ))}
        {loading && (
          <MessageContainer
            role="ai"
            name="Zeltra"
            avatarUrl="/ai-avatar.jpg"
            content="Typing..."
          />
        )}
      </div>

      <div className="flex justify-center w-full">
        <MessageBox onSend={handleSend} />
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
