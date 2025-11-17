// layout/SidebarLayout.jsx
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaHospital, FaUsers, FaBuilding, FaCog,
  FaBars, FaTimes, FaSignOutAlt, FaUserShield
} from "react-icons/fa";

const menuItems = [
  { title: "Dashboard", icon: FaBuilding, path: "/admindashboard" },
  { title: "Manage Hospitals", icon: FaHospital, path: "/adminhospitals", badge: "3 Pending" },
  { title: "Manage Patients", icon: FaUsers, path: "/Patients" },
  // { title: "System Settings", icon: FaCog, path: "/admin/settings" },
];

export const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className={`fixed lg:relative z-50 h-screen transition-all duration-300 bg-black/70 backdrop-blur-2xl border-r border-blue-500/20 ${sidebarOpen ? "w-72" : "w-20"}`}>
        <div className="flex items-center justify-between p-5 border-b border-blue-500/20">
          <div className="w-10"></div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 hover:bg-white/10 rounded-xl transition-all">
            {sidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        <nav className="p-5 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
    
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl font-medium transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-blue-600 shadow-xl shadow-teal-500/40"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <span className="px-3 py-1 text-xs rounded-full bg-orange-500">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-black/50 backdrop-blur-xl border-b border-blue-500/20">
          <div className="flex items-center justify-between px-8 py-5">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              {menuItems.find(m => m.path === location.pathname).title || "Dashboard"}
            </h2>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-lg">Ahmad Khan</p>
                <p className="text-sm text-teal-300 flex items-center gap-1">
                  <FaUserShield className="w-4 h-4" /> Super Admin
                </p>
              </div>
              <button className="p-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl hover:from-teal-600 hover:to-blue-700 transition-all shadow-lg">
                <FaSignOutAlt className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 p-8 ${sidebarOpen ? "ml-0" : ""}`}>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}