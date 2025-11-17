import { FaBuilding, FaUsers, FaHospital } from "react-icons/fa";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Config";

export const Overview = () => {
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Total Hospitals
        const hospitalsSnapshot = await getDocs(collection(db, "hospitals"));
        setTotalHospitals(hospitalsSnapshot.size);

        // Total Patients
        const usersSnapshot = await getDocs(collection(db, "users"));
        setTotalPatients(usersSnapshot.size);

        // Pending Approvals
        const pendingQuery = query(
          collection(db, "hospitals"),
          where("approved", "==", false)
        );
        const pendingSnapshot = await getDocs(pendingQuery);
        setPendingApprovals(pendingSnapshot.size);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { label: "Total Hospitals", value: totalHospitals, icon: FaBuilding },
    { label: "Total Patients", value: totalPatients, icon: FaUsers },
    { label: "Pending Approvals", value: pendingApprovals, icon: FaHospital },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-8 hover:scale-105 transition-all"
        >
          <div className="p-4 w-fit rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 mb-6">
            <stat.icon className="w-10 h-10" />
          </div>
          <p className="text-teal-300 text-sm">{stat.label}</p>
          <p className="text-5xl font-bold mt-3">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
     