import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import MessageBox from "./MessageBox";
import MessageContainer from "./MessageContainer";
import { motion } from "motion/react";
import { useChatDraftStore } from "@/context/store";

interface Message {
  role: "human" | "ai";
  content: string;
  createdAt: Date;
}

interface messageboxInput {
  userInput: string;
  model: string;
}

interface ChatDraftStore {
  draftMessage: string;
  setDraftMessage: (msg: string) => void;
  clearDraftMessage: () => void;
}
export default function MessageLogs({ sessionId }: { sessionId: string }) {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  const { draftMessage, clearDraftMessage } =
    useChatDraftStore() as ChatDraftStore;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<
    number | null
  >(null);
  const hasMounted = useRef(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isUserScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = (behavior: "smooth" | "instant" = "smooth") => {
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior,
        block: "end",
        inline: "nearest",
      });
    });
  };

  // Detect user scrolling
  useEffect(() => {
    const handleScroll = () => {
      isUserScrolling.current = true;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Reset user scrolling flag after 1 second of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrolling.current = false;
      }, 1000);
    };

    const scrollContainer = document.querySelector(".messages-container");
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Load messages from DB on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/get-messages?sessionId=${sessionId}`);
        const { messages } = await res.data;
        console.log(messages);

        const parsed: Message[] = messages.map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
        }));

        setMessages(parsed);
        setHasLoaded(true);

        // Scroll to bottom after initial load with a slight delay
        setTimeout(() => {
          scrollToBottom("instant");
        }, 100);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setHasLoaded(true);
      }
    };
    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // Skip scroll on initial load
    }

    // Only auto-scroll if user isn't manually scrolling
    if (!isUserScrolling.current) {
      // Use a small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }
  }, [messages]);

  // Handle scrolling during streaming
  useEffect(() => {
    if (streamingMessageIndex !== null) {
      // Scroll immediately when streaming starts (only if user isn't scrolling)
      if (!isUserScrolling.current) {
        scrollToBottom();
      }

      // Set up periodic scrolling during streaming
      scrollIntervalRef.current = setInterval(() => {
        if (!isUserScrolling.current) {
          scrollToBottom();
        }
      }, 300); // Scroll every 300ms during streaming
    } else {
      // Clear scroll interval when streaming stops
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };
  }, [streamingMessageIndex]);

  useEffect(() => {
    const setInitialMessage = async () => {
      if (draftMessage.trim()) {
        handleSend({ userInput: draftMessage, model: "gemini-2.0-flash" });
      }
      clearDraftMessage();
    };
  }, [sessionId]);

  const handleSend = async ({ userInput, model }: messageboxInput) => {
    if (!userInput.trim()) return;
    setLoading(true);

    // UI update
    const userMessage: Message = {
      role: "human",
      createdAt: new Date(),
      content: userInput,
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      scrollToBottom();
    }, 100);

    try {
      // sending to chatbot
      const res = await axios.post("/api/analyze", {
        sessionId,
        message: userInput,
        model,
      });

      // AI message
      const aiMessage: Message = {
        role: "ai",
        content: res.data.content,
        createdAt: new Date(),
      };

      // Add the message and set it to stream
      setMessages((prev) => {
        const newMessages = [...prev, aiMessage];
        setStreamingMessageIndex(newMessages.length - 1); // setting the index of the streaming message
        return newMessages;
      });

      setTimeout(() => {
        scrollToBottom();
      }, 100);

      // Stop streaming after the animation completes
      setTimeout(() => {
        setStreamingMessageIndex(null);
      }, res.data.content.length * 20 + 500); // 20ms per character + buffer
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-neutral-950 flex flex-col h-screen">
      <div className="messages-container h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          {hasLoaded && messages.length === 0 ? (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col h-full items-center justify-center min-h-[60vh]"
            >
              <div className="text-center bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent text-5xl">
                Hi{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
              </div>
              <div className="text-center text-white/70 text-2xl">
                What are you thinking about building today?
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <MessageContainer
                  key={`${msg.role}-${idx}-${msg.createdAt.getTime()}`}
                  role={msg.role}
                  name={user?.name ?? "Anonymous"}
                  avatarUrl={user?.avatarUrl ?? ""}
                  content={msg.content}
                  isStreaming={idx === streamingMessageIndex}
                />
              ))}
              {loading && (
                <MessageContainer
                  role="ai"
                  name="Zeltra"
                  avatarUrl="/ai-avatar.jpg"
                  content="Thinking..."
                />
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex justify-center w-full p-4 bg-neutral-950">
        <MessageBox disabled={loading} onSend={handleSend} />
      </div>
    </div>
  );
}
