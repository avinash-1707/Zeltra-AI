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
    <section className="relative z-10 px-6 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center py-12">
        <Badge className="inline-flex items-center gap-2 text-xs md:text-sm rounded-full dark:bg-white/20 bg-black/20 cursor-default">
          <Brain aria-hidden="true" />
          <span>AI Powered Startup Intelligence</span>
        </Badge>

        <h1 className="mt-5 font-bold leading-tight text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
          Refine your{" "}
          <span className="bg-gradient-to-l from-[#377d71] via-[#fbc5c5] to-[#fba1a1] dark:from-[#1f4a43] dark:via-[#8b6b6b] dark:to-[#8b4d4d] bg-clip-text text-transparent">
            Startup Idea
          </span>{" "}
          with AI
        </h1>

        <h3 className="mt-5 max-w-2xl font-semibold text-base sm:text-lg md:text-xl text-neutral-800 dark:text-neutral-400">
          Zeltra AI helps you discover market niches, validate ideas, and
          generate
          <br className="hidden md:inline" />
          prototype prompts to kickstart your next breakthrough.
        </h3>

        <div className="w-full sm:w-4/5 md:w-3/5 mt-16">
          <NewMessageBox />
        </div>
      </div>
    </section>
  );
};
