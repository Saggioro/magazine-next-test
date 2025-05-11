import { getRestaurants } from "@/api/fakeApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IRestaurantsState {
  restaurants?: IRestaurant[];
  fetchRestaurants: () => void;
  clearStore: () => void;
}

export const useRestaurantsStore = create<IRestaurantsState>()(
  persist(
    (set) => ({
      restaurants: undefined,
      fetchRestaurants: async () => {
        try {
          const restaurants = await getRestaurants();
          if (restaurants) {
            set({ restaurants });
          }
        } catch (error) {
          console.error("Erro ao buscar restaurante:", error);
        }
      },
      clearStore: () => set({ restaurants: undefined }),
    }),
    {
      name: "@magazine-restaurants-storage",
      skipHydration: true,
    },
  ),
);
