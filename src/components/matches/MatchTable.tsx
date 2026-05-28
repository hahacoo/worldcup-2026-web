import { Link } from "react-router-dom";
import type { MatchItem } from "@/types/match";
import { getMatchLocation, getStageTone } from "@/utils/match";
import { formatKickoff } from "@/utils/time";

interface MatchTableProps {
  matches: MatchItem[];
}

export function MatchTable({ matches }: MatchTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-[28px] border border-white/10 bg-black/20 lg:block">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead className="bg-white/5 text-stone-300">
          <tr>
            <th className="px-4 py-4 font-medium">场次</th>
            <th className="px-4 py-4 font-medium">时间</th>
            <th className="px-4 py-4 font-medium">对阵</th>
            <th className="px-4 py-4 font-medium">阶段</th>
            <th className="px-4 py-4 font-medium">地点</th>
            <th className="px-4 py-4 font-medium">详情</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {matches.map((match) => (
            <tr key={match.id} className="transition hover:bg-white/5">
              <td className="px-4 py-4 text-stone-400">#{match.matchNumber}</td>
              <td className="px-4 py-4 text-stone-100">{formatKickoff(match.kickoffBeijing)}</td>
              <td className="px-4 py-4">
                <div className="font-medium text-[#f6efc7]">
                  {match.homeTeam} <span className="mx-2 text-stone-500">vs</span> {match.awayTeam}
                </div>
                <div className="mt-1 text-xs text-stone-400">{match.group ? `${match.group} 组` : "淘汰赛对阵待定"}</div>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs ${getStageTone(match.stage)}`}>{match.stageLabel}</span>
              </td>
              <td className="px-4 py-4 text-stone-300">{getMatchLocation(match)}</td>
              <td className="px-4 py-4">
                <Link to={`/match/${match.id}`} className="text-[#d9b65b] transition hover:text-[#f4dd93]">
                  查看比赛
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
