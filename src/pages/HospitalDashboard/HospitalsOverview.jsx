import React from "react";
import { 
  FaCalendarCheck, 
  FaSyringe,  
  FaUserCheck, 
  FaExclamationTriangle,
  FaPlusCircle, 
  FaEye 
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const HospitalsOverview = () => {
  const hospitalName = "City Care Hospital";

  // Dummy data (baad mein Firebase ya API se replace kar dena)
  const stats = {
    totalAppointments: 142,
    pendingAppointments: 28,
    totalVaccinesAvailable: 890,
    totalPatientsServed: 5678
  };

  return (
    <div className=" text-white ">
      {/* Welcome Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Welcome back, {hospitalName}
        </h1>
        <p className="text-gray-400 mt-3  text-lg">
          Here's what's happening at your hospital today.
        </p>
      </div>

      {/* 4 Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-9">

        {/* 1. Total Appointments */}
        <div className="bg-gradient-to-br from-teal-600/20 to-cyan-700/20 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-7 hover:scale-105 transition-all duration-300 shadow-2xl">
          <div className="flex items-start justify-between flex-col gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500">
              <FaCalendarCheck className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <p className="text-gray-300 text-sm mt-2 mb-4">Total Appointments</p>
              <h2 className="text-4xl font-extrabold text-teal-300">
                {stats.totalAppointments}
              </h2>
            </div>
          </div>
        </div>

        {/* 2. Available Vaccines */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-700/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-7 hover:scale-105 transition-all duration-300 shadow-2xl">
          <div className="flex items-start justify-between flex-col gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
              <FaSyringe className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <p className="text-gray-300 text-sm mt-2 mb-4">Vaccines Available</p>
              <h2 className="text-4xl font-extrabold text-purple-300">
                {stats.totalVaccinesAvailable}
              </h2>
            </div>
          </div>
        </div>

        {/* 3. Pending Appointments */}
        <div className="bg-gradient-to-br from-orange-600/20 to-red-700/20 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-7 hover:scale-105 transition-all duration-300 shadow-2xl">
          <div className="flex items-start justify-between flex-col gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
              <FaExclamationTriangle className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <p className="text-gray-300 text-sm mt-2 mb-4">Pending Approval</p>
              <h2 className="text-4xl font-extrabold text-orange-300">
                {stats.pendingAppointments}
              </h2>
            </div>
          </div>
        </div>

        {/* 4. Total Patients Served */}
        <div className="bg-gradient-to-br from-emerald-600/20 to-teal-700/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-7 hover:scale-105 transition-all duration-300 shadow-2xl">
          <div className="flex items-start gap-3 flex-col justify-between">
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
              <FaUserCheck className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <p className="text-gray-300 text-sm mt-2 mb-4">Patients Served</p>
              <h2 className="text-4xl font-extrabold text-emerald-300">      
                {stats.totalPatientsServed}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <Link to="/add-vaccine">
          <button className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-lg py-5 px-8 rounded-xl transition-all shadow-xl">
            <FaPlusCircle className="w-7 h-7" />
            Add New Vaccines
          </button>
        </Link>

        <Link to="/appointments">
          <button className="w-full flex items-center justify-center gap-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-bold text-lg py-5 px-8 rounded-xl transition-all shadow-xl">
            <FaEye className="w-7 h-7" />
            View All Appointments
          </button>
        </Link>
      </div>

      {/* Pending Alert Box */}
      {/* <div className="mt-12 bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-md border border-orange-500/40 rounded-2xl p-8 text-center">
        <p className="text-xl">
          You have <span className="text-orange-300 font-bold text-3xl">{stats.pendingAppointments}</span> appointments 
          <span className="text-yellow-400 font-semibold"> waiting for approval</span>
        </p>
      </div> */}
    </div>
  );
};