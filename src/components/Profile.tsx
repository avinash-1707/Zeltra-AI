import { ChevronDown } from "lucide-react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="w-fit h-fit px-2 py-1 hover:bg-white/30 bg-white/20 rounded-full flex justify-between items-center cursor-pointer z-50"
          role="button"
        >
          <Image
            src={user?.avatarUrl as string}
            width={30}
            height={30}
            alt={user?.name as string}
            className="rounded-full"
          />
          <ChevronDown className="text-white ml-0.5" height={20} width={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/70 text-white/70 border-none">
        <DropdownMenuItem role="button" onClick={() => router.push("/chat")}>
          Start Chat
        </DropdownMenuItem>
        <DropdownMenuItem
          role="button"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
