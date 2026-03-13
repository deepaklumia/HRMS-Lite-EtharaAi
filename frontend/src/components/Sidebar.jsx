import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Calendar,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "from-blue-500 to-cyan-500", path: "/" },
    { id: "employees", label: "Employees", icon: Users, color: "from-purple-500 to-pink-500", path: "/employees" },
    { id: "attendance", label: "Attendance", icon: CalendarCheck, color: "from-orange-500 to-red-500", path: "/attendance" },
    // { id: "leaves", label: "Leaves", icon: Calendar, color: "from-green-500 to-emerald-500", path: "/leaves" },
  ];

  return (
    <aside
      className={`
        w-64 
        bg-gradient-to-b from-purple-600 via-pink-600 to-orange-500
        border-r border-white/10
        flex flex-col 
        shadow-2xl
        transition-all duration-300
      `}
    >
      {/* Logo / Brand */}
      <div className="p-5 border-b border-white/20">
        <div className="flex items-center gap-3.5">
          {/* <div className="relative animate-float">
            <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-white/30">
              H
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
          </div> */}

          <div>
            <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-lg">
              HR<span className="text-yellow-300">MS</span>
            </h2>
            <p className="text-xs text-white/80 font-medium mt-0.5">
              Employee Portal
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `group relative w-full flex items-center gap-3.5 
                px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-gray-900 font-semibold shadow-xl scale-105"
                    : "text-white/90 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`
                      p-2 rounded-lg bg-gradient-to-br ${item.color}
                      transition-transform duration-200
                      ${isActive ? "scale-110 shadow-lg" : "group-hover:scale-110"}
                    `}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="text-white" />
                  </div>

                  <span className="flex-1 text-left">{item.label}</span>

                  {isActive && (
                    <ChevronRight
                      size={16}
                      className="text-gray-700 opacity-70"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto border-t border-white/20">
        <div className="p-3">
          <button
            className="
              w-full flex items-center gap-3.5 px-4 py-3 rounded-xl 
              text-sm font-medium text-white/90
              hover:bg-white/20 hover:text-white backdrop-blur-sm
              transition-all duration-200
            "
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800">
              <Settings size={18} strokeWidth={1.9} className="text-white" />
            </div>
            <span>Settings</span>
          </button>
        </div>

        {/* Footer / version info */}
        {/* <div className="px-6 py-4 text-xs text-white/60 border-t border-white/10 bg-black/20 text-center">
          v1.2.4 • Built with React + Tailwind
        </div> */}
      </div>
    </aside>
  );
}