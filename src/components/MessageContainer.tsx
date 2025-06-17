import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageContainerProps {
  role: "human" | "ai";
  content: string;
  avatarUrl: string;
  name: string;
}

export default function MessageContainer({
  role,
  content,
  avatarUrl,
  name,
}: MessageContainerProps) {
  return (
    <div
      className={`
        flex items-end gap-3 my-2
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
          max-w-[60%] px-4 py-2 rounded-2xl
          ${
            role === "human"
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-800 text-white rounded-bl-none"
          }
        `}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
      {/* AI avatar shown on right */}
      {role === "ai" && (
        <div className="flex-shrink-0">
          <img
            src="/ai-avatar.jpg"
            alt="AI Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
