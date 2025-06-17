import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, CheckCircle, Users, Rocket } from "lucide-react";

export const WhyUseZeltra = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Idea Validation",
      description:
        "Get instant feedback on your startup concept. No more weeks of uncertainty - know if your idea has potential in minutes.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: CheckCircle,
      title: "No Technical Jargon",
      description:
        "Simple, clear guidance that any entrepreneur can understand. Focus on business strategy, not technical complexities.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Users,
      title: "Focus on User Needs",
      description:
        "Learn to identify real user problems and validate your solutions before investing time and money in development.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Rocket,
      title: "Prototype-Ready Output",
      description:
        "Get detailed prompts that you can use immediately with Lovable or v0 to build your MVP and start testing.",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section
      id="features"
      className="relative z-10 px-6 md:px-12 py-16 md:py-24 bg-black/40"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-50 to-blue-50 bg-clip-text text-transparent">
              Why Use Zeltra AI?
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Built specifically for entrepreneurs who want to validate and
            develop their ideas efficiently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-black/80 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-blue-800 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
