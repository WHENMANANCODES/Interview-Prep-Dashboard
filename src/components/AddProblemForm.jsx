import { useState } from "react";
import { addProblem } from "../services/api";

function AddProblemForm({ onRefresh }) {

  const [name,  setName]  = useState("");
  const [level, setLevel] = useState("Easy");
  const [date,  setDate]  = useState("");
  const [note,  setNote]  = useState("");
  const [topic, setTopic] = useState("arrays");

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!name || !level || !date || !note) {
      alert("Fill the required Information");
      return;
    }

    const newProblem = {
      name,
      level,
      date,
      note,
      topic,
    };

    try {
  
  await addProblem(newProblem);
await onRefresh(); // App.jsx se fresh data fetch hoga
      
      // Reset form
      setName("");
      setLevel("Easy");
      setDate("");
      setNote("");
      setTopic("arrays");
    } catch (err) {
      alert("Failed to add problem");
      console.error(err);
    }
  };

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

  const difficultyConfig = {
    Easy:   { active: "bg-green-500/20 text-green-400 border-green-500/40",   inactive: "text-gray-500 border-gray-700 hover:border-gray-600" },
    Medium: { active: "bg-amber-500/20  text-amber-400  border-amber-500/40", inactive: "text-gray-500 border-gray-700 hover:border-gray-600" },
    Hard:   { active: "bg-red-500/20   text-red-400   border-red-500/40",     inactive: "text-gray-500 border-gray-700 hover:border-gray-600" },
  };

  const inputCls = `
    w-full px-4 py-2.5 rounded-xl text-sm text-gray-100
    bg-gray-800 border border-gray-700
    placeholder-gray-600
    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
    transition duration-150
  `;

  return (
    <div className="w-full max-w-xl mx-auto">
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

      <form
        onSubmit={handlesubmit}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5"
      >
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
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

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Difficulty <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            {["Easy", "Medium", "Hard"].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                className={`
                  flex-1 py-2 rounded-xl text-sm font-medium border
                  transition-all duration-150 active:scale-95
                  ${level === lvl ? difficultyConfig[lvl].active : difficultyConfig[lvl].inactive}
                `}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={inputCls}
            >
              {topics.map((t) => (
                <option key={t.value} value={t.value} className="bg-gray-800 text-gray-100">
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
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