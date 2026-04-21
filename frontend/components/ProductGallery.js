"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const images = [
  { id: 1, src: "/images/p1.png", alt: "Main View" },
  { id: 2, src: "/images/p2.png", alt: "Side View" },
  { id: 3, src: "/images/p3.png", alt: "Detail View" },
];

export default function ProductGallery() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-secondary/50 border border-white/5 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage.id}
            src={activeImage.src}
            alt={activeImage.alt}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
      </div>

      <div className="flex gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-target",
              activeImage.id === image.id ? "border-primary p-0.5" : "border-white/5 opacity-50 hover:opacity-100"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-[0.8rem]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
