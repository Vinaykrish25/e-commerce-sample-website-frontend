import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity, size, color) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );

        if (existingItemIndex > -1) {
          const newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({ items: [...items, { ...product, quantity, selectedSize: size, selectedColor: color }] });
        }
      },
      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
          ),
        });
      },
      updateQuantity: (id, size, color, quantity) => {
        const newItems = get().items.map((item) => {
          if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ items: newItems });
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
