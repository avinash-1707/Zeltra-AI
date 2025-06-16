import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function SideBar() {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  const [collapsed, setCollapsed] = useState(false);
  const [chatLogs, setChatLogs] = useState<z.infer<typeof ChatSessionSchema>[]>(
    []
  );

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
    <div
      className="h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } flex flex-col border-r border-gray-700`"
    >
      <div>zeltra.AI</div>
      {user ? (
        <div>
          {chatLogs.length == 0 ? (
            <p> This user doesn't have a fucking history</p>
          ) : (
            chatLogs.map((chatLog) => (
              <div key={chatLog.id}>
                <span title={chatLog.title}>{chatLog.title}</span>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>Sign in for keeping your ideas saved!</div>
      )}
    </div>
  );
}
