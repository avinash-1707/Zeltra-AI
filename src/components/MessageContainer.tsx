interface MessageContainerProps {
  role: string;
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
              ? "bg-gray-200 text-gray-900 rounded-bl-none"
              : "bg-blue-600 text-white rounded-br-none"
          }
        `}
      >
        {content}
      </div>
      {/* AI avatar shown on right */}
      {role === "ai" && (
        <div className="flex-shrink-0">
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.futurepedia.io%2Fai-tools%2Favatar-generator&psig=AOvVaw3ncGsSnztS05jmOKhOfIaI&ust=1750114924940000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjq_6XE9I0DFQAAAAAdAAAAABAE"
            alt="AI Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
