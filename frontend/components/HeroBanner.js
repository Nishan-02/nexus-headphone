"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/hero1.png",
    tag: "NEW DROP 2025",
    headline: "DOMINATE\nEVERY BEAT",
    sub: "Premium noise-cancelling headphones engineered for the relentless.",
    cta: "Shop Headphones",
    ctaHref: "#",
    accent: "#ff3c00",
  },
  {
    id: 2,
    image: "/images/hero2.png",
    tag: "TRUE WIRELESS",
    headline: "FREEDOM\nUNBOUND",
    sub: "Crystal-clear audio. Zero wires. Infinite possibilities.",
    cta: "Explore Earbuds",
    ctaHref: "#",
    accent: "#00b4ff",
  },
  {
    id: 3,
    image: "/images/hero3.png",
    tag: "PARTY SPEAKER",
    headline: "FEEL THE\nTHUNDER",
    sub: "360° immersive bass that turns any space into a concert.",
    cta: "Shop Speakers",
    ctaHref: "#",
    accent: "#ff3c00",
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((active + 1) % slides.length);
  const prev = () => goTo((active - 1 + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const slide = slides[active];

  return (
    <section className="nexus-hero">
      <div
        className={`nexus-hero-slide ${animating ? "nexus-hero-slide--out" : "nexus-hero-slide--in"}`}
        style={{ "--accent": slide.accent }}
      >
        {/* Background image */}
        <div
          className="nexus-hero-bg"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="nexus-hero-overlay" />

        {/* Content */}
        <div className="nexus-hero-content">
          <div className="nexus-hero-tag">{slide.tag}</div>
          <h1 className="nexus-hero-headline">
            {slide.headline.split("\n").map((line, i) => (
              <span key={i} className="nexus-hero-headline-line">{line}<br /></span>
            ))}
          </h1>
          <p className="nexus-hero-sub">{slide.sub}</p>
          <a href={slide.ctaHref} className="nexus-hero-cta">
            {slide.cta} →
          </a>
        </div>
      </div>

      {/* Navigation */}
      <button className="nexus-hero-arrow nexus-hero-arrow--left" onClick={prev} aria-label="Previous">
        <ChevronLeft size={24} />
      </button>
      <button className="nexus-hero-arrow nexus-hero-arrow--right" onClick={next} aria-label="Next">
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="nexus-hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`nexus-hero-dot ${i === active ? "nexus-hero-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
