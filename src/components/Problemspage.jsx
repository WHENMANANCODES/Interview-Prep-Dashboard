import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Problemspage() {
  const [problems, setProblems] = useState([]);

  // Load problems from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("problems")) || [];
    setProblems(saved);
  }, []);

  // Sort problems by latest date first
  const sortedProblems = [...problems].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Count problems topic-wise
  const topicCount = {};

  sortedProblems.forEach((problem) => {
    if (problem.topic) {
      if (topicCount[problem.topic]) {
        topicCount[problem.topic]++;
      } else {
        topicCount[problem.topic] = 1;
      }
    }
  });

  // Convert object to array for chart
  const chartData = Object.keys(topicCount).map((key) => ({
    topic: key,
    count: topicCount[key],
  }));

  // Delete function
  const handleDelete = (indexToDelete) => {
    const updated = sortedProblems.filter(
      (_, index) => index !== indexToDelete
    );
    setProblems(updated);
    localStorage.setItem("problems", JSON.stringify(updated));
  };

  if (sortedProblems.length === 0) {
    return <div className="p-6">No problems solved yet.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Total Problems: {sortedProblems.length}
      </h1>

      {/* 📊 Topic-wise Chart */}
      {chartData.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Problems Solved Topic-wise
          </h2>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="black" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 📋 Problems Table */}
      <table className="w-full border border-gray-300">
        
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Difficulty</th>
            <th className="border p-2">Topic</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedProblems.map((problem, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{problem.name}</td>
              <td className="border p-2">{problem.level}</td>
              <td className="border p-2">{problem.topic}</td>
              <td className="border p-2">{problem.date}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Problemspage;