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
import { useSearchParams, useRouter } from "next/navigation";
import LoginModal from "../LoginModal";

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
      name: "Features",
      link: "#features",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
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
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </motion.div>
    </>
  );
}
