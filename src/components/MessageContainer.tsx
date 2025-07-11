import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageContainerProps {
  role: "human" | "ai";
  content: string;
  avatarUrl: string;
  name: string;
  isStreaming?: boolean;
}

export default function MessageContainer({
  role,
  content,
  avatarUrl,
  name,
  isStreaming = false,
}: MessageContainerProps) {
  const [displayContent, setDisplayContent] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isStreaming) {
      // If not streaming, show full content immediately
      setDisplayContent(content);
      return;
    }

    // If streaming, start the typewriter effect
    setDisplayContent("");
    let index = 0;

    intervalRef.current = setInterval(() => {
      if (index <= content.length) {
        setDisplayContent(content.slice(0, index));
        index++;
      } else {
        // Animation complete, clear interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 20);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [content, isStreaming]);

  return (
    <div
      className={`
        w-full flex items-end gap-3 my-2
        ${role == "human" ? "justify-start" : "justify-end"}
      `}
    >
      {/* Human avatar shown on left */}
      {role === "human" && (
        <div className="flex-shrink-0">
          <Image
            src={avatarUrl || "/default-avatar.png"}
            alt="User Avatar"
            height={32}
            width={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`
          text-md px-4 py-2 rounded-2xl
          ${
            role === "human"
              ? "max-w-[600px] bg-blue-950/50 text-white rounded-bl-none self-start"
              : "w-[1200px] my-8 bg-transparent text-white self-end"
          }
        `}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {displayContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
