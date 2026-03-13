import { Outlet } from "react-router-dom";
import { Bell, LogOut, Calendar } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - dark like in screenshot */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - flatter, professional look */}
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-6 justify-between text-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Calendar size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              HRMS Lite
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="h-6 w-px bg-gray-600"></div>

            <span className="text-sm font-medium px-3 py-1.5 bg-gray-700 rounded-md border border-gray-600">
              Admin • Bengaluru
            </span>

            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow">
              AD
            </div>

            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Main content area - light background like screenshot */}
        <main className="flex-1 overflow-auto p-6 md:p-8 bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            {/* Outlet renders child pages like Attendance */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}