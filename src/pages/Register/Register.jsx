import React, { useState } from 'react';
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { 
  FaUser, FaHospital, FaUserShield, FaRegEnvelope, FaLock, FaPhone,
  FaBuilding, FaIdCard
} from 'react-icons/fa';
import { MdPersonAdd } from 'react-icons/md';

import Container from '../../components/LayoutContainer';
import BannerPhoto from "../../assets/webPhotos/LogInPagePhoto.jpg";

import { auth, db } from "../../Firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const RegisterPage = () => {
  const [role, setRole] = useState("user");

  const roles = [
    { id: "user", label: "User", icon: <FaUser className="w-6 h-6" />, desc: "Get vaccinated easily" },
    { id: "hospital", label: "Hospital", icon: <FaHospital className="w-6 h-6" />, desc: "Manage patient records" },
    { id: "admin", label: "Admin", icon: <FaUserShield className="w-6 h-6" />, desc: "Control the system" },
  ];

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone must be digits only').required('Phone is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    cnic: role === 'user' ? Yup.string().required('CNIC is required') : Yup.string(),
    hospitalName: role === 'hospital' ? Yup.string().required('Hospital Name is required') : Yup.string(),
    adminCode: role === 'admin' ? Yup.string().required('Admin Code is required') : Yup.string(),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const initialValues = {
    fullName: '',
    phone: '',
    email: '',
    cnic: '',
    hospitalName: '',
    adminCode: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    const dataToSend = {
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      role: role,
    };
    if (role === "user") dataToSend.cnic = values.cnic;
    if (role === "hospital") dataToSend.hospitalName = values.hospitalName;
    if (role === "admin") dataToSend.adminCode = values.adminCode;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const uid = userCredential.user.uid;

      let collectionName = "users";
      if (role === "hospital") collectionName = "hospitals";
      else if (role === "admin") collectionName = "admins";

      await setDoc(doc(db, collectionName, uid), {
        ...dataToSend,
        uid,
        createdAt: new Date(),
      });

      Swal.fire({
        title: `${role.charAt(0).toUpperCase() + role.slice(1)} Registered!`,
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonColor: "#0d9488",
      });

      resetForm();
      setRole("user");
    } catch (error) {
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

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form className="space-y-5">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <FaUser className="w-5 h-5 text-teal-600" /> Full Name
                    </label>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <FaPhone className="w-5 h-5 text-teal-600" /> Phone
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FaRegEnvelope className="w-5 h-5 text-teal-600" /> Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Role-specific fields */}
                {role === 'user' && (
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <FaIdCard className="w-5 h-5 text-teal-600" /> CNIC
                    </label>
                    <Field
                      type="text"
                      name="cnic"
                      placeholder="12345-6789012-3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                    />
                    <ErrorMessage name="cnic" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}

                {role === 'hospital' && (
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <FaBuilding className="w-5 h-5 text-teal-600" /> Hospital Name
                    </label>
                    <Field
                      type="text"
                      name="hospitalName"
                      placeholder="Aga Khan University Hospital"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                    />
                    <ErrorMessage name="hospitalName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}

                {role === 'admin' && (
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <FaUserShield className="w-5 h-5 text-teal-600" /> Admin Code
                    </label>
                    <Field
                      type="text"
                      name="adminCode"
                      placeholder="Enter admin access code"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                    />
                    <ErrorMessage name="adminCode" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FaLock className="w-5 h-5 text-teal-600" /> Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FaLock className="w-5 h-5 text-teal-600" /> Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
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
              </Form>
            )}
          </Formik>
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
