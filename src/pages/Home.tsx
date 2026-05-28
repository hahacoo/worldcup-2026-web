import { useMemo, useState } from "react";
import { ArrowRight, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { MatchFilters } from "@/components/filters/MatchFilters";
import { AppShell } from "@/components/layout/AppShell";
import { MatchCard } from "@/components/matches/MatchCard";
import { MatchSummaryCards } from "@/components/matches/MatchSummaryCards";
import { MatchTable } from "@/components/matches/MatchTable";
import { FavoriteTeamPicker } from "@/components/teams/FavoriteTeamPicker";
import { useFavoriteTeam } from "@/hooks/useFavoriteTeam";
import { useMatchesData } from "@/hooks/useMatchesData";
import { useMatchFilters } from "@/hooks/useMatchFilters";
import type { MatchFilterValues } from "@/types/match";
import { getAllTeams, getMatchesByTeam, getNextMatch, getTeamRoute } from "@/utils/match";

const initialFilters: MatchFilterValues = {
  stage: "all",
  team: "",
  query: "",
  favoriteOnly: false,
};

export default function Home() {
  const [filters, setFilters] = useState<MatchFilterValues>(initialFilters);
  const { favoriteTeam, setFavoriteTeam, clearFavoriteTeam } = useFavoriteTeam();
  const { matches, loading, error } = useMatchesData();

  const teams = useMemo(() => getAllTeams(matches), [matches]);
  const filteredMatches = useMatchFilters(matches, filters, favoriteTeam);
  const favoriteMatches = favoriteTeam ? getMatchesByTeam(matches, favoriteTeam) : [];
  const nextMatch = getNextMatch(matches);

  const handleFilterChange = <K extends keyof MatchFilterValues>(key: K, value: MatchFilterValues[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  if (loading && matches.length === 0) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          正在加载赛程数据...
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          赛程数据加载失败，请稍后重试。
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <article className="overflow-hidden rounded-[36px] border border-[#d9b65b]/20 bg-[linear-gradient(135deg,rgba(13,31,26,0.98),rgba(12,24,21,0.8)),radial-gradient(circle_at_top_right,rgba(217,182,91,0.22),transparent_32%)] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.26)] md:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[#d9b65b]">2026 美加墨世界杯</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl uppercase tracking-[0.08em] text-[#f7efc8] md:text-7xl">
            北京时间观赛地图
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 md:text-lg">
            站点聚合全部 104 场比赛，统一换算为北京时间，并支持设置主队后仅查看该球队全部赛程。
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-stone-400">赛事周期</p>
              <p className="mt-2 text-2xl font-semibold text-white">6 月 12 日 - 7 月 20 日</p>
              <p className="mt-2 text-sm text-stone-300">中国球迷视角的完整时间轴</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-stone-400">数据规模</p>
              <p className="mt-2 text-2xl font-semibold text-white">104 场比赛</p>
              <p className="mt-2 text-sm text-stone-300">72 场小组赛 + 32 场淘汰赛</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-stone-400">内容覆盖</p>
              <p className="mt-2 text-2xl font-semibold text-white">全阶段可查</p>
              <p className="mt-2 text-sm text-stone-300">从小组赛到决赛，一站看完整届赛程</p>
            </div>
          </div>
        </article>

        <article className="rounded-[36px] border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2f9e7e]/30 bg-[#2f9e7e]/10 px-3 py-2 text-sm text-[#cbf6eb]">
            <Sparkles className="h-4 w-4" />
            观赛看点
          </div>

          <div className="mt-6 space-y-4 text-stone-300">
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-stone-500">默认主队</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7efc8]">{favoriteTeam || "阿根廷"}</p>
              <p className="mt-2 text-sm">可在下方切换为阿根廷、英格兰、巴西等任意参赛球队。</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-stone-500">下一场焦点</p>
              <p className="mt-2 text-xl font-semibold text-white">{nextMatch ? `${nextMatch.homeTeam} vs ${nextMatch.awayTeam}` : "待更新"}</p>
              <p className="mt-2 text-sm">所有时间均按北京时间展示，不需要再做时差换算。</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {favoriteTeam ? (
                <Link
                  to={getTeamRoute(favoriteTeam)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d9b65b] px-4 py-3 text-sm font-medium text-[#07110f] transition hover:bg-[#f1d983]"
                >
                  直接查看 {favoriteTeam} 全部比赛
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              <div className="inline-flex items-center gap-2 self-center text-sm leading-6 text-stone-400">
                <Globe className="h-4 w-4 shrink-0" />
                <span>重点比赛、主队赛程和淘汰赛阶段都能快速切换查看</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <div className="mt-6 grid gap-6">
        <MatchSummaryCards
          totalMatches={matches.length}
          filteredMatches={filteredMatches.length}
          favoriteTeam={favoriteTeam}
          favoriteCount={favoriteMatches.length}
          nextMatch={nextMatch}
        />

        <FavoriteTeamPicker teams={teams} value={favoriteTeam} onChange={setFavoriteTeam} onClear={clearFavoriteTeam} />

        <MatchFilters filters={filters} teams={teams} favoriteTeam={favoriteTeam} onChange={handleFilterChange} />

        <section className="space-y-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#f8efc8]">全部赛程</h2>
              <p className="text-sm text-stone-300">共找到 {filteredMatches.length} 场比赛，支持继续按球队、阶段和关键字收窄。</p>
            </div>
          </div>

          <MatchTable matches={filteredMatches} />

          <div className="grid gap-4 lg:hidden">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          {filteredMatches.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-black/20 px-6 py-10 text-center text-stone-300">
              当前筛选条件下没有找到比赛，建议先清空球队或搜索条件。
            </div>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
