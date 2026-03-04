import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
function App(){


// ye reload karne par jo local storage mai problems padi hai unhe problems mai dal raha
const [problems,setProblems] = useState(()=>{
  const savedproblems = localStorage.getItem("problems");
  if(savedproblems){
    return JSON.parse(savedproblems);
  }
  else{
    return [];
  }
})

// ye problems ko local storage mai dal raha
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
