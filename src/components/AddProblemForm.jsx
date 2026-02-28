  import { useState } from "react"

function AddProblemForm({problems,setProblems}){

    const [name ,setName] = useState("");
    const [level ,setLevel] = useState("Easy");
    const [date,setDate]   = useState("");
    const [note,setNote]   = useState("");

    const handlesubmit = (e)=>{
           e.preventDefault();
           if(!name || !level || !date || !note){
            alert("Fill the required Information");
            return;
           }

    const newProblem = {
      id : Date.now(),
      name : name,
      level : level,
      date : date,
      note : note
    }

  setProblems([...problems,newProblem])

//after sendiing the problems reset the problem form
  setName("");
  setLevel("");
  setDate("");
  setNote("");

  }
    return(
 <> 

  <h2 className=" flex justify-center items-center text-center bg-amber-200 pt-2.5 font-semibold text-gray-800 mt-5 mb-4 border-1 rounded-full pb-2">
    Add The Problem below 
  </h2>
<div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto border-2">

  <form onSubmit={handlesubmit} className="space-y-4 ">

    {/* Problem Name */}
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Problem Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter problem name"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    {/* Problem Level */}
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Level
      </label>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
    </div>

    {/* Problem Date */}
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Problem Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    {/* Note */}
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Note
      </label>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Short note..."
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
    >
      Add Problem
    </button>

  </form>
</div>
  </>    
    )
}

export default AddProblemForm 