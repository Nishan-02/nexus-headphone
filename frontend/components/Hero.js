"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, ShieldCheck, Clock, Check } from "lucide-react";
import ProductGallery from "./ProductGallery";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const variants = [
  { id: "carbon", name: "Volt Black", color: "#D4FF00", price: 499 },
  { id: "neon", name: "Neon Pulse", color: "#00E0FF", price: 549 },
  { id: "ghost", name: "Ghost White", color: "#FFFFFF", price: 599 },
];

export default function Hero() {
  const { addToCart } = useStore();
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [timeLeft, setTimeLeft] = useState(3600 * 24); // 24 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleAddToCart = () => {
    addToCart({
      id: "apex-g1",
      title: "Apex Ultra G-1",
      variant: selectedVariant.name,
      price: selectedVariant.price,
      image: "/images/p1.png",
    });
  };

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ProductGallery />
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase block">
                Ultra Series 2024
              </span>
              <div className="flex items-center gap-1.5 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold border border-red-500/20">
                <Clock size={12} />
                ENDS IN {formatTime(timeLeft)}
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              Apex Ultra <br />
              <span className="text-white/40">G-1</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
              Immerse yourself in precision-engineered sound. Featuring proprietary acoustics architecture and adaptive noise-cancellation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Select Edition</p>
            <div className="flex gap-4">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={cn(
                    "relative flex-1 p-4 rounded-2xl border transition-all duration-300 cursor-target group",
                    selectedVariant.id === v.id 
                      ? "bg-white/5 border-primary shadow-[0_0_20px_rgba(212,255,0,0.1)]" 
                      : "bg-transparent border-white/5 hover:border-white/20"
                  )}
                >
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-xs font-medium text-white/40">{v.name}</span>
                    <span className="font-bold">${v.price}</span>
                  </div>
                  {selectedVariant.id === v.id && (
                    <motion.div 
                      layoutId="check"
                      className="absolute top-2 right-2 text-primary"
                    >
                      <Check size={14} />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-end gap-4"
          >
            <span className="text-5xl font-bold text-primary">${selectedVariant.price}.00</span>
            <span className="text-xl text-white/20 line-through mb-1.5">$649.00</span>
            <div className="mb-2">
              <p className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Only 3 left in stock
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex-1 flex items-center justify-center gap-2 cursor-target"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="btn-outline flex-1 cursor-target">
              Buy Now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-8 pt-8 border-t border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <Zap size={18} />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Free Express</p>
                <p className="text-white/40">Shipping</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">1 Year</p>
                <p className="text-white/40">Warranty</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
