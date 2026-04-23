"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";

const getRating = (id) => {
  const seed = id.charCodeAt(0) % 10;
  return (3.8 + seed * 0.12).toFixed(1);
};
const getReviewCount = (id) => {
  const seed = id.charCodeAt(0) % 100;
  return 1200 + seed * 73;
};
const getOriginalPrice = (price) => Math.round(price * 1.35);
const getDiscount = (price) => {
  const orig = getOriginalPrice(price);
  return Math.round(((orig - price) / orig) * 100);
};

const colorVariants = [
  ["#ff3c00", "#0a0a0a", "#D4FF00"],
  ["#0a0a0a", "#D4FF00", "#00E0FF"],
  ["#8B5CF6", "#ff3c00", "#ffffff"],
];

function ProductCard({ product, index }) {
  const { addToCart } = useStore();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const variants = colorVariants[index % colorVariants.length];
  const discount = getDiscount(product.price);
  const origPrice = getOriginalPrice(product.price);
  const rating = getRating(product.id);
  const reviews = getReviewCount(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, variant: "Default" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="nexus-product-card">
      <div className="nexus-product-img-wrap">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="nexus-product-img"
          width={280}
          height={280}
        />
        <span className="nexus-product-badge">-{discount}%</span>
        <button
          className={`nexus-product-wish ${wished ? "nexus-product-wish--active" : ""}`}
          onClick={() => setWished(!wished)}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={wished ? "#ff3c00" : "none"} />
        </button>
        <button
          className={`nexus-product-add-hover ${added ? "nexus-product-add-hover--added" : ""}`}
          onClick={handleAdd}
        >
          {added ? "✓ Added!" : <><ShoppingCart size={14} /> Add to Cart</>}
        </button>
      </div>

      <div className="nexus-product-info">
        <h3 className="nexus-product-name">{product.title}</h3>

        <div className="nexus-product-variants">
          {variants.map((c, i) => (
            <span key={i} className="nexus-product-dot" style={{ background: c }} />
          ))}
        </div>

        <div className="nexus-product-rating">
          <Star size={13} fill="#FFB800" color="#FFB800" />
          <span className="nexus-product-rating-num">{rating}</span>
          <span className="nexus-product-rating-count">({reviews.toFixed(0)})</span>
        </div>

        <div className="nexus-product-price-row">
          <span className="nexus-product-price">₹{product.price}</span>
          <span className="nexus-product-orig">₹{origPrice}</span>
          <span className="nexus-product-disc">{discount}% off</span>
        </div>
      </div>
    </div>
  );
}

function ProductSlider({ title, badge, items }) {
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section className="nexus-slider-section">
      <div className="nexus-slider-header">
        <div className="nexus-slider-title-row">
          <h2 className="nexus-slider-title">{title}</h2>
          {badge && <span className="nexus-slider-badge">{badge}</span>}
        </div>
        <div className="nexus-slider-arrows">
          <button className="nexus-slider-arrow" onClick={() => scroll(-1)} aria-label="Scroll left">
            <ChevronLeft size={18} />
          </button>
          <button className="nexus-slider-arrow" onClick={() => scroll(1)} aria-label="Scroll right">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="nexus-slider-row" ref={rowRef}>
        {items.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      <div className="nexus-slider-footer">
        <a href="#" className="nexus-slider-view-all">View All →</a>
      </div>
    </section>
  );
}

// Deterministic "trending" order — avoids SSR/client mismatch from Math.random()
const trendingOrder = [2, 5, 7, 1, 9, 3];
const trendingProducts = trendingOrder
  .map((i) => products[i])
  .filter(Boolean);

export default function ProductSliders() {
  const bestSellers = products.slice(0, 6);
  const newArrivals = products.slice(4, 10);
  const trending = trendingProducts;

  return (
    <>
      <ProductSlider title="Best Sellers" badge="🔥 HOT" items={bestSellers} />
      <ProductSlider title="New Arrivals" badge="✨ NEW" items={newArrivals} />
      <ProductSlider title="Trending Now" items={trending} />
    </>
  );
}
