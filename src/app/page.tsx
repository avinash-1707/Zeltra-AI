import { CallToAction } from "@/components/landing-page/CallToAction";
import FloatingElements from "@/components/landing-page/FloatingElements";
import { Footer } from "@/components/landing-page/Footer";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { LandingNavbar } from "@/components/landing-page/Navbar";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { WhyUseZeltra } from "@/components/landing-page/WhyUseZeltra";
import React, { useEffect, useState } from "react";

interface PageProps {
  searchParams: Promise<{
    loginRequired?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black/95 relative overflow-hidden">
      <FloatingElements />

      <LandingNavbar searchParamsPromise={searchParams} />

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Use Zeltra */}
      <WhyUseZeltra />

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  );
}
