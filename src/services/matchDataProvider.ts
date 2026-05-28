import { matches } from "@/data/matches";
import { matchesMeta } from "@/data/matches.meta";
import type { MatchDataMeta, MatchDataProvider, MatchItem } from "@/types/match";
import { getMatchesByTeam } from "@/utils/match";

class LocalMatchDataProvider implements MatchDataProvider {
  private readonly items: MatchItem[];

  private readonly meta: MatchDataMeta;

  constructor(items: MatchItem[], meta: MatchDataMeta) {
    this.items = items;
    this.meta = meta;
  }

  getSnapshot() {
    return this.items;
  }

  getMetaSnapshot() {
    return this.meta;
  }

  async getAllMatches() {
    return this.items;
  }

  async getMatchById(matchId: string) {
    return this.items.find((match) => match.id === matchId);
  }

  async getMatchesByTeam(teamName: string) {
    return getMatchesByTeam(this.items, teamName);
  }
}

export const localMatchDataProvider = new LocalMatchDataProvider(matches, matchesMeta);
