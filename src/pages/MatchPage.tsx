import { ChevronLeft, ChevronRight, MapPin, TimerReset } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { useMatchesData } from "@/hooks/useMatchesData";
import { getMatchLocation, getStageTone, getTeamRoute, isTbdTeam } from "@/utils/match";
import { formatKickoff, getCountdownLabel } from "@/utils/time";

export default function MatchPage() {
  const params = useParams();
  const { matches, loading, error } = useMatchesData();
  const index = matches.findIndex((match) => match.id === params.matchId);
  const match = index >= 0 ? matches[index] : undefined;

  if (loading && matches.length === 0) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          正在加载比赛详情...
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          比赛详情加载失败，请返回首页重试。
        </div>
      </AppShell>
    );
  }

  if (!match) {
    return (
      <AppShell>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-stone-300">
          没有找到这场比赛，请返回 <Link to="/" className="text-[#d9b65b]">全部赛程</Link>。
        </div>
      </AppShell>
    );
  }

  const previousMatch = index > 0 ? matches[index - 1] : undefined;
  const nextMatch = index < matches.length - 1 ? matches[index + 1] : undefined;

  return (
    <AppShell>
      <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,31,26,0.98),rgba(11,20,17,0.84))] p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-sm ${getStageTone(match.stage)}`}>{match.stageLabel}</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-stone-300">比赛 #{match.matchNumber}</span>
          {match.group ? <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-stone-300">{match.group} 组</span> : null}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-black/20 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-stone-400">对阵双方</p>
            <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.06em] text-[#f7efc8] md:text-6xl">
              {match.homeTeam} <span className="mx-3 text-stone-500">vs</span> {match.awayTeam}
            </h1>
            <div className="mt-6 flex flex-wrap gap-3">
              {!isTbdTeam(match.homeTeam) ? (
                <Link to={getTeamRoute(match.homeTeam)} className="rounded-full border border-white/10 px-4 py-3 text-sm text-stone-100 transition hover:bg-white/10">
                  查看 {match.homeTeam}
                </Link>
              ) : null}
              {!isTbdTeam(match.awayTeam) ? (
                <Link to={getTeamRoute(match.awayTeam)} className="rounded-full border border-white/10 px-4 py-3 text-sm text-stone-100 transition hover:bg-white/10">
                  查看 {match.awayTeam}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-black/20 p-6 text-stone-200">
            <div className="flex items-center gap-3 text-[#d9b65b]">
              <TimerReset className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.18em]">北京时间</span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">{formatKickoff(match.kickoffBeijing)}</p>
            <p className="mt-3 text-sm text-stone-400">{getCountdownLabel(match.kickoffBeijing)}</p>

            <div className="mt-6 flex items-center gap-3 text-[#2f9e7e]">
              <MapPin className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.18em]">比赛地点</span>
            </div>
            <p className="mt-4 text-lg text-white">{getMatchLocation(match)}</p>
            <p className="mt-3 text-sm text-stone-400">当前页面展示的是 MVP 级别的赛程信息，后续可扩展比分、阵容和事件流。</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-stone-400">观赛信息</p>
          <p className="mt-3 text-lg font-semibold text-[#f7efc8]">时间与地点一目了然</p>
          <p className="mt-2 text-sm text-stone-300">方便快速确认这场比赛什么时候踢、在哪里踢。</p>
        </article>
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-stone-400">当前状态</p>
          <p className="mt-3 text-lg font-semibold text-[#f7efc8]">{match.statusLabel}</p>
          <p className="mt-2 text-sm text-stone-300">赛前、进行中和赛后状态都会统一显示在这里。</p>
        </article>
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-stone-400">赛事阶段</p>
          <p className="mt-3 text-lg font-semibold text-[#f7efc8]">{match.stageLabel}</p>
          <p className="mt-2 text-sm text-stone-300">帮你快速判断这场比赛属于小组赛还是淘汰赛关键战。</p>
        </article>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {previousMatch ? (
          <Link to={`/match/${previousMatch.id}`} className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <ChevronLeft className="h-4 w-4" />
              上一场
            </div>
            <p className="mt-3 text-xl font-semibold text-[#f7efc8]">{previousMatch.homeTeam} vs {previousMatch.awayTeam}</p>
          </Link>
        ) : <div className="rounded-[28px] border border-dashed border-white/10 bg-black/20 p-5 text-stone-500">已经是第一场比赛</div>}

        {nextMatch ? (
          <Link to={`/match/${nextMatch.id}`} className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <div className="flex items-center justify-end gap-2 text-sm text-stone-400">
              下一场
              <ChevronRight className="h-4 w-4" />
            </div>
            <p className="mt-3 text-right text-xl font-semibold text-[#f7efc8]">{nextMatch.homeTeam} vs {nextMatch.awayTeam}</p>
          </Link>
        ) : <div className="rounded-[28px] border border-dashed border-white/10 bg-black/20 p-5 text-right text-stone-500">已经是最后一场比赛</div>}
      </section>
    </AppShell>
  );
}
