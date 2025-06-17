"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatHome() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/?loginRequired=true");
    }
  }, [status, router]);

  const handleCreateChat = async () => {
    setLoading(true);
    const res = await fetch("/api/new-chat", { method: "POST" });

    if (res.status === 401) {
      router.push("/?loginRequired=true");
      return;
    }

    const data = await res.json();
    router.push(`/chat/${data.sessionId}`);
  };

  if (status === "loading") return <div>Loading session...</div>;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <button
        onClick={handleCreateChat}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        {loading ? "Creating..." : "➕ New Chat"}
      </button>
    </div>
  );
}
