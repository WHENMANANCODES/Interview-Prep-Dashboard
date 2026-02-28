import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import AddProblemForm from "./components/AddProblemForm";
function App(){
 
const [problems,setProblems] = useState(()=>{
  const savedproblems = localStorage.getItem("problems");
  if(savedproblems){
    return JSON.parse(savedproblems);
  }
  else{
    return [];
  }
})

useEffect(()=>{
   localStorage.setItem("problems",JSON.stringify(problems));
},[problems])


return(
  <>
    <Dashboard problems = {problems} setProblems={setProblems} />
  </>
)
}
export default App;
