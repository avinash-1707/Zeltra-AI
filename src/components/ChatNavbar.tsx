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
      className="py-3 min-w-6xl h-15 px-24 flex justify-end sticky top-0 z-50 items-center"
    >
      <Profile />
    </motion.div>
  );
}
