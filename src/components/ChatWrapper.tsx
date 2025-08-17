import { LogOut } from "lucide-react";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "next-auth/react";

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full border-12 border-neutral-800 shadow-md p-4">
      <div className="absolute bg-neutral-800 top-0 right-0 flex items-center pr-3 pt-3 pb-1 pl-1 justify-center gap-2 rounded-2xl">
        <ModeToggle />
        <button className="cursor-pointer" onClick={() => signOut()}>
          <LogOut className="h-[1.2rem] w-[1.2rem]" />
        </button>
      </div>
      {children}
    </div>
  );
};

export default ChatWrapper;
