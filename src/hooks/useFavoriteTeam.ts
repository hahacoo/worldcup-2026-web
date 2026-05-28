import { usePreferencesStore } from "@/store/preferences";

export function useFavoriteTeam() {
  const favoriteTeam = usePreferencesStore((state) => state.favoriteTeam);
  const setFavoriteTeam = usePreferencesStore((state) => state.setFavoriteTeam);
  const clearFavoriteTeam = usePreferencesStore((state) => state.clearFavoriteTeam);

  return {
    favoriteTeam,
    setFavoriteTeam,
    clearFavoriteTeam,
  };
}
