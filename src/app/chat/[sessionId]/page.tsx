"use client";

import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Chat({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  return (
    <>
      <h1>Chat Page</h1>
      {session ? (
        <>
          <span className="mr-4 text-black/70 text-xl">
            Welcome, {user?.name || user?.email}
          </span>
          <span>{user?.avatarUrl}</span>
          <Button onClick={() => signOut()} className="w-full md:w-auto">
            Logout
          </Button>
        </>
      ) : (
        <Button className="w-full md:w-auto" onClick={() => signIn("google")}>
          Login
        </Button>
      )}
    </>
  );
}
