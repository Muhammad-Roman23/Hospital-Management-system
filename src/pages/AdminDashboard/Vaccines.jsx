// pages/ManageVaccines.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../Firebase/Config";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export const AvailableVaccines = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [newVaccine, setNewVaccine] = useState("");
     
  const fetchHospitals = async () => {
    try {
      const snapshot = await getDocs(collection(db, "hospitals"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHospitals(data.sort((a, b) => a.hospitalName.localeCompare(b.hospitalName)));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Add Vaccine
  const handleAddVaccine = async () => {
    if (!newVaccine.trim()) {
      Swal.fire("Error", "Vaccine name is required", "error");
      return;
    }

    try {
      await updateDoc(doc(db, "hospitals", selectedHospital.id), {
        vaccines: arrayUnion(newVaccine.trim())
      });

      Swal.fire("Success!", `${newVaccine} added to ${selectedHospital.hospitalName}`, "success");
      setNewVaccine("");
      setShowAddModal(false);
      fetchHospitals();
    } catch (err) {
      Swal.fire("Error", "Failed to add vaccine", "error");
    }
  };

  // Delete Vaccine
  const handleDeleteVaccine = async (hospitalId, vaccineName) => {
    const result = await Swal.fire({
      title: "Delete Vaccine?",
      text: `"${vaccineName}" will be removed from this hospital`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      await updateDoc(doc(db, "hospitals", hospitalId), {
        vaccines: arrayRemove(vaccineName)
      });
      Swal.fire("Deleted!", `${vaccineName} removed`, "success");
      fetchHospitals();
    }
  };

  const openAddModal = (hospital) => {
    setSelectedHospital(hospital);
    setNewVaccine("");
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold text-white">Manage Vaccines Stock</h3>
          <p className="text-cyan-300 mt-1">Add, edit or remove available vaccines per hospital</p>
        </div>
        <div className="text-right">
          <p className="text-cyan-200 text-sm">Total Hospitals</p>
          <p className="text-4xl font-bold text-white">{hospitals.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-teal-500/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-teal-600/30 to-cyan-600/30">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-semibold text-cyan-200">Hospital Name</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-cyan-200">Available Vaccines</th>
                <th className="px-6 py-5 text-center text-sm font-semibold text-cyan-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital.id} className="border-t border-white/10 hover:bg-white/5 transition-all">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                        <span className="text-teal-400 font-bold text-lg">
                          {hospital.hospitalName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-semibold text-white text-lg">{hospital.hospitalName}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {hospital.vaccines && hospital.vaccines.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {hospital.vaccines.map((vaccine, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/40 flex items-center gap-2"
                          >
                            {vaccine}
                            <button
                              onClick={() => handleDeleteVaccine(hospital.id, vaccine)}
                              className="ml-2 hover:text-red-400 transition cursor-pointer"
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">No vaccines added yet</span>
                    )}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => openAddModal(hospital)}
                      className="bg-gradient-to-r from-teal-500 cursor-pointer to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg mx-auto"
                    >
                      <FaPlus className="w-4 h-4" />
                      Add Vaccine
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
        </div>
      )}

      {/* Add Vaccine Modal */}
      {showAddModal && selectedHospital && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Add Vaccine to
            </h3>
            <p className="text-teal-600 font-semibold text-lg mb-6">
              {selectedHospital.hospitalName}
            </p>

            <input
              type="text"
              value={newVaccine}
              onChange={(e) => setNewVaccine(e.target.value)}
              placeholder="e.g., Pfizer COVID-19, Sinopharm, Covaxin..."
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none text-gray-800 text-lg"
              onKeyPress={(e) => e.key === "Enter" && handleAddVaccine()}
            />

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-xl font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVaccine}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl font-medium transition shadow-lg"
              >
                Add Vaccine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

