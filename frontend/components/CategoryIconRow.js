"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { icon: "🎧", label: "True Wireless", href: "#" },
  { icon: "🎵", label: "Wired Earphones", href: "#" },
  { icon: "🎮", label: "Gaming", href: "#" },
  { icon: "🔊", label: "Speakers", href: "#" },
  { icon: "📻", label: "Neckbands", href: "#" },
  { icon: "⌚", label: "Smartwatches", href: "#" },
  { icon: "🏃", label: "Fitness Bands", href: "#" },
  { icon: "📺", label: "Soundbars", href: "#" },
  { icon: "💈", label: "Grooming", href: "#" },
  { icon: "💍", label: "Smart Rings", href: "#" },
  { icon: "🔋", label: "Power Banks", href: "#" },
  { icon: "🏠", label: "Home Audio", href: "#" },
  { icon: "🔌", label: "Accessories", href: "#" },
  { icon: "🧒", label: "Kids Audio", href: "#" },
];

export default function CategoryIconRow() {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <section className="nexus-cat-row-section">
      <div className="nexus-section-header">
        <h2 className="nexus-section-title">Shop by Category</h2>
      </div>
      <div className="nexus-cat-row-wrapper">
        <button className="nexus-cat-scroll-btn nexus-cat-scroll-btn--left" onClick={() => scroll(-1)} aria-label="Scroll left">
          <ChevronLeft size={18} />
        </button>
        <div className="nexus-cat-row" ref={rowRef}>
          {categories.map((cat, i) => (
            <a key={i} href={cat.href} className="nexus-cat-item">
              <div className="nexus-cat-icon-wrap">
                <span className="nexus-cat-icon">{cat.icon}</span>
              </div>
              <span className="nexus-cat-label">{cat.label}</span>
            </a>
          ))}
        </div>
        <button className="nexus-cat-scroll-btn nexus-cat-scroll-btn--right" onClick={() => scroll(1)} aria-label="Scroll right">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
