import { createContext, useContext, useState } from "react";


const CartContext = createContext();


export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Obtener la cantidad total de productos
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// 3️⃣ Hook personalizado para usar el contexto
export function useCart() {
  return useContext(CartContext);
}
