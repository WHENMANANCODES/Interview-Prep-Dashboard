import React, { useState } from "react"; // 🎯 useState add kiya prompt ke liye
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false); // 🎯 Confirmation state toggler

  // Asli logout executing function
  const executeLogout = () => {
    authService.logout();
    console.log("✓ Session destroyed. Redirecting...");
    navigate("/login");
  };

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/sheets",    label: "Sheets"    },
    { path: "/problems",  label: "Problems"  },
    { path: "/weekly",    label: "Weekly"    },
    { path: "/streak",    label: "Streak"    },
  ];

  return (
    <>
      <nav
        className="
          sticky top-0 z-50
          border-b border-white/10
          bg-[#020617]/80 backdrop-blur-xl
          px-6 lg:px-8 h-16
          flex items-center justify-between
          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        "
      >
        {/* Left side: Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            className="
              w-9 h-9 rounded-xl
              bg-gradient-to-br from-indigo-500 to-cyan-400
              flex items-center justify-center
              shadow-lg shadow-indigo-500/20
              ring-1 ring-white/10
            "
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M2 10V5l4-3 4 3v5H8V7H4v3H2Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white tracking-tight">
              DSA Tracker
            </span>
            <span className="text-[11px] text-slate-400 tracking-wide">
              Track Smart Prepare Smarter
            </span>
          </div>
        </div>

        {/* Right side: Nav links & Logout Button */}
        <div className="flex items-center gap-4">
          
          {/* Nav links */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/10">
            {links.map(({ path, label }) => {
              const isActive = location.pathname === path;

              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500/20 to-cyan-400/10 text-white border border-indigo-400/20 shadow-md shadow-indigo-500/10"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* 🎯 Trigger Confirm State Instead of Direct Logout */}
          <button
            onClick={() => setShowConfirm(true)}
            className="
              px-4 py-1.5 rounded-xl text-sm font-semibold
              text-red-400 border border-red-500/20 bg-red-500/10
              transition-all duration-300
              hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]
              focus:outline-none focus:ring-2 focus:ring-red-500/40
            "
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ── 🎯 GLASSMORPHISM MODAL OVERLAY ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f172a]/90 p-6 text-center shadow-2xl">
            <h4 className="text-lg font-bold text-white">Confirm Logout</h4>
            <p className="mt-2 text-sm text-slate-400">
              Are you sure you want to logout from PrepTrack?
            </p>
            
            <div className="mt-5 flex items-center justify-center gap-3">
              {/* Cancel Button */}
              <button
                onClick={() => setShowConfirm(false)}
                className="w-24 py-2 text-sm font-semibold text-slate-300 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 transition"
              >
                
              </button>
              {/* Confirm Destruction Button */}
              <button
                onClick={executeLogout}
                className="w-24 py-2 text-sm font-semibold text-white rounded-xl bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;