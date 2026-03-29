'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount (Client-only)
  useEffect(() => {
    const savedCart = localStorage.getItem('velora_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change (Client-only)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('velora_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addItem = (product, size) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      // Ensure we only store essential data
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image_link,
        color: product.color,
        size: size,
        quantity: 1
      };
      
      return [...prevCart, cartItem];
    });
    
    // Open drawer automatically
    setIsCartOpen(true);
  };

  const removeItem = (productId, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, delta) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId && item.size === size) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      cartCount, 
      cartTotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
