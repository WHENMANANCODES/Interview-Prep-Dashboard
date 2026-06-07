import { useEffect, useState, useCallback } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SheetBrowser from "./components/SheetBrowser";
import Problemspage from "./components/Problemspage";
import Streak from "./components/Streak";
import Weekly from "./components/Weekly";
import Hard from "./components/Hard";
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

  const router = createBrowserRouter([
    { path: "/", element: <Dashboard problems={problems} onRefresh={fetchProblems} /> },
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