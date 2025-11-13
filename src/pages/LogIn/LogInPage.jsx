import React, { useState } from 'react';
import { FaHospital, FaLock, FaRegEnvelope, FaUser, FaUserShield } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/LayoutContainer';
import BannerPhoto from "../../assets/webPhotos/LogInPagePhoto.jpg";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from '../../Firebase/Config'; // ✅ Make sure your firebase.js exports app

export const LoginPage = () => {
  const [role, setRole] = useState('user');
  const [data, setdata] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const db = getFirestore(app);

  const handleChange = (value, property) => {
    setdata({ ...data, [property]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // ✅ Get the collection based on role (user / hospital / admin)
      const collectionRef = collection(db, role);

      // ✅ Check if email and password match
      const q = query(
        collectionRef,
        where("email", "==", data.email),
        where("password", "==", data.password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("Login successful!");
        navigate("/"); // ✅ redirect to homepage
      } else {
        setErrorMsg("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg("Something went wrong. Please try again later.");
    }

    setdata({
      email: "",
      password: ""
    });
  };

  const roles = [
    { id: 'user', label: 'User', icon: <FaUser className="w-6 h-6" />, desc: 'Book & track your vaccination' },
    { id: 'hospital', label: 'Hospital', icon: <FaHospital className="w-6 h-6" />, desc: 'Manage appointments & records' },
    { id: 'admin', label: <FaUserShield className="w-6 h-6" />, desc: 'System control & analytics' }
  ];

  return (
    <Container>
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side image */}
        <div className="hidden lg:block">
          <div className="relative h-full min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <img src={BannerPhoto} alt="Healthcare Professional" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Your Health, Our Priority</h3>
              <p className="text-lg">Safe. Secure. Seamless.</p>
            </div>
          </div>
        </div>

        {/* Right side form */}
        <div className="w-full space-y-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
              Select Your Role
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
                </div>
              ))}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaRegEnvelope className="w-5 h-5 text-teal-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaLock className="w-5 h-5 text-teal-600" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={data.password}
                  onChange={(e) => handleChange(e.target.value, "password")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>

              {errorMsg && (
                <p className="text-red-600 text-sm text-center font-medium">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MdLogin className="w-5 h-5" />
                Log In as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-teal-600 hover:text-teal-700 underline-offset-4 hover:underline"
                >
                  Register Yourself
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <FaLock className="w-3.5 h-3.5 text-teal-600" />
                Your data is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
