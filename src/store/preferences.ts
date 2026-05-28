import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesState {
  favoriteTeam: string;
  setFavoriteTeam: (teamName: string) => void;
  clearFavoriteTeam: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      favoriteTeam: "阿根廷",
      setFavoriteTeam: (teamName) => set({ favoriteTeam: teamName }),
      clearFavoriteTeam: () => set({ favoriteTeam: "" }),
    }),
    {
      name: "worldcup-2026-preferences",
    },
  ),
);
