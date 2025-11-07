import React, { useState } from 'react';
import { 
  FaUser, 
  FaHospital, 
  FaUserShield, 
  FaRegEnvelope, 
  FaLock, 
  FaPhone,
  FaBuilding,
  FaIdCard
} from 'react-icons/fa';
import { MdPersonAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Container from '../../components/LayoutContainer';
import BannerPhoto from "../../assets/webPhotos/LogInPagePhoto.jpg"


export const RegisterPage = () => {
  const [role, setRole] = useState('user');

  const roles = [
    { id: 'user', label: 'User', icon: <FaUser className="w-6 h-6" />, desc: 'Get vaccinated easily' },
    { id: 'hospital', label: 'Hospital', icon: <FaHospital className="w-6 h-6" />, desc: 'Manage patient records' },
    { id: 'admin', label: 'Admin', icon: <FaUserShield className="w-6 h-6" />, desc: 'Control the system' }
  ];

  return (
    <Container>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      

  {/* LEFT: Register Form */}


    {/* Role Selection + Form Card */}
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
      <form className="space-y-5">
        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaUser className="w-5 h-5 text-teal-600" />
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaPhone className="w-5 h-5 text-teal-600" />
              Phone
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
              placeholder="+92 300 1234567"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaRegEnvelope className="w-5 h-5 text-teal-600" />
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
            placeholder="you@example.com"
          />
        </div>

        {/* Role-Specific Fields */}
        {role === 'user' && (
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaIdCard className="w-5 h-5 text-teal-600" />
              CNIC
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
              placeholder="12345-6789012-3"
            />
          </div>
        )}

        {role === 'hospital' && (
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaBuilding className="w-5 h-5 text-teal-600" />
              Hospital Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
              placeholder="Aga Khan University Hospital"
            />
          </div>
        )}

        {role === 'admin' && (
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaUserShield className="w-5 h-5 text-teal-600" />
              Admin Code
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
              placeholder="Enter admin access code"
            />
          </div>
        )}

        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaLock className="w-5 h-5 text-teal-600" />
            Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaLock className="w-5 h-5 text-teal-600" />
            Confirm Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" required className="w-4 h-4 text-teal-600 rounded focus:ring-teal-100" />
          I agree to the <a href="#" className="text-teal-600 hover:underline">Terms & Privacy</a>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MdPersonAdd className="w-5 h-5" />
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-600 hover:text-teal-700 underline-offset-4 hover:underline"
          >
            Log In
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


  {/* RIGHT: Image — Matches Form Height */}
  <div className="hidden lg:block h-full">
    <div className="h-full rounded-3xl overflow-hidden shadow-2xl sticky">
      <img
        src={BannerPhoto}
        alt="Healthcare"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-8 left-8 text-white">
        <h3 className="text-3xl font-bold mb-2">Join Our Health Network</h3>
        <p className="text-lg">Fast. Safe. Trusted.</p>
      </div>
    </div>
  </div>



      </div>
    </Container>

 
  );
};