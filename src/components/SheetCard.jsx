// src/components/SheetCard.jsxa
// WHAT THIS DOES:
// Displays one sheet as a clickable card — name, problem count, progress bar.
// Pure presentational component — no state, no localStorage, no logic.
// SheetBrows er will pass all data as props and handle the click.

function SheetCard({ sheet, solvedCount, isSelected, onClick }) {
  const percentage = Math.round((solvedCount / sheet.totalProblems) * 100);

  return (
    <div
      onClick={onClick}
      className={`
        group cursor-pointer rounded-3xl p-5 border transition-all duration-300
        backdrop-blur-xl active:scale-[0.98]
        ${
          isSelected
            ? "bg-white/[0.08] border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
            : "bg-white/[0.04] border-white/10 hover:bg-white/[0.06] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        }
        hover:-translate-y-1
      `}
    >
      {/* top strip */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white mb-1 leading-snug">
            {sheet.name}
          </h3>
          <p className="text-xs text-slate-400">
            {sheet.totalProblems} problems
          </p>
        </div>

        <div
          className={`
            text-[11px] px-2.5 py-1 rounded-full border
            ${
              isSelected
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                : "bg-white/[0.04] text-slate-400 border-white/10"
            }
          `}
        >
          {isSelected ? "Selected" : "Sheet"}
        </div>
      </div>

      {/* Progress fraction */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Progress
        </span>
        <span className="text-xs font-medium text-slate-300">
          {solvedCount} / {sheet.totalProblems}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-500 shadow-[0_0_18px_rgba(255,255,255,0.08)]"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${sheet.color}, #a78bfa)`,
          }}
        />
      </div>

      {/* bottom row */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-slate-400">{percentage}% complete</p>

        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full shadow-md"
            style={{ backgroundColor: sheet.color }}
          />
          <span className="text-[11px] text-slate-500">
            {isSelected ? "Currently active" : "Click to open"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SheetCard;