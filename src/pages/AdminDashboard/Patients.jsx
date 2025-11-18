import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/Config";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const Patients = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users")); 
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      console.log("Fetched Users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      await deleteDoc(doc(db, "users", id));
      Swal.fire("Deleted", "User removed successfully!", "success");
      fetchUsers(); 
    }
  };

  // Approve user
  const handleApprove = async (user) => {
    await updateDoc(doc(db, "users", user.id), { approved: true });
    Swal.fire("Approved", `${user.fullName || user.name} is now approved!`, "success");
    fetchUsers(); 
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">All Registered Users</h3>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-teal-500/30 overflow-hidden">
        <div className="overflow-x-auto h-100">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-teal-500/20 to-blue-600/20">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-white/10 hover:bg-white/5 transition-all">
                    <td className="px-6 py-5 font-medium">{u.fullName || u.name}</td>
                    <td className="px-6 py-5">{u.email}</td>
                    <td className="px-6 py-5">{u.phone}</td>
                    <td className="px-6 py-5">
                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.approved ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>
                      {u.approved ? "Approved" : "Pending"}
                    </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => { setSelectedUser(u); setShowViewModal(true); }}
                        className="text-teal-400 hover:text-teal-300 mx-2"
                      >
                        View
                      </button>
                      {!u.approved && (
                        <button
                          onClick={() => handleApprove(u)}
                          className="text-green-400 hover:text-green-300 mx-2"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(u.id)}
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
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MODAL */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 max-w-lg text-black">
            <h3 className="text-xl font-bold mb-4">{selectedUser.fullName || selectedUser.name}</h3>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            {/* <p><strong>Status:</strong> {selectedUser.approved ? "Approved" : "Pending"}</p> */}
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
