import AddProblemForm from "./AddProblemForm";
import StatsCard from "./Statscard";
import Navbar from "./Navbar";
import  {useNavigate} from "react-router-dom"
function Dashboard({ problems , setProblems}) {

  const navigate = useNavigate()
  // hardproblem logic
  const hardproblems = problems.filter((problem) => {
    return problem.level === "Hard";
  });

  // weekly problems logic
  const today = new Date();
  const oneWeekAgo = new Date();

  today.setHours(0, 0, 0, 0);
  oneWeekAgo.setHours(0, 0, 0, 0);
  oneWeekAgo.setDate(today.getDate() - 6);

  const weeklyproblems = problems.filter((problem) => {
    const problemdate = new Date(problem.date);
    
    problemdate.setHours(0, 0, 0, 0);
    return problemdate >= oneWeekAgo && problemdate <= today;
  });

// Streak logic
   const solveddates = problems.map((problem)=>{
         const d = new Date(problem.date);
         d.setHours(0,0,0,0);
         return d.getTime();  
   });

//Set = Duplicate remover
// ... = Convert iterable into array
// The includes() method returns true if a string contains a specified string.
   const set = new Set(solveddates); 
   const uniquedates = [...set];

  let streak = 0;
  let currentdate = new Date();
  currentdate.setHours(0,0,0,0);

  while(uniquedates.includes(currentdate.getTime())){
      streak++;
      currentdate.setDate(currentdate.getDate()-1);
  }

  return (
   <> 
   
    <Navbar />

    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard onClick={()=>{navigate("/problems")}} title="Total Problems" value={problems.length} />
      <StatsCard onClick={()=>{navigate("/weekly")}}  title="Problems solved in last 7 days" value={weeklyproblems.length} />
      <StatsCard onClick={()=>{navigate("streak")}}  title="Current Streak" value={`${streak} days`} />
      <StatsCard onClick={()=>{navigate("hard")}}    title="Hard Problems" value={hardproblems.length} />
    </div>

    <AddProblemForm problems={problems} setProblems={setProblems}></AddProblemForm>
    </>
  );
}

export default Dashboard;