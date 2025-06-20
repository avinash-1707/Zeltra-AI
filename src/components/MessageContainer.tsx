import { useEffect, useState } from "react";
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
  const [streamedContent, setStreamedContent] = useState(
    isStreaming ? "" : content
  );

  useEffect(() => {
    if (!isStreaming) return;

    let index = 0;
    const interval = setInterval(() => {
      setStreamedContent((prev) => prev + content[index]);
      index++;
      if (index >= content.length) {
        clearInterval(interval);
      }
    }, 20); // ms per character

    return () => clearInterval(interval);
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
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`
          px-4 py-2 rounded-2xl
          ${
            role === "human"
              ? "max-w-[600px] bg-blue-950/50 text-white rounded-bl-none self-start"
              : "w-[1200px] my-12 bg-transparent text-white self-end"
          }
        `}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {streamedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
