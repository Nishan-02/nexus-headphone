"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const announcements = [
  { text: "🔥 Use code NEXUS15 for 15% OFF — ", cta: "Shop Now", href: "#" },
  { text: "⚡ Free Express Shipping on orders above ₹999 — ", cta: "Explore", href: "#" },
  { text: "🎧 New Drop: AirDopes Pro Max — Limited Stock — ", cta: "Grab Yours", href: "#" },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const ann = announcements[current];

  return (
    <div className="nexus-announcement-bar">
      <div className="nexus-announcement-inner">
        <span className="nexus-announcement-text">
          {ann.text}
          <a href={ann.href} className="nexus-announcement-cta">
            {ann.cta} →
          </a>
        </span>
      </div>
      <button
        className="nexus-announcement-close"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
