import { motion } from "motion/react";
import React from "react";
import Profile from "./Profile";
import Image from "next/image";
import Link from "next/link";

export default function ChatNavbar() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeIn",
      }}
      className="py-3 min-w-6xl h-15 px-24 bg-gray-600/10 flex justify-between sticky top-0 z-50 items-center"
    >
      <div>
        <Link
          href="/"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
        >
          <Image src="/zeltra-logo.png" alt="logo" width={30} height={30} />
          <span className="font-medium ml-1 text-white">Zeltra AI</span>
        </Link>
      </div>
      <Profile />
    </motion.div>
  );
}
