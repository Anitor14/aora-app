import { create } from "zustand";
import { User } from "@/lib/types";

type UserStoreType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  user: User | null;
  setUser: (user: any) => void;
};

const useUserStore = create<UserStoreType>((set) => ({
  isLogged: false,
  setIsLogged: (isLogged) => set({ isLogged }),
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
