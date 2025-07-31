"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
import NewMessageBox from "../NewMessageBox";
import { Brain } from "lucide-react";

export const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative z-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <Badge className="text-sm rounded-full dark:bg-white/20 bg-black/20 cursor-default">
          <Brain />
          AI Powered Startup Intelligence
        </Badge>
        <h1 className="text-7xl font-bold mt-5">
          Refine your{" "}
          <span className="bg-gradient-to-l from-[#377d71] via-[#fbc5c5] to-[#fba1a1] dark:from-[#1f4a43] dark:via-[#8b6b6b] dark:to-[#8b4d4d] bg-clip-text text-transparent">
            Startup Idea
          </span>{" "}
          with AI
        </h1>
        <h3 className="text-center mt-5 font-semibold text-2xl text-neutral-800 dark:text-neutral-400">
          Zeltra AI helps you discover market niches, validate ideas, and
          generate
          <br /> prototype prompts to kickstart your next breakthrough.
        </h3>
        <div className="w-3/5 mt-16">
          <NewMessageBox />
        </div>
      </div>
    </section>
  );
};
