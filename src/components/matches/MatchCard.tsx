import { MapPin, TimerReset } from "lucide-react";
import { Link } from "react-router-dom";
import type { MatchItem } from "@/types/match";
import { getMatchLocation, getStageTone, getTeamRoute, isTbdTeam } from "@/utils/match";
import { formatKickoff, getCountdownLabel } from "@/utils/time";

interface MatchCardProps {
  match: MatchItem;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-[#d9b65b]/30 hover:bg-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-stone-400">比赛 #{match.matchNumber}</p>
          <p className="mt-2 text-lg font-semibold text-[#f7efc8]">
            {match.homeTeam} <span className="mx-2 text-stone-500">vs</span> {match.awayTeam}
          </p>
        </div>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs ${getStageTone(match.stage)}`}>{match.stageLabel}</span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-stone-300 md:grid-cols-2">
        <div className="rounded-2xl bg-black/20 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-stone-500">北京时间</p>
          <p className="mt-2 font-medium text-stone-100">{formatKickoff(match.kickoffBeijing)}</p>
        </div>
        <div className="rounded-2xl bg-black/20 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-stone-500">开赛倒计时</p>
          <p className="mt-2 font-medium text-stone-100">{getCountdownLabel(match.kickoffBeijing)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm text-stone-300">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#d9b65b]" />
          <span>{getMatchLocation(match)}</span>
        </div>
        <div className="flex items-center gap-2">
          <TimerReset className="h-4 w-4 text-[#2f9e7e]" />
          <span>{match.group ? `${match.group} 组比赛` : "淘汰赛签位待定"}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {!isTbdTeam(match.homeTeam) ? (
          <Link to={getTeamRoute(match.homeTeam)} className="rounded-full border border-white/10 px-3 py-2 text-sm text-stone-100 transition hover:bg-white/10">
            查看 {match.homeTeam}
          </Link>
        ) : null}
        {!isTbdTeam(match.awayTeam) ? (
          <Link to={getTeamRoute(match.awayTeam)} className="rounded-full border border-white/10 px-3 py-2 text-sm text-stone-100 transition hover:bg-white/10">
            查看 {match.awayTeam}
          </Link>
        ) : null}
        <Link to={`/match/${match.id}`} className="rounded-full bg-[#d9b65b] px-3 py-2 text-sm font-medium text-[#07110f] transition hover:bg-[#f1d983]">
          比赛详情
        </Link>
      </div>
    </article>
  );
}
