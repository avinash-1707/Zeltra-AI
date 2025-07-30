"use client";
import { Button } from "./ui/button";
import { CircleStopIcon, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useChatDraftStore } from "@/context/store";
import { useRouter } from "next/navigation";

interface ChatDraftStore {
  setDraftMessage: (message: string) => void;
}

export default function NewMessageBox() {
  const router = useRouter();
  const { setDraftMessage } = useChatDraftStore() as ChatDraftStore;
  const [model, setModel] = useState("gemini-2.0-flash");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    const res = await axios.post("/api/auto-initiate", { message: message });
    if (res.data?.sessionId) {
      setDraftMessage(message);
      router.push(`/chat/${res.data.sessionId}`);
    }
    setMessage("");
  };

  return (
    <div className="w-1/2 h-27 bottom-0 fixed flex flex-col gap-1 px-1 py-2 justify-center bg-gray-900 rounded-t-xl z-50">
      <Textarea
        placeholder="Analyze your startup idea ..."
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
      <div className="w-full px-2 flex justify-between items-center">
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-fit text-[12px]">
            <SelectValue placeholder={model} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="gemini-2.0-flash">gemini-2.0-flash</SelectItem>
              <SelectItem value="llama-3.3-70b-versatile">
                llama-3.3-70b-versatile
              </SelectItem>
              <SelectItem value="llama-3.1-8b-instant">
                llama-3.1-8b-instant
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className={`mt-6 m-0.5 bg-neutral-300/90 hover:bg-neutral-300/70 cursor-pointer text-black
          }`}
          onClick={handleSend}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
