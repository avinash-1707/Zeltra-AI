import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Nitin Alexander",
      role: "Founder, TechStart",
      image: "/testimonial-1.jpg",
      quote:
        "Zeltra helped me identify the core problem my app needed to solve. The prototype prompt was so detailed, I had my MVP running in days, not weeks.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote:
        "I was stuck with a vague idea for months. Zeltra's questions helped me focus on what really matters - the users and their pain points.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Startup Founder",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote:
        "The best part? No technical jargon, just clear guidance on building something people actually want. Zeltra made entrepreneurship accessible.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative z-10 px-6 md:px-12 py-16 md:py-24"
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
            <span className="bg-gradient-to-r from-gray-50 to-white bg-clip-text text-transparent">
              What Founders Say
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Real feedback from entrepreneurs who turned their ideas into
            successful prototypes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-gray-700/80 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.2 + i * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="text-yellow-400 text-lg"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>

                  <blockquote className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-lg"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
