"use client";

import { useState, useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import NexusNavbar from "@/components/NexusNavbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryIconRow from "@/components/CategoryIconRow";
import PromoBanners from "@/components/PromoBanners";
import ProductSliders from "@/components/ProductSliders";
import TrustStrip from "@/components/TrustStrip";
import NexusFooter from "@/components/NexusFooter";
import CartDrawer from "@/components/CartDrawer";
import ScrollProgress from "@/components/ScrollProgress";
import { useStore } from "@/lib/store";

export default function Home() {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeItem } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR/hydration mismatch — all content is fully client-driven
  if (!mounted) return null;

  return (
    <main className="nexus-main">
      <ScrollProgress />
      <AnnouncementBar />
      <NexusNavbar />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
      <HeroBanner />
      <CategoryIconRow />
      <ProductSliders />
      <PromoBanners />
      <TrustStrip />
      <NexusFooter />
    </main>
  );
}
