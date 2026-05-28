export type MatchStage =
  | "group"
  | "round_of_32"
  | "round_of_16"
  | "quarter_final"
  | "semi_final"
  | "third_place"
  | "final";

export interface MatchItem {
  id: string;
  matchNumber: number;
  stage: MatchStage;
  stageLabel: string;
  group: string | null;
  date: string;
  time: string;
  kickoffBeijing: string;
  homeTeam: string;
  awayTeam: string;
  status: string;
  statusLabel: string;
  city: string | null;
  venue: string | null;
  source: string;
}

export interface MatchDataMeta {
  sourceUrl: string;
  syncedAt: string;
  totalMatches: number;
}

export interface MatchDataProvider {
  getSnapshot(): MatchItem[];
  getMetaSnapshot(): MatchDataMeta;
  getAllMatches(): Promise<MatchItem[]>;
  getMatchById(matchId: string): Promise<MatchItem | undefined>;
  getMatchesByTeam(teamName: string): Promise<MatchItem[]>;
}

export interface MatchFilterValues {
  stage: MatchStage | "all";
  team: string;
  query: string;
  favoriteOnly: boolean;
}
