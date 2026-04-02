import { useState } from "react";

function AddProblemForm({ problems, setProblems }) {

  // ── FORM STATE ─────────────────────────────────────────────────────────────
  // Each field has its own useState hook. This is "controlled components" pattern
  // — React is the single source of truth for every input's value.
  // The input's value= prop reads from state, onChange= writes back to state.
  const [name,  setName]  = useState("");
  const [level, setLevel] = useState("Easy");
  const [date,  setDate]  = useState("");
  const [note,  setNote]  = useState("");
  const [topic, setTopic] = useState("arrays");

  // ── SUBMIT HANDLER ─────────────────────────────────────────────────────────
  // e.preventDefault() stops the browser's default form behaviour (page reload).
  // Without it, the page would refresh and all React state would be wiped.
  const handlesubmit = (e) => {
    e.preventDefault();

    // Validation: if any required field is empty, alert and bail out early.
    // This is a "guard clause" — fail fast before doing any real work.
    if (!name || !level || !date || !note) {
      alert("Fill the required Information");
      return;
    }

    // Build the new problem object.
    // Date.now() gives a unique numeric timestamp as the ID —
    // good enough for localStorage-based apps without a backend.
    const newProblem = {
      id:    Date.now(),
      name:  name,
      level: level,
      date:  date,
      note:  note,
      topic: topic,
    };

    // Spread [...problems, newProblem] creates a NEW array (immutability).
    // Never push() directly into state — React won't detect the change.
    setProblems([...problems, newProblem]);

    // Also persist to localStorage so data survives page refreshes.
    localStorage.setItem("problems", JSON.stringify([...problems, newProblem]));

    // Reset all fields back to defaults after successful submission.
    setName("");
    setLevel("Easy");
    setDate("");
    setNote("");
    setTopic("arrays");
  };

  // ── TOPIC OPTIONS ──────────────────────────────────────────────────────────
  // Extracted as an array so the JSX stays clean.
  // Each object has value (stored in localStorage) and label (shown to user).
  const topics = [
    { value: "complexity",           label: "Time & Space Complexity"   },
    { value: "arrays",               label: "Arrays"                    },
    { value: "strings",              label: "Strings"                   },
    { value: "recursion",            label: "Recursion"                 },
    { value: "backtracking",         label: "Backtracking"              },
    { value: "bit-manipulation",     label: "Bit Manipulation"          },
    { value: "linked-list",          label: "Linked List"               },
    { value: "stack",                label: "Stack"                     },
    { value: "queue",                label: "Queue"                     },
    { value: "hashing",              label: "Hashing"                   },
    { value: "sorting",              label: "Sorting Algorithms"        },
    { value: "searching",            label: "Searching (Binary Search)" },
    { value: "trees",                label: "Binary Trees"              },
    { value: "bst",                  label: "Binary Search Trees"       },
    { value: "heaps",                label: "Heaps / Priority Queue"    },
    { value: "graphs",               label: "Graphs"                    },
    { value: "greedy",               label: "Greedy Algorithms"         },
    { value: "dynamic-programming",  label: "Dynamic Programming"       },
    { value: "trie",                 label: "Trie"                      },
    { value: "dsu",                  label: "Disjoint Set Union"        },
    { value: "segment-tree",         label: "Segment Tree"              },
    { value: "sliding-window",       label: "Sliding Window"            },
    { value: "two-pointers",         label: "Two Pointers"              },
  ];

  // ── DIFFICULTY CONFIG ──────────────────────────────────────────────────────
  // Used to highlight the active difficulty pill with the right accent color.
  const difficultyConfig = {
    Easy:   { active: "bg-green-500/20 text-green-400 border-green-500/40",   inactive: "text-gray-500 border-gray-700 hover:border-gray-600" },
    Medium: { active: "bg-amber-500/20  text-amber-400  border-amber-500/40", inactive: "text-gray-500 border-gray-700 hover:border-gray-600" },
    Hard:   { active: "bg-red-500/20   text-red-400   border-red-500/40",     inactive: "text-gray-500 border-gray-700 hover:border-gray-600" },
  };

  // ── SHARED INPUT CLASSES ───────────────────────────────────────────────────
  // DRY: define once, reuse on every input/select instead of repeating the string.
  const inputCls = `
    w-full px-4 py-2.5 rounded-xl text-sm text-gray-100
    bg-gray-800 border border-gray-700
    placeholder-gray-600
    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
    transition duration-150
  `;

  return (
    // ── OUTER WRAPPER ──────────────────────────────────────────────────────
    // max-w-xl + mx-auto centers the form on wide screens.
    <div className="w-full max-w-xl mx-auto">

      {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20
                        flex items-center justify-center text-base">
          ➕
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Add a Problem</h2>
          <p className="text-xs text-gray-500">Fill in the details and hit submit</p>
        </div>
      </div>

      {/* ── FORM CARD ───────────────────────────────────────────────────────
          All inputs live inside one <form> tag so pressing Enter or clicking
          the submit button both trigger handlesubmit via onSubmit.
      ──────────────────────────────────────────────────────────────────── */}
      <form
        onSubmit={handlesubmit}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5"
      >

        {/* ── PROBLEM NAME ──────────────────────────────────────────────── */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase
                            tracking-wider mb-2">
            Problem Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Two Sum, Merge Intervals..."
            className={inputCls}
          />
        </div>

        {/* ── DIFFICULTY — pill toggle instead of a plain dropdown ──────── */}
        {/* Clicking a pill calls setLevel() with that difficulty's value.   */}
        {/* The active pill gets an accent color via difficultyConfig above. */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase
                            tracking-wider mb-2">
            Difficulty <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            {["Easy", "Medium", "Hard"].map((lvl) => (
              <button
                key={lvl}
                type="button"               // prevent accidental form submission
                onClick={() => setLevel(lvl)}
                className={`
                  flex-1 py-2 rounded-xl text-sm font-medium border
                  transition-all duration-150 active:scale-95
                  ${level === lvl
                    ? difficultyConfig[lvl].active
                    : difficultyConfig[lvl].inactive}
                `}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* ── DATE + TOPIC — side by side on wider screens ──────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase
                              tracking-wider mb-2">
              Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Topic dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase
                              tracking-wider mb-2">
              Topic
            </label>
            {/* value={topic} + onChange keeps this a controlled select —
                React always knows exactly which option is selected. */}
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={inputCls}
            >
              {/* Map over the topics array — cleaner than 23 hardcoded <option> tags */}
              {topics.map((t) => (
                <option key={t.value} value={t.value}
                        className="bg-gray-800 text-gray-100">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* ── NOTE ──────────────────────────────────────────────────────── */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase
                            tracking-wider mb-2">
            Note <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Key insight, approach used, time taken..."
            className={inputCls}
          />
        </div>

        {/* ── SUBMIT BUTTON ─────────────────────────────────────────────── */}
        {/* type="submit" triggers the form's onSubmit={handlesubmit}.       */}
        {/* w-full makes it span the full card width for easy tapping.       */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl text-sm font-semibold
                     bg-orange-500 hover:bg-orange-400
                     text-white transition-all duration-150
                     active:scale-[0.98] mt-2"
        >
          Add Problem →
        </button>

      </form>
    </div>
  );
}

export default AddProblemForm;