import type { PropsWithChildren } from "react";
import { CalendarDays, Trophy, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavoriteTeam } from "@/hooks/useFavoriteTeam";
import { getTeamRoute } from "@/utils/match";

export function AppShell({ children }: PropsWithChildren) {
  const { favoriteTeam } = useFavoriteTeam();

  return (
    <div className="min-h-screen bg-[#07110f] text-stone-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,#245b4b55,transparent_35%),radial-gradient(circle_at_right,#d9b65b22,transparent_25%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d9b65b]/40 bg-[#d9b65b]/10 text-[#f4dd93]">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <Link to="/" className="font-display text-3xl uppercase tracking-[0.18em] text-[#f8efc8]">
                World Cup 2026
              </Link>
              <p className="text-sm text-stone-300">北京时间赛程、主队追踪与热门比赛导航</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-stone-200">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-[#d9b65b]/50 hover:bg-white/10">
              <CalendarDays className="h-4 w-4" />
              全部赛程
            </Link>
            {favoriteTeam ? (
              <Link
                to={getTeamRoute(favoriteTeam)}
                className="inline-flex items-center gap-2 rounded-full border border-[#2f9e7e]/30 bg-[#2f9e7e]/15 px-4 py-2 text-[#c6f2e6] transition hover:bg-[#2f9e7e]/20"
              >
                <HeartHandshake className="h-4 w-4" />
                我的主队：{favoriteTeam}
              </Link>
            ) : null}
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
          <p>全部赛程统一按北京时间展示，查赛程更直接。</p>
          <p>支持切换主队视角，快速锁定你最关注的比赛。</p>
        </footer>
      </div>
    </div>
  );
}
