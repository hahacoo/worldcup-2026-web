import type { MatchItem } from "@/types/match";
import { formatKickoff, getCountdownLabel } from "@/utils/time";

interface MatchSummaryCardsProps {
  totalMatches: number;
  filteredMatches: number;
  favoriteTeam: string;
  favoriteCount: number;
  nextMatch?: MatchItem;
}

export function MatchSummaryCards({
  totalMatches,
  filteredMatches,
  favoriteTeam,
  favoriteCount,
  nextMatch,
}: MatchSummaryCardsProps) {
  const cards = [
    {
      label: "全部比赛",
      value: totalMatches,
      help: "完整 104 场赛程",
    },
    {
      label: "当前筛选结果",
      value: filteredMatches,
      help: "实时跟随条件变化",
    },
    {
      label: favoriteTeam ? `${favoriteTeam} 相关比赛` : "主队相关比赛",
      value: favoriteTeam ? favoriteCount : "--",
      help: favoriteTeam ? "主队赛程总数" : "先选择主队以启用",
    },
    {
      label: "下一场焦点",
      value: nextMatch ? `${nextMatch.homeTeam} vs ${nextMatch.awayTeam}` : "待更新",
      help: nextMatch ? `${formatKickoff(nextMatch.kickoffBeijing)} · ${getCountdownLabel(nextMatch.kickoffBeijing)}` : "等待新数据",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.18em] text-stone-400">{card.label}</p>
          <p className="mt-4 text-2xl font-semibold text-[#f8efc8]">{card.value}</p>
          <p className="mt-2 text-sm text-stone-300">{card.help}</p>
        </article>
      ))}
    </div>
  );
}
