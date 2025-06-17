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
    <div className="w-1/2 h-20 fixed bottom-2 flex items-center justify-center bg-gray-900 rounded-xl">
      <Textarea
        placeholder="Analyze your startup idea"
        className="flex-1 m-2 h-4/5 border-none bg-gray-700 text-white"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent newline
            handleSend(); // Send the message
          }
        }}
        value={message}
      />
      <Button
        className="mt-6 m-0.5 mr-2.5 border-2 border-black bg-white text-black"
        onClick={handleSend}
      >
        <Send />
      </Button>
    </div>
  );
}
