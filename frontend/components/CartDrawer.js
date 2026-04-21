"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartDrawer({ isOpen, onClose, cartItems, updateQuantity, removeItem }) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
      setIsCheckingOut(true);
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            cart: cartItems,
            customer: { name: 'Guest User', email: 'guest@example.com' } // Mock customer
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          alert(`Order Placed! Order ID: ${data.orderId}`);
          // Clear cart logic could go here if needed
        }
      } catch (error) {
        console.error('Checkout failed:', error);
      } finally {
        setIsCheckingOut(false);
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
  
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-secondary border-l border-white/10 z-[101] flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-primary" />
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{cartItems.length}</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-target"
                >
                  <X />
                </button>
              </div>
  
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/40 gap-4">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p>Your cart is empty</p>
                    <button 
                      onClick={onClose}
                      className="btn-outline text-sm py-2 px-6 cursor-target"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-4 group"
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/5 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold">{item.title}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-white/20 hover:text-red-500 transition-colors cursor-target"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-white/40">{item.variant}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:text-primary transition-colors cursor-target"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:text-primary transition-colors cursor-target"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
  
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-background/50 space-y-4">
                  <div className="flex justify-between items-center text-white/60">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/60">
                    <span>Shipping</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold pt-2">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="btn-primary w-full cursor-target flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isCheckingOut ? 'Processing...' : 'Checkout Now'}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
}
