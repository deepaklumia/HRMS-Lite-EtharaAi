import { useState } from "react";
import { Bell, LogOut, Sparkles } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 backdrop-blur-xl border-b border-white/20 flex items-center px-8 justify-between shadow-lg sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30 animate-pulse-glow">
              <Sparkles size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              {activeTab === "employees"
                ? "Employee Management"
                : "Attendance Management"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 relative group backdrop-blur-sm"
              title="Notifications"
            >
              <Bell size={20} className="text-white group-hover:scale-110 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></span>
            </button>
            <div className="h-8 w-px bg-white/30"></div>
            <span className="text-sm text-white font-medium px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
              Admin • Bengaluru
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/50">
              AD
            </div>
            <button
              className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 group backdrop-blur-sm"
              title="Logout"
            >
              <LogOut size={18} className="text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 md:p-10">
          <div className="max-w-7xl mx-auto animate-slide-in">
            {activeTab === "employees" && <Employees />}
            {activeTab === "attendance" && <Attendance />}
          </div>
        </main>
      </div>
    </div>
  );
}
