import { useMemo } from "react";
import type { MatchFilterValues, MatchItem } from "@/types/match";
import { matchIncludesTeam } from "@/utils/match";

export function useMatchFilters(matches: MatchItem[], filters: MatchFilterValues, favoriteTeam: string) {
  return useMemo(() => {
    const searchText = filters.query.trim().toLowerCase();

    return matches.filter((match) => {
      const stageMatched = filters.stage === "all" || match.stage === filters.stage;
      const teamMatched = !filters.team || matchIncludesTeam(match, filters.team);
      const favoriteMatched = !filters.favoriteOnly || !favoriteTeam || matchIncludesTeam(match, favoriteTeam);
      const searchMatched =
        !searchText ||
        [match.homeTeam, match.awayTeam, match.stageLabel, match.group, match.city, match.venue]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchText));

      return stageMatched && teamMatched && favoriteMatched && searchMatched;
    });
  }, [favoriteTeam, filters.favoriteOnly, filters.query, filters.stage, filters.team, matches]);
}
