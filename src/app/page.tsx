import { Footer } from "@/components/landing-page/Footer";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { LandingNavbar } from "@/components/landing-page/Navbar";

import NewMessageBox from "@/components/NewMessageBox";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PageProps {
  searchParams: Promise<{
    loginRequired?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/zeltra-bg-grainy-blur.jpg"
        alt="zeltra-bg"
        width={3000}
        height={2000}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none select-none"
      />
      <div className="fixed inset-0 bg-black/20 dark:bg-white/20 pointer-events-none -z-5"></div>

      <LandingNavbar searchParamsPromise={searchParams} />

      {/* Hero Section */}
      <HeroSection />

      <NewMessageBox />

      {/* How It Works */}
      <HowItWorks />

      {/* Footer */}
      <Footer />
    </div>
  );
}
