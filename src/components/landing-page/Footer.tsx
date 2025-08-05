"use client";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-900 text-white px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/zeltra-logo.png"
                height={24}
                width={24}
                alt="Zeltra AI logo"
              />
              <span className="text-xl font-bold">Zeltra AI</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Helping entrepreneurs validate their startup ideas and build
              successful prototypes with AI-powered guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/chat" className="hover:text-white transition-colors">
                  Chat with Zeltra
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How it Works
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              {/* <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li> */}
              <li>
                <a
                  href="mailto:avinashnarwariya5@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Zeltra AI. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Built with ❤️ for entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
};
