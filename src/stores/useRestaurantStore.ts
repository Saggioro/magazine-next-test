import { getRestaurant } from "@/api/fakeApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IRestaurantsState {
  restaurant?: IRestaurant;
  fetchRestaurant: (id: number) => void;
  clearStore: () => void;
}

export const useRestaurantStore = create<IRestaurantsState>()(
  persist(
    (set) => ({
      restaurants: undefined,
      fetchRestaurant: async (id: number) => {
        try {
          const restaurant = await getRestaurant(id);
          if (restaurant) {
            set({ restaurant });
          }
        } catch (error) {
          console.error("Erro ao buscar restaurante:", error);
        }
      },
      clearStore: () => set({ restaurant: undefined }),
    }),
    {
      name: "@magazine-restaurant-storage",
      skipHydration: true,
    },
  ),
);
