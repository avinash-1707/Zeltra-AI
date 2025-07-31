"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

export const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative z-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold">
          Refine your{" "}
          <span className="bg-gradient-to-bl from-[#377d71] via-[#fbc5c5] to-[#fba1a1] bg-clip-text text-transparent">
            Startup Idea
          </span>{" "}
          with AI
        </h1>
        <h3 className="text-center mt-5 font-semibold text-2xl text-neutral-900 dark:text-neutral-200">
          Zeltra AI helps you discover market niches, validate ideas, and
          generate
          <br /> prototype prompts to kickstart your next breakthrough.
        </h3>
      </div>
    </section>
  );
};
