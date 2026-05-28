import { Heart, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { MatchCard } from "@/components/matches/MatchCard";
import { useFavoriteTeam } from "@/hooks/useFavoriteTeam";
import { useMatchesData } from "@/hooks/useMatchesData";
import { decodeTeamParam, getMatchesByTeam, getNextMatch } from "@/utils/match";

export default function TeamPage() {
  const params = useParams();
  const teamName = decodeTeamParam(params.teamSlug);
  const { matches, loading, error } = useMatchesData();
  const teamMatches = getMatchesByTeam(matches, teamName);
  const nextMatch = getNextMatch(teamMatches);
  const { favoriteTeam, setFavoriteTeam, clearFavoriteTeam } = useFavoriteTeam();
  const isFavorite = favoriteTeam === teamName;

  if (loading && matches.length === 0) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          正在加载球队赛程...
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          球队赛程加载失败，请返回首页重试。
        </div>
      </AppShell>
    );
  }

  if (!teamName || teamMatches.length === 0) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          没有找到对应球队，请返回 <Link to="/" className="text-[#d9b65b]">全部赛程</Link> 重新选择。
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,31,26,0.96),rgba(15,27,24,0.84))] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[#d9b65b]">球队视角</p>
        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-5xl uppercase tracking-[0.08em] text-[#f7efc8] md:text-6xl">{teamName}</h1>
            <p className="mt-3 max-w-2xl text-stone-300">这里汇总 {teamName} 在 2026 世界杯中的全部比赛，所有时间已统一换算为北京时间。</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => (isFavorite ? clearFavoriteTeam() : setFavoriteTeam(teamName))}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm transition ${
                isFavorite ? "bg-[#d9b65b] text-[#07110f]" : "border border-white/10 bg-white/5 text-stone-100 hover:bg-white/10"
              }`}
            >
              <Heart className="h-4 w-4" />
              {isFavorite ? "取消主队" : "设为我的主队"}
            </button>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-stone-100 transition hover:bg-white/10">
              返回全部赛程
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-stone-400">比赛总数</p>
          <p className="mt-3 text-3xl font-semibold text-[#f7efc8]">{teamMatches.length}</p>
        </article>
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-stone-400">下一场比赛</p>
          <p className="mt-3 text-xl font-semibold text-[#f7efc8]">{nextMatch ? `${nextMatch.homeTeam} vs ${nextMatch.awayTeam}` : "待更新"}</p>
        </article>
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-stone-400">观察模式</p>
          <p className="mt-3 inline-flex items-center gap-2 text-[#c7f5e9]">
            <ShieldCheck className="h-4 w-4" />
            球队赛程时间轴
          </p>
        </article>
      </section>

      <section className="mt-6 grid gap-4">
        {teamMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </section>
    </AppShell>
  );
}
