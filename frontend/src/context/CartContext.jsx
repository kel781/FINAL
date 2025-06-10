// context/CartContext.jsx
// import React, { createContext, useState, useContext, useMemo } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   // Add item to cart or increment quantity if already exists
//   const addToCart = (dish) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((item) => item.id === dish.id);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.id === dish.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...dish, quantity: 1 }];
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (dishId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== dishId));
//   };

//   // Update item quantity
//   const updateQuantity = (dishId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(dishId);
//       return;
//     }
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === dishId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   // Clear all items from cart
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // Calculate total price
//   const totalPrice = useMemo(
//     () =>
//       cartItems.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//       ),
//     [cartItems]
//   );

//   // Calculate total items
//   const totalItems = useMemo(
//     () => cartItems.reduce((total, item) => total + item.quantity, 0),
//     [cartItems]
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalPrice,
//         totalItems,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }

import React, { createContext, useState, useContext, useMemo, useCallback } from "react";
import { toast } from "react-toastify"; // Optional for notifications

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Persist cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart or increment quantity if already exists
  const addToCart = useCallback((dish) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === dish.id);
      if (existingItem) {
        toast.success(`${dish.name} quantity updated in cart!`);
        return prev.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${dish.name} added to cart!`);
      return [...prev, { ...dish, quantity: 1 }];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((dishId, name) => {
    setCartItems((prev) => prev.filter((item) => item.id !== dishId));
    toast.info(`${name || 'Item'} removed from cart!`);
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((dishId, newQuantity, name) => {
    if (newQuantity < 1) {
      removeFromCart(dishId, name);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === dishId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  // Clear all items from cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    toast.info('Cart cleared!');
  }, []);

  // Calculate total price
  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  // Calculate total items
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  // Check if item is in cart
  const isInCart = useCallback(
    (dishId) => cartItems.some((item) => item.id === dishId),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}