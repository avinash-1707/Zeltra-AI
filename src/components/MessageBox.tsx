"use client";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function MessageBox({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    console.log("Sending:", message);
    setMessage("");
  };

  return (
    <div className="w-3/5 h-20 fixed bottom-2 flex items-center justify-evenly bg-gray-800 rounded-xl">
      <Textarea
        placeholder="Analyze your startup idea"
        className="flex-1 m-2 h-4/5 border-none bg-gray-600 text-white"
        onChange={handleChange}
        value={message}
      />
      <Button
        className="mt-6 mr-1.5 border-2 border-black bg-white text-black"
        onClick={handleSend}
      >
        <Send />
      </Button>
    </div>
  );
}
