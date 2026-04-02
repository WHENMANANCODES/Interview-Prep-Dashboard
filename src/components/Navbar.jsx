import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/",         label: "Dashboard" },
    { path: "/sheets",   label: "Sheets"    },
    { path: "/problems", label: "Problems"  },
    { path: "/weekly",   label: "Weekly"    },
    { path: "/streak",   label: "Streak"    },
    // { path: "/AI",       label: "AI Coach"   },
  ];

  return (
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
      {/* Logo */}
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
    </nav>
  );
}

export default Navbar;