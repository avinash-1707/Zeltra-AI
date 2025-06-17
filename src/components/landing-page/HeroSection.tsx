import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageSquare, Sparkles, Video } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Badge className="bg-black text-white/70 border-white/80 mb-2">
                🚀 Transform Ideas into Reality
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-100 via-amber-50 to-white bg-clip-text text-transparent">
                Validate and <br /> Shape Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-100 via-amber-50 to-white bg-clip-text text-transparent">
                Startup Idea with <br />
                Zeltra AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-white/40 leading-relaxed max-w-lg"
            >
              Zeltra AI helps founders turn vague ideas into solid prototypes.
              Get focused feedback, actionable guidance, and ready-to-use
              development prompts.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg group hover:scale-105"
              >
                Talk to the Bot
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg hover:scale-105"
              >
                <Video className="ml-2 w-6 h-6 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center space-x-6 pt-2"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">
                  No technical knowledge required
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Instant feedback</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Chat Preview */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-black backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 max-w-md mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Zeltra AI</h3>
                  <p className="text-sm text-green-500">● Online</p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="bg-blue-950 rounded-2xl rounded-br-none p-4 ml-4"
                >
                  <p className="text-white text-sm">
                    Hi! I'm here to help you validate and shape your startup
                    idea. What's your vision?
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="bg-gray-800 text-white rounded-2xl rounded-bl-none p-4 mr-10"
                >
                  <p className="text-sm">
                    I want to create a food delivery app for busy
                    professionals...
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="bg-blue-950 rounded-2xl rounded-br-none p-4 ml-4"
                >
                  <p className="text-white text-sm">
                    Great! Let's dive deeper. What specific problem do busy
                    professionals face with current food delivery options?
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100"
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  Zeltra is typing...
                </span>
              </motion.div>
            </div>

            {/* Floating elements around chat */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-white to-gray-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <MessageSquare className="w-6 h-6 text-black" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
