import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISelectOptions {
  extra: string;
  options: IOption[];
}
interface ISelectedItem {
  id: number;
  name: string;
  quantity: number;
  itemId: number;
  observation: string;
  selectedExtras: ISelectOptions[];
}
interface ICart {
  restaurant: { id: number; name: string; image: string };
  count?: number;
  items: ISelectedItem[];
}

interface ICartState {
  cart?: ICart;
  add: (
    restaurant: { id: number; name: string; image: string },
    item: ISelectedItem,
    count: number,
  ) => void;
  edit: (id: number, item: ISelectedItem) => void;
  deleteFromCart: (id: number) => void;
  clearStore: () => void;
}

export const useCartStore = create<ICartState>()(
  persist(
    (set) => ({
      cart: undefined,
      add: (restaurant, item, count) => {
        set((state) => {
          if (state.cart && state.cart.restaurant?.id === restaurant?.id) {
            const exist = state.cart.items.find((fitem) => fitem.id === count);
            if (exist) {
              const newArray = state.cart.items.filter(
                (fitem) => fitem.id !== count,
              );
              return {
                cart: {
                  restaurant: state.cart.restaurant,
                  items: [
                    ...newArray,
                    { ...item, quantity: exist.quantity + 1 },
                  ],
                  count: count,
                },
              };
            }
            return {
              cart: {
                restaurant: state.cart.restaurant,
                items: [...state.cart.items, item],
                count: count,
              },
            };
          } else {
            return {
              cart: {
                restaurant,
                items: [item],
                count: count,
              },
            };
          }
        });
      },
      edit: (index, item) => {
        set((state) => {
          if (state.cart) {
            const filteredArray = state.cart?.items.filter(
              (_, i) => i !== index,
            );
            return {
              cart: {
                items: [...filteredArray, item],
                restaurant: state.cart?.restaurant,
              },
            };
          }
          return state;
        });
      },
      deleteFromCart: (id) => {
        set((state) => {
          if (state.cart) {
            const item = state.cart?.items.find(
              (cartItem) => cartItem.id === id,
            );
            const filteredArray = state.cart?.items.filter(
              (item) => item.id !== id,
            );
            if (item?.quantity && item.quantity > 1) {
              return {
                cart: {
                  items: [
                    ...filteredArray,
                    { ...item, quantity: item.quantity - 1 },
                  ],
                  restaurant: state.cart?.restaurant,
                  count: state.cart?.count,
                },
              };
            }
            return {
              cart: {
                items: filteredArray,
                restaurant: state.cart?.restaurant,
                count: state.cart?.count,
              },
            };
          }
          return state;
        });
      },
      clearStore: () => set({ cart: undefined }),
    }),
    {
      name: "@magazine-cart-storage",
    },
  ),
);
