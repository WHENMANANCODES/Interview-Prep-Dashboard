// src/components/SheetCard.jsx
// WHAT THIS DOES:
// Displays one sheet as a clickable card — name, problem count, progress bar.
// Pure presentational component — no state, no localStorage, no logic.
// SheetBrowser will pass all data as props and handle the click.

//IR
//This is a reusable presentational component that displays a DSA sheet as a card.
//It shows the sheet name, total problems, solved count, and a dynamic progress bar.
//It receives all data via props and uses conditional styling to highlight the selected sheet.

function SheetCard({ sheet, solvedCount, isSelected, onClick }) {
  // solvedCount  → how many problems from THIS sheet are in localStorage
  // sheet.totalProblems → real total (191 for Striver, even if we have 15 loaded)
  // isSelected   → boolean, true if this card is currently active
  // onClick      → function from SheetBrowser — updates which sheet is selected

  const percentage = Math.round((solvedCount / sheet.totalProblems) * 100);

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-2xl p-5 border transition-all duration-200
        bg-gray-900 hover:bg-gray-800 active:scale-[0.98]
        ${isSelected
          ? "border-green-500/60 shadow-lg shadow-orange-500/10"
          : "border-gray-800 hover:border-gray-700"
        }
      `}
    >
      {/* Sheet name */}
      <h3 className="text-sm font-semibold text-white mb-1">
        {sheet.name}
      </h3>

      {/* Problem count */}
      <p className="text-xs text-gray-500 mb-4">
        {sheet.totalProblems} problems
      </p>

      {/* Progress fraction — e.g. "12 / 191" */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">Progress</span>
        <span className="text-xs font-medium text-gray-300">
          {solvedCount} / {sheet.totalProblems}
        </span>
      </div>

      {/* Progress bar */}
      {/* The outer div is the grey track, inner div is the filled portion */}
      {/* Width is set via inline style — Tailwind can't do dynamic % widths */}

      {/* IR */}
      {/* I used inline styles for dynamic properties like width and color because
      Tailwind cannot handle runtime-calculated values like percentages. */}
      <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: sheet.color,
          }}
        />
      </div>

      {/* Percentage label */}
      <p className="text-xs text-gray-600 mt-2">{percentage}% complete</p>
    </div>
  );
}

export default SheetCard;