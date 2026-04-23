"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

const popularTags = [
  "True Wireless", "Noise Cancelling", "Bass Headphones", "Gaming Headset",
  "Smartwatch", "Bluetooth Speaker", "AirDopes", "Wired Earphones",
  "Over-Ear", "Waterproof"
];

export default function SearchOverlay({ isOpen, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="nexus-search-overlay" onClick={onClose}>
      <div className="nexus-search-box" onClick={(e) => e.stopPropagation()}>
        <div className="nexus-search-input-wrap">
          <Search size={22} className="nexus-search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search headphones, earbuds, speakers..."
            className="nexus-search-input"
          />
          <button className="nexus-search-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="nexus-search-tags-section">
          <p className="nexus-search-tags-label">Most Searched</p>
          <div className="nexus-search-tags">
            {popularTags.map((tag) => (
              <a key={tag} href="#" className="nexus-search-chip" onClick={onClose}>
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
