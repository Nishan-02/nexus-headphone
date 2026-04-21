"use client";

import { motion } from "framer-motion";
import { Shield, Battery, Headphones, PenTool, Layout } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Active Shield NC™",
    description: "Our proprietary 8-mic array monitors ambient noise 48,000 times per second to create a pure zone of silence.",
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: "80h Playback",
    description: "Go weeks without a charge. 10 minutes of charging gives you 4 hours of listening time.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Spatial X",
    description: "Cinematic sound that follows your head movements, placing you in the center of the performance.",
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Luxury Ergo",
    description: "Memory foam cushions wrapped in vegan ultra-suede leather for sweat-free comfort during long sessions.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-4"
        >
          Precision Engineering
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/40 max-w-2xl mx-auto"
        >
          Every component is designed to elevate your auditory journey to new heights.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 group hover:border-primary/20 transition-all duration-500 cursor-target"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-white/50 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
