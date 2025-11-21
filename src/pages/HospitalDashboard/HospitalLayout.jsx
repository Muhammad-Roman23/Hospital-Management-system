// layout/SidebarLayout.jsx
import { useState,useEffect } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHospital, FaUsers, FaBuilding, FaCog,
  FaBars, FaTimes, FaSignOutAlt, FaUserShield
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiInjection } from "react-icons/bi";

import { doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { FiUser } from "react-icons/fi";



import { db } from "../../Firebase/Config"; // correct path
// import { collection, getDocs, query, where } from "firebase/firestore";





const menuItems = [
  { title: "Dashboard", icon: MdDashboard, path: "/hospitaldashboard" },
  { title: "Profile", icon: FiUser, path: "/hospitalprofile" },
  // { title: "Manage Hospitals", icon: FaHospital, path: "/adminhospitals"},
  // { title: "Manage Patients", icon: FaUsers, path: "/Patients" },
  // { title: "Manage Vaccines", icon: BiInjection, path: "/Vaccines" },
  // { title: "System Settings", icon: FaCog, path: "/admin/settings" },
];

export const HospitalLayout = () => {

  const navigate = useNavigate()

  const [admin, setAdmin] = useState(null);



useEffect(() => {
  const fetchAdmin = async () => {
    try {
      const currentUserId = localStorage.getItem("userid");
      console.log("Current Admin ID:", currentUserId);
      if (!currentUserId) return;

      const docRef = doc(db, "admins", currentUserId); // direct document reference
      console.log(docRef);
      
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      

      if (docSnap.exists()) {
        const adminData = docSnap.data();
        console.log(adminData);
        
        setAdmin(adminData);
        console.log("Admin fetched:", adminData);
      } else {
        console.log("No such admin document!");
      }
    } catch (error) {
      console.error("Error fetching admin:", error);
    }
  };

  fetchAdmin();
}, []);


const handleLogout = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {

      // LOCAL STORAGE CLEAR
      localStorage.removeItem("userid");
      // Redirect to login page
      // window.location.href = "/login";
      // <Link to  = {"/"} ></Link>
      // <Navigate to = {"/login"} />
      navigate("/")
    })
    .catch((error) => {
      console.log("Logout Error:", error);
    });
};



  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className={`fixed lg:relative z-50 transition-all duration-300 bg-black/70 backdrop-blur-2xl border-r border-blue-500/20 ${sidebarOpen ? "w-72" : "w-20"}`}>
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
              {menuItems.find(m => m.path === location.pathname).title  }
            </h2>

            <div className="flex items-center gap-4">
             <div className="text-right">
  <p className="font-semibold text-lg">{admin ? admin.fullName : "Loading..."}</p>
  <p className="text-sm text-teal-300 flex items-center gap-1">
    <FaUserShield className="w-4 h-4" /> {admin?.role || "Super Admin"}
  </p>
</div>

              <button onClick={handleLogout} className="p-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl hover:from-teal-600 hover:to-blue-700 transition-all shadow-lg">
                <FaSignOutAlt className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 pt-8 ps-8 pe-8 ${sidebarOpen ? "ml-0" : ""}`}>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}