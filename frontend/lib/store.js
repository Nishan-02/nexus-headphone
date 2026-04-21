import { create } from 'zustand';

export const useStore = create((set) => ({
  isCartOpen: false,
  cart: [],
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.id === item.id && i.variant === item.variant);
    if (existing) {
      return {
        cart: state.cart.map(i => 
          (i.id === item.id && i.variant === item.variant) 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        ),
        isCartOpen: true
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }], isCartOpen: true };
  }),
  updateQuantity: (id, delta) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    )
  })),
  removeItem: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
}));
