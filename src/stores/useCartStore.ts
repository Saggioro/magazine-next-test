import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICart {
  restaurantId: number;
  items: IMenuItem[];
}

interface ICartState {
  cart?: ICart;
  add: (restaurantId: number, items: IMenuItem[]) => void;
  clearStore: () => void;
}

export const useCartStore = create<ICartState>()(
  persist(
    (set) => ({
      cart: undefined,
      add: (restaurantId, items) => {
        set((state) => {
          if (state.cart && state.cart.restaurantId === restaurantId) {
            return {
              cart: {
                ...state.cart,
                items: [...state.cart.items, ...items],
              },
            };
          } else {
            return {
              cart: {
                restaurantId,
                items,
              },
            };
          }
        });
      },
      clearStore: () => set({ cart: undefined }),
    }),
    {
      name: "@magazine-cart-storage",
      skipHydration: true,
    },
  ),
);
