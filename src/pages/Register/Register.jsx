import React, { useState } from 'react';
import Swal from "sweetalert2";

import { 
  FaUser, FaHospital, FaUserShield, FaRegEnvelope, FaLock, FaPhone,
  FaBuilding, FaIdCard,
  FaImage
} from 'react-icons/fa';
import { MdPersonAdd } from 'react-icons/md';

import Container from '../../components/LayoutContainer';
import BannerPhoto from "../../assets/webPhotos/LogInPagePhoto.jpg";


import { auth, db } from "../../Firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";




export const RegisterPage = () => {
const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cnic: "",
    hospitalName: "",
    adminCode: "",
    password: "",
    confirmPassword: "",
  });

  const roles = [
    { id: "user", label: "User", icon: <FaUser className="w-6 h-6" />, desc: "Get vaccinated easily" },
    { id: "hospital", label: "Hospital", icon: <FaHospital className="w-6 h-6" />, desc: "Manage patient records" },
    { id: "admin", label: "Admin", icon: <FaUserShield className="w-6 h-6" />, desc: "Control the system" },
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧠 Submit form and save to Firebase Firestore
const handleSubmit = async (e) => {
  e.preventDefault();

  const dataToSend = {
    fullName: formData.fullName,
    phone: formData.phone,
    email: formData.email,
    role: role,
  };

  if (role === "user") dataToSend.cnic = formData.cnic;
  if (role === "hospital") dataToSend.hospitalName = formData.hospitalName;
  if (role === "admin") dataToSend.adminCode = formData.adminCode;

  try {
    // ✅ 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const uid = userCredential.user.uid;

    // ✅ 2. Save user info in Firestore (based on role)
    let collectionName = "users";
    if (role === "hospital") collectionName = "hospitals";
    else if (role === "admin") collectionName = "admins";

    await setDoc(doc(db, collectionName, uid), {
      ...dataToSend,
      uid,
      createdAt: new Date(),
    });

    // ✅ 3. Show SweetAlert2 success message
    Swal.fire({
      title: `${role.charAt(0).toUpperCase() + role.slice(1)} Registered!`,
      text: "Your account has been created successfully.",
      icon: "success",
      confirmButtonColor: "#0d9488",
    });

    // ✅ 4. Reset form
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      cnic: "",
      hospitalName: "",
      adminCode: "",
      password: "",
      confirmPassword: "",
    });
    setRole("user");

  }
   catch (error) {
  console.error("Registration Error:", error);

  let errorMessage = "Registration failed. Please try again.";

  if (error.code === "auth/email-already-in-use") {
    errorMessage = "This email is already registered. Please log in instead.";
  }

  Swal.fire({
    title: "Registration Failed",
    text: errorMessage,
    icon: "error",
    confirmButtonColor: "#dc2626",
  });
}

};




  return (
    <Container>
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT: Register Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
            Choose Your Role
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {roles.map((r) => (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`group relative cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 text-center ${
                  role === r.id
                    ? "border-teal-500 bg-teal-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-3 rounded-xl transition-colors ${
                    role === r.id ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-600 group-hover:bg-teal-200"
                  }`}>
                    {r.icon}
                  </div>
                  <h4 className={`font-semibold text-base ${
                    role === r.id ? "text-teal-700" : "text-gray-800 group-hover:text-teal-600"
                  }`}>
                    {r.label}
                  </h4>
                </div>
                {role === r.id && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Register Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaUser className="w-5 h-5 text-teal-600" /> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaPhone className="w-5 h-5 text-teal-600" /> Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaRegEnvelope className="w-5 h-5 text-teal-600" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Role-specific fields */}
            {role === 'user' && (
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaIdCard className="w-5 h-5 text-teal-600" /> CNIC
                </label>
                <input
                  type="text"
                  name="cnic"
                  required
                  value={formData.cnic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  placeholder="12345-6789012-3"
                />
              </div>
            )}

            {role === 'hospital' && (
             
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaBuilding className="w-5 h-5 text-teal-600" /> Hospital Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  required
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  placeholder="Aga Khan University Hospital"
                />
              </div>
                         
               
            )}

            {role === 'admin' && (
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaUserShield className="w-5 h-5 text-teal-600" /> Admin Code
                </label>
                <input
                  type="text"
                  name="adminCode"
                  required
                  value={formData.adminCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  placeholder="Enter admin access code"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaLock className="w-5 h-5 text-teal-600" /> Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaLock className="w-5 h-5 text-teal-600" /> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Terms & Submit */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" required className="w-4 h-4 text-teal-600 rounded focus:ring-teal-100" />
              I agree to the <a href="#" className="text-teal-600 hover:underline">Terms & Privacy</a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MdPersonAdd className="w-5 h-5" /> Register as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>
        </div>

        {/* RIGHT: Image */}
        <div className="hidden lg:block h-full">
          <div className="h-full rounded-3xl overflow-hidden shadow-2xl sticky">
            <img src={BannerPhoto} alt="Healthcare" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </Container>
  );
};