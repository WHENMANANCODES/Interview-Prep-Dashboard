import React from "react";
import { PieChart,Pie,Cell,BarChart,Legend, CartesianGrid, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
function Weekly() {

  const problems = JSON.parse(localStorage.getItem("problems")) || [];

  const today = new Date();
  const oneWeekAgo = new Date();

  today.setHours(0,0,0,0);
  oneWeekAgo.setHours(0,0,0,0);
  oneWeekAgo.setDate(today.getDate() - 6);

  // Filter problems from last 7 days
  const weeklyProblems = problems.filter((problem) => {

    const problemDate = new Date(problem.date);
    problemDate.setHours(0,0,0,0);

    return problemDate >= oneWeekAgo && problemDate <= today;

  });

  // difficulty count
let easy = 0;
let medium = 0;
let hard = 0;

weeklyProblems.forEach((p) => {

  if (p.level === "Easy") easy++;
  else if (p.level === "Medium") medium++;
  else if (p.level === "Hard") hard++;

});

// difficulty data
const difficultyData = [
  { name: "Easy", value: easy },
  { name: "Medium", value: medium },
  { name: "Hard", value: hard }
];

  // Generate last 7 days
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {

    const d = new Date(today);
    d.setDate(today.getDate() - i);
    last7Days.push(d);

  }


  // Prepare counting array
  const problemsPerDay = Array(7).fill(0);


  // Count problems per day
  weeklyProblems.forEach((problem) => {

    const problemDate = new Date(problem.date);
    problemDate.setHours(0,0,0,0);

    last7Days.forEach((d, idx) => {

      if (problemDate.toDateString() === d.toDateString()) {
        problemsPerDay[idx]++;
      }

    });

  });


  // Prepare chart data
  const chartData = last7Days.map((d, idx) => ({
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    problems: problemsPerDay[idx]
  }));



  return (

    <div className="p-6">

      {/* Header */}
      <div className="text-center mb-6">

        <h1 className="text-2xl font-bold">
          Weekly Performance
        </h1>

        <p className="text-gray-500">
          Your coding progress in the last 7 days
        </p>

      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Problems */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-blue-500 border-2">
          <div>
            <p className="text-gray-500 text-sm">Total Problems</p>
            <p className="text-3xl font-bold">{weeklyProblems.length}</p>
          </div>
          <div className="text-3xl">📘</div>
        </div>


        {/* Hard Problems */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-red-500 border-2">
          <div>
            <p className="text-gray-500 text-sm">Hard Problems</p>
            <p className="text-3xl font-bold">
              {weeklyProblems.filter(p => p.level === "Hard").length}
            </p>
          </div>
          <div className="text-3xl">🔥</div>
        </div>


        {/* Problems per day */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-green-500 border-2">
          <div>
            <p className="text-gray-500 text-sm">Problems / Day</p>
            <p className="text-3xl font-bold">
              {(weeklyProblems.length / 7).toFixed(1)}
            </p>
          </div>
          <div className="text-3xl">📈</div>
        </div>

      </div>


      {/* Chart Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-200">

        <h2 className="text-xl font-semibold mb-4 text-center">
          Problems Solved Per Day
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="problems"
              fill="#"
              radius={[5,5,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Difficulty Distribution Chart*/}
            <div className="mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-200">

        <h2 className="text-xl font-semibold mb-4 text-center">
          Difficulty Distribution
        </h2>

<ResponsiveContainer width="100%" height={300}>
      <PieChart>
  <Pie
    data={difficultyData}
    dataKey="value"
    cx="50%"
    cy="50%"
    outerRadius={80}
    label
  >
    {difficultyData.map((entry,index) => (
      //cell is used to define the color of each slice of the pie chart
      <Cell
        key={index}
        fill={["green", "blue", "red"][index]}
      />
    ))}
  </Pie>

  <Tooltip />
  <Legend />

</PieChart>
</ResponsiveContainer>

    </div>
  </div>
  );
}

export default Weekly;