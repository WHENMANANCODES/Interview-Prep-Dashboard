import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
function Weekly() {
  const problems = JSON.parse(localStorage.getItem("problems")) || [];
  const today = new Date();
  const oneWeekAgo = new Date();

  today.setHours(0,0,0,0);
  oneWeekAgo.setHours(0,0,0,0);
  oneWeekAgo.setDate(today.getDate() - 6);

  const weeklyProblems = problems.filter((problem) => {
    const problemDate = new Date(problem.date);
    problemDate.setHours(0,0,0,0);

    return problemDate >= oneWeekAgo && problemDate <= today;
  });

// Preparing Chart Data
 const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const problemsPerDay = Array(7).fill(0);

weeklyProblems.forEach((problem) => {

  const [day, month, year] = problem.date.split("-");
  const problemDate = new Date(year, month - 1, day);

  const dayIndex = problemDate.getDay();

  problemsPerDay[dayIndex]++;

});

const chartData = days.map((day, index) => ({
  day : day,
  problems: problemsPerDay[index]
}));

return(
  //Weekly Dashboard
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    <h1 className="text-2xl font-bold mb-4 col-span-full text-center">
      Weekly Performance
      <p className="text-gray-500">Your coding progress in the last 7 days</p>
    </h1>
    
  <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-blue-500 border-2">
    <div>
      <p className="text-gray-500 text-sm">Total Problems</p>
      <p className="text-3xl font-bold">{weeklyProblems.length}</p>
    </div>
    <div className="text-3xl">📘</div>
  </div>

  <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-red-500 border-2">
    <div>
      <p className="text-gray-500 text-sm">Hard Problems</p>
      <p className="text-3xl font-bold">
        {weeklyProblems.filter(p => p.level === "Hard").length}
      </p>
    </div>
    <div className="text-3xl">🔥</div>
  </div>

  <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-green-500 border-2">
    <div>
      <p className="text-gray-500 text-sm">Average / Day</p>
      <p className="text-3xl font-bold">
        {(weeklyProblems.length / 7).toFixed(1)}
      </p>
    </div>
    <div className="text-3xl">📈</div>
  </div>

{/* Problems Solved per day chart */}
<div className=" mt-10 bg-white p-6 rounded-xl shadow-lg width-full md:col-span-2 border-gray-300 border-2 ">

  <h2 className="text-xl font-semibold mb-4">
    Problems Solved Per Day
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>

      <XAxis dataKey="day" />
      <YAxis allowDecimals={false} />
      <Tooltip />

      <Bar dataKey="problems" radius={[5,5,0,0]} />

    </BarChart>
  </ResponsiveContainer>

</div>


</div>



)
  


}

export default Weekly