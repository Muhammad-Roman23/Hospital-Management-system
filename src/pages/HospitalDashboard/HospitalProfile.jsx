import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/Config";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiEdit2,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiX,
  FiPlus,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";

export const HospitalProfile = () => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [vaccineInput, setVaccineInput] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    fetchHospitalData();
  }, []);

  const fetchHospitalData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "hospitals", user.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      setHospital(data);
      setFormData({
        hospitalName: data.hospitalName || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        city: data.city || "",
        description: data.description || "",
        vaccines: data.vaccines || [],
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "hospitals", user.uid);

      // Optional: Upload logo to storage if needed (here just saving URL/base64)
      const updatedData = { ...formData };
      if (logoFile) {
        // Convert to base64 or upload to Firebase Storage
        const reader = new FileReader();
        reader.onloadend = async () => {
          updatedData.photo = reader.result;
          await updateDoc(docRef, updatedData);
          setHospital(updatedData);
          setShowEditModal(false);
        };
        reader.readAsDataURL(logoFile);
      } else {
        await updateDoc(docRef, updatedData);
        setHospital(updatedData);
        setShowEditModal(false);
      }
    } catch (err) {
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  const addVaccine = () => {
    if (vaccineInput.trim()) {
      setFormData({
        ...formData,
        vaccines: [...formData.vaccines, vaccineInput.trim()],
      });
      setVaccineInput("");
    }
  };

  const removeVaccine = (index) => {
    setFormData({
      ...formData,
      vaccines: formData.vaccines.filter((_, i) => i !== index),
    });
  };

  if (!hospital) {
    return (
      <div className="text-center mt-32 text-2xl text-gray-600">
        Loading Profile...
      </div>
    );
  }

  return (
    <>
      {/* Background */}
      
      <div className=" px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <div className="backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            {/* Header */}
            <div className="px-10 py-12 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    {hospital.photo ? (
                      <img
                        src={hospital.photo}
                        alt="Logo"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border-4 border-white/50 shadow-2xl">
                        <FiHome size={64} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-3 -right-3 px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl ${
                        hospital.approved ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {hospital.approved ? <FiCheckCircle /> : <FiClock />}{" "}
                      {hospital.approved ? "Approved" : "Pending"}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-5xl font-extrabold drop-shadow-lg">
                      {hospital.hospitalName}
                    </h2>
                    <p className="text-xl mt-2 opacity-90">{hospital.city}</p>
                    <div className="mt-5">
                      <span className="bg-white/25 backdrop-blur px-6 py-3 rounded-full text-lg font-medium shadow-lg inline-flex items-center gap-3">
                        <FiMail /> {hospital.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl cursor-pointer"
                >
                  <FiEdit2 size={24} />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-5 p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white">
                      <FiPhone size={28} />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">
                        Contact Number
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        +91 {hospital.phone}
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-5 p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl text-white">
                      <FiMapPin size={28} />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Address</p>
                      <p className="text-xl font-bold text-gray-800">
                        {hospital.address || "Not added"}
                      </p>
                      <p className="text-gray-600">{hospital.city}</p>
                    </div>
                  </div> */}
                </div>

                {/* About & Vaccines */}
                {/* <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    About Hospital
                  </h3>
                  <p className="text-gray-700 bg-white/50 backdrop-blur p-6 rounded-2xl border border-white/30">
                    {hospital.description || "No description added yet."}
                  </p>

                  {hospital.vaccines && hospital.vaccines.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Available Vaccines:
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {hospital.vaccines.map((v, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
                <h2 className="text-3xl font-bold">Edit Hospital Profile</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full"
                >
                  <FiX size={28} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {/* Logo Upload */}
                <div className="flex items-center gap-6">
                  <div className="  ">
                    {logoFile ? (
                      <img
                        src={URL.createObjectURL(logoFile)}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                      />
                    ) : hospital.photo ? (
                      <img
                        src={hospital.photo}
                        alt="Current"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center">
                        <FiHome size={50} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files[0] && setLogoFile(e.target.files[0])
                      }
                    />
                    <div className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2">
                      <FiUpload /> Upload Logo
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Hospital Name"
                    value={formData.hospitalName}
                    onChange={(e) =>
                      setFormData({ ...formData, hospitalName: e.target.value })
                    }
                    className="p-4 border text-black border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="p-4 border  text-black border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="p-4 border  text-black border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="p-4 border  text-black border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="p-4 border  text-black border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none md:col-span-2"
                  />
                  <textarea
                    rows={4}
                    placeholder="About / Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="p-4 border  text-black border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none md:col-span-2 resize-none"
                  ></textarea>
                </div>

                {/* Vaccines */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Add Vaccines</h3>
                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      value={vaccineInput}
                      onChange={(e) => setVaccineInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addVaccine()}
                      placeholder="e.g. Covishield, Covaxin"
                      className="flex-1 p-4 border  text-black border-gray-300 rounded-xl outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    <button
                      onClick={addVaccine}
                      className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                    >
                      <FiPlus size={24} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {formData.vaccines.map((v, i) => (
                      <span
                        key={i}
                        className="px-5 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-medium flex items-center gap-2"
                      >
                        {v}
                        <button
                          onClick={() => removeVaccine(i)}
                          className="ml-2 hover:text-red-600"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-8 py-4 border border-gray-300 rounded-xl text-black cursor-pointer hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-10 py-4 bg-gradient-to-r cursor-pointer from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-xl disabled:opacity-70"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

{
  /* export default HospitalProfile; */
}
