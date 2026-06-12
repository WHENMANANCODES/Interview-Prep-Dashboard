// App.jsx - Pura Updated Code

import { useEffect, useState, useCallback } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SheetBrowser from "./components/SheetBrowser";
import Problemspage from "./components/Problemspage";
import Streak from "./components/Streak";
import Weekly from "./components/Weekly";
import Hard from "./components/Hard";
import Login from "./components/Login";
import Register from "./components/Register";
import { getProblems } from "./services/api";
import ProtectedRoute from "./components/Protectedroute";

// MAIN APP COMPONENT

function App() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProblems = useCallback(async () => {
    // NEW: Agar token hi nahi hai toh API call karna bekar hai
    // Seedha loading band karo aur return karo
    // (Warna unauthorized 401 error aayega console mein)
    if (!localStorage.getItem('token')) {
      setLoading(false);
      return;
    }

    try {
      const data = await getProblems();
      setProblems(data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // ============================================================
  // ROUTER - Do tarah ke routes hain:
  //
  // 1. PUBLIC routes  → Koi bhi dekh sakta hai (Login, Register)
  // 2. PRIVATE routes → Sirf logged-in user dekh sakta hai
  //                     (ProtectedRoute ke andar wrap kiye hain)
  //
  // Agar koi URL bar mein /dashboard type kare bina login ke →
  // ProtectedRoute usse /login pe redirect kar dega! ✅
  // ============================================================

  const router = createBrowserRouter([

    // ─── PUBLIC ROUTES ───────────────────────────────────────
    { path: "/",         element: <Login /> },
    { path: "/login",    element: <Login /> },
    { path: "/register", element: <Register /> },

    // ─── PRIVATE ROUTES ──────────────────────────────────────
    // Har page ko ProtectedRoute mein wrap kiya hai
    // Matlab: Security guard har private page ke bahar khada hai
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard problems={problems} onRefresh={fetchProblems} />
        </ProtectedRoute>
      )
    },
// App.jsx
{ path: "/sheets", element: <ProtectedRoute><SheetBrowser problems={problems} 
   onRefresh={fetchProblems} /></ProtectedRoute>
  },
    {
      path: "/problems",
      element: (
        <ProtectedRoute>
          <Problemspage />
        </ProtectedRoute>
      )
    },
    {
      path: "/streak",
      element: (
        <ProtectedRoute>
          <Streak />
        </ProtectedRoute>
      )
    },
    {
      path: "/weekly",
      element: (
        <ProtectedRoute>
          <Weekly />
        </ProtectedRoute>
      )
    },
    {
      path: "/hard",
      element: (
        <ProtectedRoute>
          <Hard />
        </ProtectedRoute>
      )
    },
  ]);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return <RouterProvider router={router} />;
}

export default App;