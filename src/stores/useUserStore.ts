import { getUser } from "@/api/fakeApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserState {
  user?: IUser;
  fetchUser: () => void;
  clearStore: () => void;
}

export const useUserStore = create<IUserState>()(
  persist(
    (set) => ({
      user: undefined,
      fetchUser: async () => {
        try {
          const user = await getUser();
          if (user) {
            set({ user });
          }
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      },
      clearStore: () => set({ user: undefined }),
    }),
    {
      name: "@magazine-user-storage",
    },
  ),
);
