"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ScrollProgress from "@/components/ScrollProgress";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeItem, addToCart } = useStore();
  const [filter, setFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter(p => p.type === filter);
  }, [filter]);

  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={toggleCart} 
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      <div className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl font-bold tracking-tighter mb-4">The Collection</h1>
            <p className="text-white/40 max-w-xl">
              Precision audio tools for those who demand nothing but the best. Discover the Apex line.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest">
            <span className="text-white/20 flex items-center gap-2">
              <Filter size={14} /> Filter
            </span>
            <span className="w-8 h-px bg-white/10 hidden sm:block" />
            <button 
              onClick={() => setFilter("all")}
              className={cn("transition-colors cursor-target px-2 py-1 rounded-md", filter === "all" ? "text-primary bg-primary/10" : "text-white/40 hover:text-white")}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("wired")}
              className={cn("transition-colors cursor-target px-2 py-1 rounded-md", filter === "wired" ? "text-primary bg-primary/10" : "text-white/40 hover:text-white")}
            >
              Wired
            </button>
            <button 
              onClick={() => setFilter("wireless")}
              className={cn("transition-colors cursor-target px-2 py-1 rounded-md", filter === "wireless" ? "text-primary bg-primary/10" : "text-white/40 hover:text-white")}
            >
              Wireless
            </button>
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4, type: "spring", damping: 20 }}
                className="glass-card group flex flex-col p-2 h-full"
              >
                <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-secondary/50 border border-white/5 mb-6">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/5 uppercase tracking-tighter">
                    {item.type}
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button 
                      onClick={() => addToCart({ ...item, variant: 'Standard' })}
                      className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform cursor-target"
                    >
                      <ShoppingCart size={20} />
                    </button>
                    <Link 
                      href={`/products/${item.id}`}
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform cursor-target"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>

                <div className="px-6 pb-6 mt-auto flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between items-start mb-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <span>{item.category}</span>
                      <span className="text-primary/60">New Arrival</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 tracking-tight">{item.title}</h3>
                        <p className="text-primary font-bold text-lg">${item.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/products/${item.id}`}
                    className="btn-outline text-xs py-3 w-full text-center cursor-target group-hover:bg-white group-hover:text-black transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
