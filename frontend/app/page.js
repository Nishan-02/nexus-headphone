"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import InfiniteMenu from "@/components/InfiniteMenu";
import CartDrawer from "@/components/CartDrawer";
import ScrollProgress from "@/components/ScrollProgress";
import Notification from "@/components/Notification";
import { useStore } from "@/lib/store";
import { useState, useEffect } from "react";

export default function Home() {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeItem } = useStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const collectionItems = products.map(p => ({
    image: p.image,
    link: `#`,
    title: p.title,
    description: p.description
  }));

  return (
    <main className="min-h-screen relative">
      <ScrollProgress />
      <Notification />
      
      {/* Background radial glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <Navbar />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={toggleCart} 
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      <Hero />
      <Features />

      <section className="py-24 border-y border-white/5 relative bg-white/[0.01]">
        <div className="text-center mb-16 px-6">
          <h2 className="text-4xl font-bold tracking-tight uppercase">The Collection</h2>
          <p className="text-white/40 mt-2">Explore the different editions of Apex Ultra.</p>
        </div>
        <div className="h-[700px] w-full relative overflow-hidden">
          <InfiniteMenu items={collectionItems} scale={1.2} />
        </div>
      </section>

      <Reviews />
      <Footer />
    </main>
  );
}
