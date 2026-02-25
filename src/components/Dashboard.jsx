import StatsCard from "./Statscard"
import problemsData from "../data/mockdata"

const hardproblems = problemsData.filter((problem)=>{
      return problem.difficulty === "hard";
})

function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Total Problems" value = {problemsData.length}/>
      <StatsCard title="This Week" value="15" />
      <StatsCard title="Current Streak" value="7 days" />
      <StatsCard title="Hard Problems" value={hardproblems.length} />
    </div>
  )
}

export default Dashboard
