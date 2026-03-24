import { Link, useLocation } from "react-router-dom";

function Navbar() {
  // useLocation gives us the current URL path
  // We use it to highlight the active nav link
  const location = useLocation();

  const links = [
    { path: "/",        label: "Dashboard" },
    { path: "/sheets",  label: "Sheets"    },
    { path: "/problems", label: "Problems" },
    { path: "/weekly",  label: "Weekly"    },
    { path: "/streak",  label: "Streak"    },
    { path: "/hard",    label: "Hard"      },
  ];

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 lg:px-10 py-4
                    flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-sm bg-orange-500" />
        <h1 className="text-sm font-semibold text-white tracking-wide">
          DSA Tracker
        </h1>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        {links.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium
                transition-all duration-150
                ${isActive
                  ? "bg-orange-500/20 text-orange-400"
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                }
              `}
            >
              {label}
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default Navbar;