    import React, { useEffect, useState } from "react";
    import { db } from "../../Firebase/Config";
    import { collection, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
    import Swal from "sweetalert2";

    export const Patients = ({ currentUserId }) => {
        console.log(currentUserId);
        
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // Fetch Patients for current user only
    const fetchPatients = async () => {
        const patientsRef = collection(db, "patients");
        // Filter: only patients belonging to current user
        const q = query(patientsRef, where("userId", "==", currentUserId));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPatients(data);
    };

    useEffect(() => {
        if (currentUserId) fetchPatients();
    }, [currentUserId]);

    // Delete Patient
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({       
        title: "Delete?",
        text: "This patient will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete!",
        });

        if (confirm.isConfirmed) {
        await deleteDoc(doc(db, "patients", id));
        Swal.fire("Deleted", "Patient removed successfully!", "success");
        fetchPatients();
        }
    };

    // Block / Unblock Patient
    const handleBlockToggle = async (patient) => {
        await updateDoc(doc(db, "patients", patient.id), { blocked: !patient.blocked });
        Swal.fire(
        "Updated",
        `Patient ${patient.blocked ? "unblocked" : "blocked"} successfully!`,
        "success"
        );
        fetchPatients();
    };

    return (
        <div className="space-y-6">
        <h3 className="text-3xl font-bold text-teal-400 mb-4">Manage Patients</h3>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-teal-500/30 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-500/20 to-blue-600/20">
                <tr>
                    <th className="px-6 py-4 text-left">Patient Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                </tr>
                </thead>

                <tbody>
                {patients.length > 0 ? (
                    patients.map((p) => (
                    <tr key={p.id} className="border-t border-white/10 hover:bg-white/5 transition-all">
                        <td className="px-6 py-5 font-medium">{p.name}</td>
                        <td className="px-6 py-5">{p.email}</td>
                        <td className="px-6 py-5">{p.phone}</td>
                        <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            p.blocked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                        }`}>
                            {p.blocked ? "Blocked" : "Active"}
                        </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                        <button
                            onClick={() => { setSelectedPatient(p); setShowViewModal(true); }}
                            className="text-teal-400 hover:text-teal-300 mx-2"
                        >
                            View
                        </button>
                        <button
                            onClick={() => handleBlockToggle(p)}
                            className={`mx-2 ${p.blocked ? "text-green-400" : "text-red-400"} hover:opacity-80`}
                        >
                            {p.blocked ? "Unblock" : "Block"}
                        </button>
                        <button
                            onClick={() => handleDelete(p.id)}
                            className="text-red-400 hover:text-red-300 mx-2"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400">
                        No patients found.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>

        {/* VIEW MODAL */}
        {showViewModal && selectedPatient && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-11/12 max-w-lg text-black">
                <h3 className="text-xl font-bold mb-4">{selectedPatient.name}</h3>
                <p><strong>Email:</strong> {selectedPatient.email}</p>
                <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                <p><strong>Status:</strong> {selectedPatient.blocked ? "Blocked" : "Active"}</p>
                <button
                onClick={() => setShowViewModal(false)}
                className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-xl"
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>
    );
    };
