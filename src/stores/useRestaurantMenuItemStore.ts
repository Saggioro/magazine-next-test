import { getRestaurants } from "@/api/fakeApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IRestaurantMenuItemState {
  item?: IMenuItem;
  setMenuItem: (item: IMenuItem) => void;
  clearStore: () => void;
}

export const useRestaurantMenuItemStore = create<IRestaurantMenuItemState>()(
  persist(
    (set) => ({
      item: undefined,
      setMenuItem: (item) => {
        set({ item });
      },
      clearStore: () => set({ item: undefined }),
    }),
    {
      name: "@magazine-restaurant-item-storage",
      skipHydration: true,
    },
  ),
);
