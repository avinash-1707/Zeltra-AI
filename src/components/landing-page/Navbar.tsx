"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import Profile from "../Profile";
import { useRouter } from "next/navigation";
import LoginModal from "../LoginModal";
import { ModeToggle } from "../mode-toggle";

interface Props {
  searchParamsPromise: Promise<{
    loginRequired?: string;
  }>;
}

export function LandingNavbar({ searchParamsPromise }: Props) {
  const searchParams = use(searchParamsPromise);
  const loginRequired = searchParams?.loginRequired === "true";
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Open modal if ?loginRequired=true
  useEffect(() => {
    if (loginRequired) {
      setOpen(true);

      // Clean the URL after opening
      const params = new URLSearchParams(searchParams.toString());
      params.delete("loginRequired");

      const newUrl =
        window.location.pathname + (params.toString() ? `?${params}` : "");
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);
  const { data: session } = useSession();
  const navItems = [
    {
      name: "How it works",
      link: "#how-it-works",
    },
    {
      name: "Go to Chat",
      link: "/chat",
    },
  ];

  return (
    <>
      <AnimatePresence>
        {open && <LoginModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeIn",
        }}
        className="relative w-full"
      >
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex gap-5 items-center">
              <ModeToggle />
              {session ? (
                <Profile />
              ) : (
                <div className="flex items-center gap-4">
                  <NavbarButton
                    onClick={() => setOpen(true)}
                    variant="primary"
                    className="rounded-4xl"
                  >
                    Login
                  </NavbarButton>
                </div>
              )}
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <div className="flex gap-3">
                <ModeToggle />
                {session ? (
                  <Profile />
                ) : (
                  <div className="flex items-center gap-4">
                    <NavbarButton
                      onClick={() => setOpen(true)}
                      variant="primary"
                      className="rounded-4xl"
                    >
                      Login
                    </NavbarButton>
                  </div>
                )}
              </div>
            </MobileNavHeader>
          </MobileNav>
        </Navbar>
      </motion.div>
    </>
  );
}
