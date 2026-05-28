import type { MatchFilterValues, MatchStage } from "@/types/match";
import { stageOptions } from "@/utils/match";

interface MatchFiltersProps {
  filters: MatchFilterValues;
  teams: string[];
  favoriteTeam: string;
  onChange: <K extends keyof MatchFilterValues>(key: K, value: MatchFilterValues[K]) => void;
}

export function MatchFilters({ filters, teams, favoriteTeam, onChange }: MatchFiltersProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#f7efc7]">筛选与搜索</h2>
          <p className="text-sm text-stone-300">支持按阶段、球队、关键字与“只看主队”切换。</p>
        </div>
        {favoriteTeam ? (
          <button
            type="button"
            onClick={() => onChange("favoriteOnly", !filters.favoriteOnly)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filters.favoriteOnly
                ? "bg-[#d9b65b] text-[#07110f]"
                : "border border-white/10 bg-black/20 text-stone-200 hover:bg-white/10"
            }`}
          >
            {filters.favoriteOnly ? `正在只看 ${favoriteTeam}` : `切换到只看 ${favoriteTeam}`}
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="flex flex-col gap-2 text-sm text-stone-300">
          阶段
          <select
            value={filters.stage}
            onChange={(event) => onChange("stage", event.target.value as MatchStage | "all")}
            className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-stone-100 outline-none transition focus:border-[#d9b65b]/50"
          >
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-stone-300">
          球队
          <select
            value={filters.team}
            onChange={(event) => onChange("team", event.target.value)}
            className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-stone-100 outline-none transition focus:border-[#d9b65b]/50"
          >
            <option value="">全部球队</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </label>

        <label className="md:col-span-2 flex flex-col gap-2 text-sm text-stone-300">
          搜索
          <input
            value={filters.query}
            onChange={(event) => onChange("query", event.target.value)}
            placeholder="输入球队、阶段、城市或场馆"
            className="min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-[#d9b65b]/50"
          />
        </label>
      </div>
    </section>
  );
}
