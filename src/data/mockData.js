const problemsData = [
  { date: "2026-02-01", difficulty: "easy" },
  { date: "2026-02-02", difficulty: "easy" },
  { date: "2026-02-03", difficulty: "easy" },
  { date: "2026-02-04", difficulty: "easy" },
  { date: "2026-02-05", difficulty: "easy" },
  { date: "2026-02-06", difficulty: "easy" },
  { date: "2026-02-07", difficulty: "easy" },
  { date: "2026-02-08", difficulty: "easy" },
  { date: "2026-02-09", difficulty: "easy" },
  { date: "2026-02-10", difficulty: "hard" },
  { date: "2026-02-11", difficulty: "easy" },
  { date: "2026-02-12", difficulty: "easy" },
  { date: "2026-02-13", difficulty: "hard" },
  { date: "2026-02-14", difficulty: "easy" },
  { date: "2026-02-15", difficulty: "hard" },
  { date: "2026-02-16", difficulty: "easy" },
  { date: "2026-02-17", difficulty: "easy" },
  { date: "2026-02-18", difficulty: "easy" },
  { date: "2026-02-18", difficulty: "easy" },
  { date: "2026-02-18", difficulty: "hard" },
  { date: "2026-02-18", difficulty: "hard" },
  { date: "2026-02-19", difficulty: "easy" },
  { date: "2026-02-19", difficulty: "easy" },
  { date: "2026-02-20", difficulty: "easy" },
  { date: "2026-02-21", difficulty: "easy" },
  { date: "2026-02-22", difficulty: "easy" },
  { date: "2026-02-23", difficulty: "easy" },
  { date: "2026-02-24", difficulty: "easy" },
  { date: "2026-02-25", difficulty: "easy" },
  { date: "2026-02-25", difficulty: "easy" },
  { date: "2026-02-25", difficulty: "easy" },
]
export default problemsData


























// Notes

// ================= EXPORT / IMPORT RULE =================

// There are 2 types of exports in JavaScript:

// 1️⃣ Named Export
// Example:
// export const problemsData = [...]

// // Import named export using {}:
// import { problemsData } from "../data/mockdata";

// Rule:
// If you use "export const" → you MUST import using { }


// --------------------------------------------------------


// 2️⃣ Default Export
// Example:
// const problemsData = [...]
// export default problemsData;

// Import default export WITHOUT {}:
// import problemsData from "../data/mockdata";

// Rule:
// If you use "export default" → you DO NOT use { }


// --------------------------------------------------------


// 🔥 Simple Memory Trick:
// Named export  → { } needed
// Default export → NO { }


// JavaScript date format is YYYY-MM-DD