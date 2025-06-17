"use client";
import { signIn } from "next-auth/react";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 z-50 backdrop-blur">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">Sign In</h2>
        <button
          onClick={() => signIn("google", { callbackUrl: "/chat" })}
          className="w-full bg-blue-500 text-white py-2 rounded mb-2"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/chat" })}
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
