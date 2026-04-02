import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer,
} from "recharts";

function Problemspage() {

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("problems")) || [];
    setProblems(saved);
  }, []);

  const sortedProblems = [...problems].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const topicCount = {};
  sortedProblems.forEach((problem) => {
    if (problem.topic) {
      topicCount[problem.topic] = (topicCount[problem.topic] || 0) + 1;
    }
  });

  const chartData = Object.keys(topicCount).map((key) => ({
    topic: key,
    count: topicCount[key],
  }));

  const handleDelete = (indexToDelete) => {
    const updated = sortedProblems.filter((_, index) => index !== indexToDelete);
    setProblems(updated);
    localStorage.setItem("problems", JSON.stringify(updated));
  };

  const difficultyStyle = (level) => {
    if (level === "Easy")   return "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20";
    if (level === "Medium") return "bg-amber-500/10 text-amber-300 border border-amber-400/20";
    if (level === "Hard")   return "bg-rose-500/10 text-rose-300 border border-rose-400/20";
    return "bg-slate-700 text-slate-400";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-sm shadow-xl">
          <p className="text-slate-400">{label}</p>
          <p className="text-orange-300 font-semibold">{payload[0].value} problems</p>
        </div>
      );
    }
    return null;
  };

  if (sortedProblems.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">📭</span>
        <h2 className="text-xl font-semibold text-slate-300">No problems solved yet</h2>
        <p className="text-slate-500 text-sm">Head to Dashboard and start solving!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[28rem] h-[28rem] bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] bg-cyan-400/10 blur-3xl rounded-full" />
      </div>

      <Navbar />

      {/* HEADER */}
      <header className="relative z-10 px-6 lg:px-10 py-6 mt-6 max-w-7xl mx-auto w-full">
        <p className="text-xs tracking-[0.25em] text-orange-300 uppercase mb-2">
          DSA Tracker
        </p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white">All Problems</h1>
            <p className="text-slate-400 text-sm mt-1">
              Your complete solving history
            </p>
          </div>

          <span className="text-sm font-medium text-orange-300 bg-orange-500/10 border border-orange-400/20 rounded-full px-4 py-1.5 shadow-[0_0_20px_rgba(251,146,60,0.1)]">
            {sortedProblems.length} total
          </span>
        </div>
      </header>

      <main className="relative z-10 px-6 lg:px-10 py-6 max-w-7xl mx-auto">

        {/* CHART */}
        {chartData.length > 0 && (
          <section className="rounded-3xl p-6 mb-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <h2 className="text-xs text-slate-400 uppercase tracking-wider mb-6">
              Problems solved by topic
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="topic" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false}/>
                <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                <Bar dataKey="count" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        )}

        {/* TABLE */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">

          <div className="px-6 py-4 border-b border-white/10 flex justify-between">
            <h2 className="text-xs text-slate-400 uppercase tracking-wider">
              Problem history
            </h2>
            <span className="text-xs text-slate-500">Latest first</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-white/10">
                  {["#", "Problem", "Difficulty", "Topic", "Date", "Action"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sortedProblems.map((problem, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/[0.05] transition-all duration-200"
                  >
                    <td className="px-5 py-4 text-slate-500 text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-5 py-4 text-slate-100 font-medium">
                      {problem.name}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${difficultyStyle(problem.level)}`}>
                        {problem.level}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400 capitalize">
                      {problem.topic || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {new Date(problem.date).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium
                                   text-rose-300 border border-rose-400/20
                                   bg-rose-500/10 hover:bg-rose-500/20
                                   transition-all duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-white/10 flex gap-4 flex-wrap">
            <span className="text-xs text-slate-500">Stats:</span>
            {[
              { label: "Easy", color: "text-emerald-300", count: problems.filter(p => p.level === "Easy").length },
              { label: "Medium", color: "text-amber-300", count: problems.filter(p => p.level === "Medium").length },
              { label: "Hard", color: "text-rose-300", count: problems.filter(p => p.level === "Hard").length },
            ].map(({ label, color, count }) => (
              <span key={label} className="text-xs text-slate-400">
                {label}: <span className={`${color} font-semibold`}>{count}</span>
              </span>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}

export default Problemspage;