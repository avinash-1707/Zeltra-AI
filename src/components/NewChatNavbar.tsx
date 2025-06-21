import React from "react";
import Profile from "./Profile";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

export default function NewChatNavbar() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeIn",
      }}
      className="mt-3 w-4xl h-12 px-18 mx-24 rounded-3xl bg-transparent flex justify-between fixed top-0 items-center"
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
