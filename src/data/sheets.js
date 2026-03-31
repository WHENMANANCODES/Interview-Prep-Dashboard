// src/data/sheets.js
// This is the REGISTRY — the single source of truth about which sheets exist.
// When you want to add NeetCode 150 or Blind 75 later, you add ONE entry here.
// SheetBrowser will import this and loop over it to render the sheet cards.

import striverProblems from "./striver";
import neetcodeProblems from "./neetcode150";
import top150InterviewProblems from "./Top150";
import blind75Problems from "./Blind75Problems";
const sheets = [
  {
    id: "striver",           // used as localStorage key prefix + for filtering
    name: "Striver SDE Sheet",
    totalProblems: 191,      // real total — shows "15/191" even with partial data
    problems: striverProblems,
    color: "#f97316",        // orange — used for progress bar color
  },
  // Adding NeetCode 150 :
  {
    id: "neetcode",
    name: "NeetCode 150",
    totalProblems: 150,
    problems: neetcodeProblems,
    color: "#7F77DD",
  },

  //Adding top 150 interview problems :
{
    id: "TOP15-",
    name: "TOP 150 Interview Problems",
    totalProblems: 150,
    problems: top150InterviewProblems,
    color: "#7F77DD",
},
{
    id: "Blind75",
    name: "Blind 75",
    totalProblems: 75,
    problems: Blind75Problems,
    color: "#7F77DD",
},
//Add more sheets here later — just copy paste this block and change the values
];

export default sheets;