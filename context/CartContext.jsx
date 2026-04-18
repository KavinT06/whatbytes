"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "whatbytes-cart";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": {
      return action.payload;
    }
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  items: [],
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      dispatch({ type: "INITIALIZE", payload: parsed });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return {
      items: state.items,
      itemCount,
      subtotal,
      addToCart: (product, quantity = 1) => {
        dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
      },
      updateQuantity: (id, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
      },
      removeFromCart: (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id } });
      },
      clearCart: () => {
        dispatch({ type: "CLEAR_CART" });
      },
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
