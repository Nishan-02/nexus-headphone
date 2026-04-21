"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Marcus Thorne",
    role: "Professional Producer",
    comment: "The sonic clarity is unlike anything I've heard in this price range. It rivals headphones twice its cost. Only a masterpiece of engineering.",
    rating: 5,
    avatar: "MT",
  },
  {
    name: "Elena Verna",
    role: "Tech Reviewer",
    comment: "I travel 100+ days a year. The noise cancellation on the Ultra G-1 makes long-haul flights feel like sitting in my living room.",
    rating: 5,
    avatar: "EV",
  },
  {
    name: "Daniel Kasir",
    role: "Creative Director",
    comment: "The build quality is impressive. No creaks or flimsy plastic—just cold metal and soft leather. Worth every penny.",
    rating: 4,
    avatar: "DK",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-white/[0.02]">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-4"
            >
              Loved by <br /> Audiophiles
            </motion.h2>
            <p className="text-white/40">Join over 10,000 satisfied listeners worldwide.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-secondary p-6 rounded-3xl border border-white/5">
            <div className="text-center">
              <p className="text-3xl font-bold">4.9/5.0</p>
              <div className="flex text-yellow-400 gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 relative overflow-hidden"
            >
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/[0.03] rotate-12" />
              
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-xl leading-relaxed mb-8 italic">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-xs text-white/40 tracking-wider uppercase">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
