"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Headphones, Speaker, Watch, Mic } from "lucide-react";
import { useStore } from "@/lib/store";
import SearchOverlay from "./SearchOverlay";
import Link from "next/link";

const categories = [
  { label: "True Wireless Earbuds", icon: "🎧", href: "#" },
  { label: "Over-Ear Headphones", icon: "🎧", href: "#" },
  { label: "Wired Earphones", icon: "🎵", href: "#" },
  { label: "Gaming Headsets", icon: "🎮", href: "#" },
  { label: "Neckbands", icon: "📻", href: "#" },
  { label: "Bluetooth Speakers", icon: "🔊", href: "#" },
  { label: "Soundbars", icon: "📺", href: "#" },
  { label: "Party Speakers", icon: "🎉", href: "#" },
  { label: "Smartwatches", icon: "⌚", href: "#" },
  { label: "Smart Rings", icon: "💍", href: "#" },
  { label: "Trimmers & Grooming", icon: "💈", href: "#" },
  { label: "Home Audio", icon: "🏠", href: "#" },
  { label: "Power Banks", icon: "🔋", href: "#" },
  { label: "Cables & Accessories", icon: "🔌", href: "#" },
  { label: "Fitness Bands", icon: "🏃", href: "#" },
  { label: "Kids Audio", icon: "🧒", href: "#" },
];

const navLinks = [
  { name: "Categories", href: "#", hasDropdown: true },
  { name: "Personalisation", href: "#" },
  { name: "Gifting", href: "#" },
  { name: "More", href: "#" },
];

export default function NexusNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, toggleCart } = useStore();
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <nav
        className={`nexus-navbar ${scrolled ? "nexus-navbar--scrolled" : ""}`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="nexus-navbar-inner">
          {/* Logo */}
          <Link href="/" className="nexus-logo">
            <span className="nexus-logo-icon">N</span>
            <span className="nexus-logo-text">NEXUS</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="nexus-nav-links">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="nexus-nav-item"
                onMouseEnter={() => link.hasDropdown && setMegaOpen(true)}
              >
                <a href={link.href} className="nexus-nav-link">
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className="nexus-nav-chevron" />}
                </a>

                {link.hasDropdown && megaOpen && (
                  <div className="nexus-mega-menu">
                    <div className="nexus-mega-grid">
                      {categories.map((cat) => (
                        <a key={cat.label} href={cat.href} className="nexus-mega-tile">
                          <div className="nexus-mega-tile-icon">{cat.icon}</div>
                          <span className="nexus-mega-tile-label">{cat.label}</span>
                        </a>
                      ))}
                    </div>
                    <div className="nexus-mega-footer">
                      <a href="#" className="nexus-mega-view-all">View All Categories →</a>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="nexus-nav-actions">
            <button
              className="nexus-nav-icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <button className="nexus-nav-icon-btn" aria-label="Account">
              <User size={20} />
            </button>
            <button
              className="nexus-nav-icon-btn nexus-cart-btn"
              aria-label="Cart"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="nexus-cart-badge">{cartCount}</span>
              )}
            </button>
            <button
              className="nexus-nav-icon-btn nexus-mobile-toggle"
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="nexus-mobile-menu">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nexus-mobile-link" onClick={() => setMobileOpen(false)}>
                {link.name}
              </a>
            ))}
            <div className="nexus-mobile-cats">
              {categories.slice(0, 8).map((cat) => (
                <a key={cat.label} href={cat.href} className="nexus-mobile-cat-chip">
                  {cat.icon} {cat.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
