import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState(null);
  const [discountRate, setDiscountRate] = useState(0); // 0–1 (e.g. 0.1 = 10%)

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Simple coupon system
  const applyCoupon = (code) => {
    const c = code.trim().toUpperCase();
    if (!c) {
      setPromoCode(null);
      setDiscountRate(0);
      return { ok: false, msg: "Enter a code" };
    }

    if (c === "SAVE10") {
      setPromoCode(c);
      setDiscountRate(0.1);
      return { ok: true, msg: "10% discount applied" };
    }

    if (c === "FIRST50") {
      setPromoCode(c);
      setDiscountRate(0.2); // 20%
      return { ok: true, msg: "20% OFF for first order" };
    }

    setPromoCode(null);
    setDiscountRate(0);
    return { ok: false, msg: "Invalid or expired code" };
  };

  const subtotal = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const discountAmount = Math.round(subtotal * discountRate);
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        total,
        promoCode,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
