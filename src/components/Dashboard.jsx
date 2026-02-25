import StatsCard from "./Statscard"
import problemsData from "../data/mockdata"

const hardproblems = problemsData.filter((problem)=>{
      return problem.difficulty === "hard";
})

//stores todays from system
const today = new Date();

// storing oneweekago date
const oneWeekAgo = new Date();

today.setHours(0, 0, 0, 0);
oneWeekAgo.setHours(0, 0, 0, 0);

oneWeekAgo.setDate(today.getDate()-6);
//Note today.getDate() Gets the day number of the month. like today is 25 feb it will get 25

const weeklyproblems = problemsData.filter((problem)=>{
                  const problemdate = new Date(problem.date);
                  problemdate.setHours(0, 0, 0, 0);
                  if(problemdate>=oneWeekAgo && problemdate<= today){
                    return true;
                  }
})


function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Total Problems" value = {problemsData.length}/>
      <StatsCard title="Problems solved in last 7 days" value={weeklyproblems.length} />
      <StatsCard title="Current Streak" value="7 days" />
      <StatsCard title="Hard Problems" value={hardproblems.length} />
    </div>
  )
}

export default Dashboard
