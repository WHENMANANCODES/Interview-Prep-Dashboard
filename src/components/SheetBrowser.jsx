// src/components/SheetBrowser.jsx
import { useState } from "react";
import sheets from "../data/sheets";
import SheetCard from "./SheetCard";
import ProblemTable from "./ProblemTable";
import Navbar from "./Navbar";

function SheetBrowser() {

  // ── WHICH SHEET IS SELECTED ───────────────────────────────────────────────
  const [selectedSheetId, setSelectedSheetId] = useState(sheets[0].id);
  const activeSheet = sheets.find((s) => s.id === selectedSheetId);

  // ── MODAL STATE ───────────────────────────────────────────────────────────
  // Controls whether the "Log Problem" drawer is visible
  const [showModal, setShowModal] = useState(false);

  // ── FORM STATE ────────────────────────────────────────────────────────────
  // Each field matches the shape of problems stored in localStorage
  const [formName,       setFormName]       = useState("");
  const [formLevel,      setFormLevel]      = useState("Easy");
  const [formDate,       setFormDate]       = useState(
    // Default to today's date in YYYY-MM-DD format
    new Date().toISOString().slice(0, 10)
  );
  const [formNote,       setFormNote]       = useState("");
  const [formTopic,      setFormTopic]      = useState("arrays");
  const [formSource,     setFormSource]     = useState("contest"); // where they solved it
  const [formPlatform,   setFormPlatform]   = useState("Codeforces");
  const [formLink,       setFormLink]       = useState(""); // optional problem URL

  // ── SUCCESS FLASH ─────────────────────────────────────────────────────────
  // Shows a brief "Added!" confirmation after submit
  const [showSuccess, setShowSuccess] = useState(false);

  // ── LOCALSTORAGE HELPERS ──────────────────────────────────────────────────
  // Read saved problems fresh each render so count stays accurate
  const getSaved = () => JSON.parse(localStorage.getItem("problems")) || [];

  const getSolvedCount = (sheetId) =>
    getSaved().filter((p) => p.fromSheet === sheetId).length;

  // ── SUBMIT HANDLER ────────────────────────────────────────────────────────
  // Builds a new problem object and appends it to localStorage.
  // Uses the same shape as AddProblemForm so all pages (Dashboard, Weekly,
  // Streak, Problemspage) can read it without any changes.
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    if (!formName || !formDate) {
      alert("Problem name and date are required.");
      return;
    }

    const saved = getSaved();

    const newProblem = {
      id:         Date.now(),          // unique numeric timestamp ID
      name:       formName.trim(),
      level:      formLevel,           // "Easy" | "Medium" | "Hard"
      date:       formDate,            // "YYYY-MM-DD"
      note:       formNote.trim(),
      topic:      formTopic,
      fromSheet:  activeSheet.id,      // ties it to the currently active sheet
      source:     formSource,          // "contest" | "practice" | "interview"
      platform:   formPlatform,        // "Codeforces", "LeetCode", etc.
      link:       formLink.trim(),     // optional URL to the problem
    };

    // Spread creates a new array — never mutate state/localStorage directly
    localStorage.setItem("problems", JSON.stringify([...saved, newProblem]));

    // Show success flash, then close modal after 1.2s
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
      resetForm();
    }, 1200);
  };

  // ── RESET FORM ────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormName("");
    setFormLevel("Easy");
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormNote("");
    setFormTopic("arrays");
    setFormSource("contest");
    setFormPlatform("Codeforces");
    setFormLink("");
  };

  // ── TOPIC OPTIONS ─────────────────────────────────────────────────────────
  const topics = [
    { value: "complexity",          label: "Time & Space Complexity"   },
    { value: "arrays",              label: "Arrays"                    },
    { value: "strings",             label: "Strings"                   },
    { value: "recursion",           label: "Recursion"                 },
    { value: "backtracking",        label: "Backtracking"              },
    { value: "bit-manipulation",    label: "Bit Manipulation"          },
    { value: "linked-list",         label: "Linked List"               },
    { value: "stack",               label: "Stack"                     },
    { value: "queue",               label: "Queue"                     },
    { value: "hashing",             label: "Hashing"                   },
    { value: "sorting",             label: "Sorting Algorithms"        },
    { value: "searching",           label: "Searching (Binary Search)" },
    { value: "trees",               label: "Binary Trees"              },
    { value: "bst",                 label: "Binary Search Trees"       },
    { value: "heaps",               label: "Heaps / Priority Queue"    },
    { value: "graphs",              label: "Graphs"                    },
    { value: "greedy",              label: "Greedy Algorithms"         },
    { value: "dynamic-programming", label: "Dynamic Programming"       },
    { value: "trie",                label: "Trie"                      },
    { value: "dsu",                 label: "Disjoint Set Union"        },
    { value: "segment-tree",        label: "Segment Tree"              },
    { value: "sliding-window",      label: "Sliding Window"            },
    { value: "two-pointers",        label: "Two Pointers"              },
  ];

  const platforms = [
    "Codeforces", "LeetCode", "CodeChef", "AtCoder",
    "HackerRank", "GeeksForGeeks", "InterviewBit", "Other",
  ];

  // Shared input class — DRY, used on every input/select in the form
  const inputCls = `
    w-full px-4 py-2.5 rounded-xl text-sm text-gray-100
    bg-white/[0.06] border border-white/10
    placeholder-gray-600
    focus:outline-none focus:ring-2 focus:ring-orange-500/40
    focus:border-orange-500/30 transition duration-150
  `;

  // Difficulty pill active/inactive styles
  const diffStyle = {
    Easy:   { on: "bg-green-500/20 text-green-400 border-green-500/40",  off: "text-gray-500 border-white/10 hover:border-white/20" },
    Medium: { on: "bg-amber-500/20 text-amber-400 border-amber-500/40",  off: "text-gray-500 border-white/10 hover:border-white/20" },
    Hard:   { on: "bg-red-500/20   text-red-400   border-red-500/40",    off: "text-gray-500 border-white/10 hover:border-white/20" },
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden">

      {/* ── BACKGROUND GLOW ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[28rem] h-[28rem] bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] bg-cyan-400/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.08),_transparent_30%)]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 px-6 lg:px-10 py-10 max-w-7xl mx-auto w-full">

        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-orange-300 uppercase mb-2 font-semibold">
              DSA Tracker
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Practice Sheets
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Pick a sheet and start solving
            </p>
          </div>

          {/* ── LOG PROBLEM BUTTON ───────────────────────────────────────── */}
          {/* Opens the modal — positioned in the header so it's always visible */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm
                       font-semibold bg-orange-500 hover:bg-orange-400 text-white
                       transition-all duration-150 active:scale-95 shrink-0
                       shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          >
            <span className="text-base">+</span>
            Log Problem
          </button>
        </div>

        {/* ── CURRENT FOCUS STRIP ──────────────────────────────────────────── */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04]
                        backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-5">
          <div className="flex flex-col sm:flex-row sm:items-center
                          sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">
                Current Focus
              </p>
              <h2 className="text-lg font-semibold text-white">
                {activeSheet.name}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {getSolvedCount(activeSheet.id)} of {activeSheet.totalProblems} solved
              </p>
            </div>
            <span className="w-fit text-xs px-4 py-2 rounded-full border
                             bg-orange-500/10 text-orange-300 border-orange-400/20
                             shadow-[0_0_20px_rgba(251,146,60,0.08)]">
              {Math.round(
                (getSolvedCount(activeSheet.id) / activeSheet.totalProblems) * 100
              )}% complete
            </span>
          </div>
        </div>

        {/* ── SHEET CARDS ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {sheets.map((sheet) => (
            <SheetCard
              key={sheet.id}
              sheet={sheet}
              solvedCount={getSolvedCount(sheet.id)}
              isSelected={selectedSheetId === sheet.id}
              onClick={() => setSelectedSheetId(sheet.id)}
            />
          ))}
        </div>

        {/* ── ACTIVE SHEET HEADER ───────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center
                        sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {activeSheet.name}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore problems and mark your progress sheet by sheet
            </p>
          </div>
          <span className="w-fit text-xs px-3.5 py-1.5 rounded-full border
                           bg-white/[0.04] text-slate-300 border-white/10">
            Total Problems: {activeSheet.totalProblems}
          </span>
        </div>

        {/* ── PROBLEM TABLE ─────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04]
                        backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                        p-3 sm:p-4">
          <ProblemTable
            problems={activeSheet.problems.map((p) => ({
              ...p,
              fromSheet: activeSheet.id,
            }))}
          />
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          LOG PROBLEM MODAL
          Rendered at the root level so it overlays everything cleanly.
          Clicking the dark backdrop closes the modal (UX standard).
      ══════════════════════════════════════════════════════════════════════ */}
      {showModal && (
        // ── BACKDROP ──────────────────────────────────────────────────────
        // fixed + inset-0 covers the entire viewport regardless of scroll.
        // z-50 puts it above all page content.
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/70 backdrop-blur-sm px-4"
          onClick={() => { setShowModal(false); resetForm(); }} // click outside = close
        >
          {/* ── MODAL PANEL ───────────────────────────────────────────────
              stopPropagation prevents clicking inside the modal from
              bubbling up to the backdrop and closing it accidentally.
          ──────────────────────────────────────────────────────────────── */}
          <div
            className="relative w-full max-w-lg bg-[#0f172a] border border-white/10
                       rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.6)]
                       max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ── MODAL HEADER ──────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4
                            border-b border-white/10">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Log a Problem
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manually add a problem you solved outside the sheets
                </p>
              </div>
              {/* Close button */}
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="w-8 h-8 flex items-center justify-center
                           rounded-full bg-white/[0.06] hover:bg-white/10
                           text-slate-400 hover:text-white transition-all text-lg"
              >
                ✕
              </button>
            </div>

            {/* ── FORM ──────────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

              {/* Active sheet indicator — read-only, just for context */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                              bg-orange-500/10 border border-orange-500/20">
                <span className="text-orange-400 text-xs">📌</span>
                <span className="text-xs text-orange-300">
                  Adding to: <span className="font-medium">{activeSheet.name}</span>
                </span>
              </div>

              {/* ── PROBLEM NAME ────────────────────────────────────────── */}
              <div>
                <label className="block text-xs font-medium text-slate-400
                                  uppercase tracking-wider mb-2">
                  Problem Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Longest Substring Without Repeating"
                  className={inputCls}
                />
              </div>

              {/* ── DIFFICULTY PILLS ────────────────────────────────────── */}
              <div>
                <label className="block text-xs font-medium text-slate-400
                                  uppercase tracking-wider mb-2">
                  Difficulty
                </label>
                <div className="flex gap-2">
                  {["Easy", "Medium", "Hard"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"           // never submit the form
                      onClick={() => setFormLevel(lvl)}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border
                                  transition-all duration-150 active:scale-95
                                  ${formLevel === lvl
                                    ? diffStyle[lvl].on
                                    : diffStyle[lvl].off}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── SOURCE + PLATFORM (side by side) ────────────────────── */}
              <div className="grid grid-cols-2 gap-3">

                {/* Where did they solve it? */}
                <div>
                  <label className="block text-xs font-medium text-slate-400
                                    uppercase tracking-wider mb-2">
                    Source
                  </label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    className={inputCls}
                  >
                    <option value="contest">Contest</option>
                    <option value="practice">Practice</option>
                    <option value="interview">Mock Interview</option>
                    <option value="daily">Daily Challenge</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Which platform? */}
                <div>
                  <label className="block text-xs font-medium text-slate-400
                                    uppercase tracking-wider mb-2">
                    Platform
                  </label>
                  <select
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value)}
                    className={inputCls}
                  >
                    {platforms.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* ── DATE + TOPIC (side by side) ─────────────────────────── */}
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-medium text-slate-400
                                    uppercase tracking-wider mb-2">
                    Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400
                                    uppercase tracking-wider mb-2">
                    Topic
                  </label>
                  {/* value= + onChange= = controlled select (React owns the value) */}
                  <select
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    className={inputCls}
                  >
                    {topics.map((t) => (
                      <option key={t.value} value={t.value}
                              className="bg-slate-900">
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* ── PROBLEM LINK (optional) ──────────────────────────────── */}
              <div>
                <label className="block text-xs font-medium text-slate-400
                                  uppercase tracking-wider mb-2">
                  Problem Link
                  <span className="text-slate-600 normal-case ml-1">(optional)</span>
                </label>
                <input
                  type="url"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  placeholder="https://codeforces.com/..."
                  className={inputCls}
                />
              </div>

              {/* ── NOTE ───────────────────────────────────────────────── */}
              <div>
                <label className="block text-xs font-medium text-slate-400
                                  uppercase tracking-wider mb-2">
                  Note
                  <span className="text-slate-600 normal-case ml-1">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  placeholder="Approach used, key insight, time taken..."
                  className={inputCls}
                />
              </div>

              {/* ── SUBMIT ──────────────────────────────────────────────── */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-sm font-semibold
                           bg-orange-500 hover:bg-orange-400 text-white
                           transition-all duration-150 active:scale-[0.98]
                           shadow-[0_0_20px_rgba(249,115,22,0.25)]"
              >
                {/* Shows "Added! ✓" briefly after submit, then resets */}
                {showSuccess ? "Added! ✓" : "Log Problem →"}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default SheetBrowser;