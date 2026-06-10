import { useEffect, useState, useCallback } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SheetBrowser from "./components/SheetBrowser";
import Problemspage from "./components/Problemspage";
import Streak from "./components/Streak";
import Weekly from "./components/Weekly";
import Hard from "./components/Hard";
import Login from "./components/Login"; //       1. Login Component Import kiya
import Register from "./components/Register"; // 2. Register Component Import kiya
import { getProblems } from "./services/api";

function App() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProblems = useCallback(async () => {
    try {
      const data = await getProblems();
      setProblems(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // 🎯 2. Router Configurations ko Update kiya
  const router = createBrowserRouter([
  {
    path : "/register",
    element : <Register /> // Register route add kar diya

  },
    { 
      path: "/", 
      element: <Login /> // Default route par ab sabse pehle Login screen dikhegi!
    },
    { 
      path: "/login", 
      element: <Login /> // Agar koi manually /login par jaye tab bhi
    },
    { 
      path: "/dashboard", 
      element: <Dashboard problems={problems} onRefresh={fetchProblems} /> // Dashboard ka path badal kar /dashboard kar diya
    },
    { path: "/sheets", element: <SheetBrowser onRefresh={fetchProblems} /> },
    { path: "/problems", element: <Problemspage /> },
    { path: "/streak", element: <Streak /> },
    { path: "/weekly", element: <Weekly /> },
    { path: "/hard", element: <Hard /> },
  ]);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return <RouterProvider router={router} />;
}

export default App;