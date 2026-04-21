"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { products } from "@/lib/products";
import { useParams } from "next/navigation";
import { ShoppingCart, Zap, ShieldCheck, Star, Heart, ChevronRight, Maximize2, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = product?.thumbnails[activeImageIndex];
  
  const { isCartOpen, toggleCart, cart, updateQuantity, removeItem, addToCart } = useStore();
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // High-end Zoom Effect
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  // Swipe logic for mobile
  const handleDragEnd = (e, info) => {
    if (info.offset.x > 100 && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    } else if (info.offset.x < -100 && activeImageIndex < product.thumbnails.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  if (!product) return <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
    <h2 className="text-2xl font-bold">Product not found</h2>
    <Link href="/products" className="btn-primary">Return to Store</Link>
  </div>;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={toggleCart} 
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-12">
          <Link href="/" className="hover:text-white transition-colors cursor-target">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-white transition-colors cursor-target">Collection</Link>
          <ChevronRight size={12} />
          <span className="text-white">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.4fr_1fr] gap-12 xl:gap-24 items-start">
          
          {/* Pro Gallery with Swipe & Zoom */}
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:sticky lg:top-32">
            
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 scrollbar-hide">
              {product.thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveImageIndex(i)}
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-[1.5rem] overflow-hidden border-2 transition-all cursor-target",
                    activeImageIndex === i ? "border-primary p-0.5 scale-95" : "border-white/5 opacity-40 hover:opacity-100 hover:border-white/20"
                  )}
                >
                  <img src={thumb} className="w-full h-full object-cover rounded-[1.2rem]" />
                </button>
              ))}
            </div>

            {/* Main Interactive Stage */}
            <div className="flex-1 relative group">
              <motion.div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="relative aspect-square rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden bg-secondary/30 border border-white/5 cursor-crosshair group active:cursor-grabbing"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    draggable={false}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className="w-full h-full object-cover select-none"
                  />
                </AnimatePresence>

                {/* Desktop Zoom */}
                {zoomPos.show && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none hidden lg:block"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: '220%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                )}
                
                {/* Fullscreen Trigger */}
                <button 
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-target z-20"
                >
                  <Maximize2 size={20} />
                </button>

                {/* Swipe Progress Dots (Mobile) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
                  {product.thumbnails.map((_, i) => (
                    <div key={i} className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      activeImageIndex === i ? "bg-primary w-6" : "bg-white/20"
                    )} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Details & Conversion */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-6">
                <Radio className="w-4 h-4 animate-pulse" />
                Apex Wireless System
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">{product.title}</h1>
              
              <div className="flex items-center gap-6 mb-8 p-1">
                <div className="flex items-center gap-2">
                   <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className="text-primary" />)}
                   </div>
                   <span className="text-xs font-bold text-white/40">4.8 / 5.0</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">In Stock</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-bold text-primary">${product.price}.99</span>
                <span className="text-2xl text-white/10 line-through font-medium tracking-tighter">$699.00</span>
              </div>

              <p className="text-lg text-white/40 leading-relaxed max-w-lg mb-8">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => addToCart({ ...product, variant: 'Premium Edition' })}
                  className="btn-primary w-full py-6 flex items-center justify-center gap-3 text-lg font-bold group cursor-target overflow-hidden relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
                <div className="flex gap-4">
                  <button className="btn-outline flex-1 py-4 flex items-center justify-center gap-2 cursor-target">
                    <Heart size={20} />
                    Wishlist
                  </button>
                  <button className="btn-outline flex-1 py-4 text-xs font-bold uppercase tracking-widest cursor-target">
                    Compare Specs
                  </button>
                </div>
              </div>

              {/* Verified Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-5 rounded-[2rem] border-white/5 flex flex-col gap-2">
                  <ShieldCheck size={24} className="text-primary" />
                  <p className="text-sm font-bold">2 Year Warranty</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Full coverage protection</p>
                </div>
                <div className="glass p-5 rounded-[2rem] border-white/5 flex flex-col gap-2">
                  <Zap size={24} className="text-primary" />
                  <p className="text-sm font-bold">Express Delivery</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Arrives in 48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors cursor-target p-4"
            >
              <X size={40} />
            </button>

            <div className="relative w-full max-w-5xl aspect-square flex items-center justify-center">
               <button 
                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.thumbnails.length - 1))}
                className="absolute left-0 text-white/20 hover:text-primary transition-colors p-4 cursor-target"
              >
                <ChevronLeft size={64} strokeWidth={1} />
              </button>

              <motion.img
                key={activeImage}
                src={activeImage}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />

              <button 
                onClick={() => setActiveImageIndex((prev) => (prev < product.thumbnails.length - 1 ? prev + 1 : 0))}
                className="absolute right-0 text-white/20 hover:text-primary transition-colors p-4 cursor-target"
              >
                <ChevronRight size={64} strokeWidth={1} />
              </button>

              <div className="absolute bottom-[-60px] flex gap-4">
                 {product.thumbnails.map((t, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        activeImageIndex === i ? "bg-primary w-12" : "bg-white/10"
                      )}
                    />
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

// Sub-component for icons
function Radio(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8a6 6 0 0 1 0 8.4" />
      <path d="M19.4 4.6a10.5 10.5 0 0 1 0 14.8" />
      <path d="M7.8 16.2a6 6 0 0 1 0-8.4" />
      <path d="M4.6 19.4a10.5 10.5 0 0 1 0-14.8" />
    </svg>
  );
}
