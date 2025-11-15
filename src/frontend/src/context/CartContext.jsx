import { createContext, useContext, useEffect, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          // ⚠️ Ya está al máximo de stock
          import("react-hot-toast").then(({ default: toast }) => {
            toast.error(
              `No puedes agregar más. Stock máximo alcanzado (${product.stock}) 😢`,
              {
                position: "bottom-right",
                style: {
                  background: "#dc2626",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "10px 15px",
                },
              }
            );
          });
          return prev;
        }

        // ✅ Incrementar dentro del límite
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }

      // ✅ Agregar nuevo producto
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) => {
        const max = item.stock || 1;
        const limited = Math.min(Math.max(1, newQuantity), max);

        if (newQuantity > max) {
          import("react-hot-toast").then(({ default: toast }) => {
            toast.error(`Stock máximo (${max}) alcanzado para ${item.name}`, {
              position: "bottom-right",
              style: {
                background: "#dc2626",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px 15px",
              },
            });
          });
        }

        return item.id === id ? { ...item, quantity: limited } : item;
      })
    );
  };

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      ),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((count, item) => count + (item.quantity || 1), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};
