import type { MatchItem, MatchStage } from "@/types/match";

export const stageOptions: Array<{ value: MatchStage | "all"; label: string }> = [
  { value: "all", label: "全部阶段" },
  { value: "group", label: "小组赛" },
  { value: "round_of_32", label: "32 强" },
  { value: "round_of_16", label: "16 强" },
  { value: "quarter_final", label: "8 强" },
  { value: "semi_final", label: "半决赛" },
  { value: "third_place", label: "季军赛" },
  { value: "final", label: "决赛" },
];

export function isTbdTeam(teamName: string) {
  return !teamName || teamName === "待定";
}

export function getAllTeams(matches: MatchItem[]) {
  return Array.from(
    new Set(
      matches.flatMap((match) => [match.homeTeam, match.awayTeam]).filter((team) => !isTbdTeam(team)),
    ),
  ).sort((left, right) => left.localeCompare(right, "zh-Hans-CN"));
}

export function matchIncludesTeam(match: MatchItem, teamName: string) {
  return match.homeTeam === teamName || match.awayTeam === teamName;
}

export function getMatchesByTeam(matches: MatchItem[], teamName: string) {
  return matches.filter((match) => matchIncludesTeam(match, teamName));
}

export function getNextMatch(matches: MatchItem[]) {
  const now = Date.now();
  return matches
    .filter((match) => new Date(match.kickoffBeijing).getTime() > now)
    .sort((left, right) => new Date(left.kickoffBeijing).getTime() - new Date(right.kickoffBeijing).getTime())[0];
}

export function getMatchLocation(match: MatchItem) {
  if (match.city && match.venue) {
    return `${match.city} · ${match.venue}`;
  }

  if (match.venue) {
    return match.venue;
  }

  if (match.city) {
    return match.city;
  }

  return "场馆待更新";
}

export function getTeamRoute(teamName: string) {
  return `/team/${encodeURIComponent(teamName)}`;
}

export function decodeTeamParam(teamParam?: string) {
  return teamParam ? decodeURIComponent(teamParam) : "";
}

export function getStageTone(stage: MatchStage) {
  switch (stage) {
    case "group":
      return "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30";
    case "round_of_32":
    case "round_of_16":
      return "bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/30";
    case "quarter_final":
      return "bg-sky-500/15 text-sky-100 ring-1 ring-sky-400/30";
    case "semi_final":
      return "bg-fuchsia-500/15 text-fuchsia-100 ring-1 ring-fuchsia-400/30";
    case "third_place":
      return "bg-stone-400/15 text-stone-100 ring-1 ring-stone-300/30";
    case "final":
      return "bg-yellow-400/20 text-yellow-100 ring-1 ring-yellow-300/40";
    default:
      return "bg-white/10 text-white ring-1 ring-white/20";
  }
}
