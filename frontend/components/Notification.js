"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShoppingCart } from "lucide-react";

const names = ["Aman", "Riya", "Karan", "Sarah", "David", "Emma"];
const cities = ["Delhi", "Mumbai", "Bangalore", "New York", "London"];

export default function Notification() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const showRandom = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setNotification({ name, city });

      setTimeout(() => setNotification(null), 5000);
    };

    const timer = setInterval(showRandom, 15000);
    setTimeout(showRandom, 3000); // First one after 3s

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-8 z-[90] glass-card p-4 pr-6 flex items-center gap-4 shadow-2xl border-primary/20"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <ShoppingCart size={18} />
          </div>
          <div>
            <p className="text-sm font-bold">{notification.name} from {notification.city}</p>
            <p className="text-xs text-white/40">Just purchased Apex Ultra G-1</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
