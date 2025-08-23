import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FoodMenuResponse } from "@/service/food-menu/food-menu.response";

export type CartItem = {
  food: FoodMenuResponse;
  quantity: number;
};

export type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  increaseQuantity: (foodId: number) => void;
  decreaseQuantity: (foodId: number) => void;
  getTotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item: CartItem) =>
        set((state) => ({
          cart: state.cart.find((i) => i.food.id === item.food.id)
            ? state.cart.map((i) =>
                i.food.id === item.food.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...state.cart, item],
        })),
      removeFromCart: (item: CartItem) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.food.id !== item.food.id),
        })),
      clearCart: () => set({ cart: [] }),
      increaseQuantity: (foodId: number) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.food.id === foodId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (foodId: number) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.food.id === foodId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
      getTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          return total + item.food.price * item.quantity;
        }, 0);
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
