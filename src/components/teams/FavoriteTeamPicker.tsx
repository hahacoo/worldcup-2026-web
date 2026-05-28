import { Heart, Trash2 } from "lucide-react";

interface FavoriteTeamPickerProps {
  teams: string[];
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function FavoriteTeamPicker({ teams, value, onChange, onClear }: FavoriteTeamPickerProps) {
  return (
    <section className="rounded-[28px] border border-[#d9b65b]/20 bg-[#0d1f1a]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d9b65b]/15 text-[#efd68b]">
          <Heart className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#f7efc7]">主队选择</h2>
          <p className="text-sm text-stone-300">选中后可一键只看该球队的全部比赛，默认预设为阿根廷。</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 text-base text-stone-100 outline-none transition focus:border-[#d9b65b]/50"
        >
          <option value="">请选择主队</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 text-sm text-stone-200 transition hover:bg-white/10"
        >
          <Trash2 className="h-4 w-4" />
          清除主队
        </button>
      </div>
    </section>
  );
}
