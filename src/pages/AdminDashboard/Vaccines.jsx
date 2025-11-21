// pages/Hospitals.jsx
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { db } from "../../Firebase/Config";
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Vaccines = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [editData, setEditData] = useState({
    hospitalName: "",
    email: "",
    phone: "",
    approved: false,
  });

  // Fetch Hospitals
  const fetchHospitals = async () => {
    const snapshot = await getDocs(collection(db, "hospitals"));
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setHospitals(data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "This hospital will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      await deleteDoc(doc(db, "hospitals", id));
      Swal.fire("Deleted", "Hospital removed successfully!", "success");
      fetchHospitals();
    }
  };

  // Approve
  const handleApprove = async (hospital) => {
    await updateDoc(doc(db, "hospitals", hospital.id), { approved: true });
    Swal.fire("Approved!", `${hospital.hospitalName} is now approved.`, "success");
    fetchHospitals();
  };

  // Edit
  const openEditModal = (hospital) => {
    setSelectedHospital(hospital);
    setEditData({
      hospitalName: hospital.hospitalName || "",
      email: hospital.email || "",
      phone: hospital.phone || "",
      approved: hospital.approved || false,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    await updateDoc(doc(db, "hospitals", selectedHospital.id), editData);
    Swal.fire("Updated!", "Hospital updated successfully!", "success");
    setShowEditModal(false);
    fetchHospitals();
  };

  // Validation Schema
  const AddHospitalSchema = Yup.object().shape({
    hospitalName: Yup.string().required("Hospital name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, "Phone must be 10-15 digits")
      .required("Phone is required"),
  });

  // Add Hospital
  const handleAddHospital = async (values, { resetForm }) => {
    await addDoc(collection(db, "hospitals"), {
      ...values,
      createdAt: serverTimestamp(),
    });

    Swal.fire("Added!", `${values.hospitalName} added successfully!`, "success");
    resetForm();
    setShowAddModal(false);
    fetchHospitals();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">All Registered Hospitals</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg"
        >
          <FaPlus /> Add New Hospital
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-teal-500/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-teal-500/20 to-blue-600/20">
              <tr>
                <th className="px-6 py-4 text-left">Hospital Name</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Registered</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h) => (
                <tr key={h.id} className="border-t border-white/10 hover:bg-white/5 transition-all">
                  <td className="px-6 py-5 font-medium">{h.hospitalName}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${h.approved ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>
                      {h.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-400">{h.createdAt?.toDate().toLocaleDateString() || "N/A"}</td>
                  <td className="px-6 py-5 text-center">
                    <button onClick={() => { setSelectedHospital(h); setShowViewModal(true); }} className="text-teal-400 hover:text-teal-300 mx-2">View</button>
                    <button onClick={() => openEditModal(h)} className="text-blue-400 hover:text-blue-300 mx-2">Edit</button>
                    <button onClick={() => handleDelete(h.id)} className="text-red-400 hover:text-red-300 mx-2">Delete</button>
                    {!h.approved && <button onClick={() => handleApprove(h)} className="text-green-400 hover:text-green-300 mx-2">Approve</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal with Formik */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 max-w-lg text-black">
            <h3 className="text-xl font-bold mb-4">Add Hospital</h3>
            <Formik
              initialValues={{ hospitalName: "", email: "", phone: "", approved: false }}
              validationSchema={AddHospitalSchema}
              onSubmit={handleAddHospital}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-3">
                  <div>
                    <Field name="hospitalName" placeholder="Hospital Name" className="w-full border px-3 py-2 rounded-lg" />
                    <ErrorMessage name="hospitalName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <Field name="email" placeholder="Email" className="w-full border px-3 py-2 rounded-lg" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <Field name="phone" placeholder="Phone" className="w-full border px-3 py-2 rounded-lg" />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Approved:</label>
                    <input type="checkbox" checked={values.approved} onChange={(e) => setFieldValue("approved", e.target.checked)} />
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2 bg-gray-400 text-white rounded-xl">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-teal-600 text-white rounded-xl">Add</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

  
       {/* VIEW MODAL */}
      
      {showViewModal && selectedHospital && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 max-w-lg text-black">
            <h3 className="text-xl font-bold mb-4">{selectedHospital.hospitalName}</h3>

            <p><strong>Email:</strong> {selectedHospital.email}</p>
            <p><strong>Phone:</strong> {selectedHospital.phone}</p>
            <p><strong>Status:</strong> {selectedHospital.approved ? "Approved" : "Pending"}</p>

            <button
              onClick={() => setShowViewModal(false)}
              className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}


      


      

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 max-w-lg text-black">
            <h3 className="text-xl font-bold mb-4">Edit Hospital</h3>

            <div className="space-y-3">
              <input
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="Hospital Name"
                value={editData.hospitalName}
                onChange={(e) => setEditData({ ...editData, hospitalName: e.target.value })}
              />

              <input
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="Email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />

              <input
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="Phone"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />

              <div className="flex items-center gap-2">
                <label>Approved:</label>
                <input
                  type="checkbox"
                  checked={editData.approved}
                  onChange={(e) =>
                    setEditData({ ...editData, approved: e.target.checked })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};





     