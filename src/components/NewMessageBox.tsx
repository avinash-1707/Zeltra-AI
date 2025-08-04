"use client";
import { Button } from "./ui/button";
import { ArrowRight, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import axios from "axios";
import { useChatDraftStore } from "@/context/store";
import { useRouter } from "next/navigation";

interface ChatDraftStore {
  setDraftMessage: (message: string) => void;
}

export default function NewMessageBox() {
  const router = useRouter();
  const { setDraftMessage } = useChatDraftStore() as ChatDraftStore;
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const res = await axios.post("/api/auto-initiate", { message: message });
      if (res.data?.sessionId) {
        setDraftMessage(message);
        router.push(`/chat/${res.data.sessionId}`);
      }
      setMessage("");
    } catch (error: any) {
      if (error.response?.status) {
        router.push("/?loginRequired=true");
        return;
      }
    }
  };

  return (
    <div className="">
      <div className="w-full h-24 flex gap-1 px-3 py-2 bg-neutral-900/20 dark:bg-neutral-200/20 rounded-2xl border border-neutral-400/50 dark:border-neutral-500/50 backdrop-blur-xl z-50">
        <Textarea
          placeholder="Type your startup idea ..."
          className="w-full border-none text-white/70 resize-none"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          value={message}
        />
        <div className="px-2 flex justify-between items-center">
          <Button
            className={`mt-6 m-0.5 bg-neutral-300/90 hover:bg-neutral-300/70 cursor-pointer text-black
          }`}
            onClick={handleSend}
          >
            <Send />
          </Button>
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col md:flex-row justify-center items-center gap-4">
        <Button
          variant="outline"
          className="rounded-full font-semibold text-sm bg-transparent dark:border-white/50 border-black/50 hover:bg-black/10"
          onClick={() =>
            setMessage(
              "I want to build a study platform to make study easy even for working professionals."
            )
          }
        >
          Let's build a Study Platform
        </Button>
        <Button
          variant="outline"
          className="rounded-full font-semibold text-sm bg-transparent dark:border-white/50 border-black/50 hover:bg-black/10"
          onClick={() =>
            setMessage(
              "I want to build a website builder tool to help non-technical people build websites."
            )
          }
        >
          Let's create a Website Builder
        </Button>
        <Button
          className="rounded-full font-semibold text-sm group hover:scale-x-105 duration-300 dark:border-white/50 border-black/50 dark:hover:bg-white/70 hover:bg-black/80"
          onClick={() => router.push("/chat")}
        >
          Go to your chat history{" "}
          <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
        </Button>
      </div>
    </div>
  );
}
