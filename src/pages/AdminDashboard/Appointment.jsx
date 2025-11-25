import React, { useState } from 'react';
import { BiCalendar, BiCheckCircle, BiXCircle, BiUser, BiIdCard, BiPhone, BiEnvelope, BiClinic, BiTime, BiSearchAlt2 } from 'react-icons/bi';
import { BsCheckCircleFill, BsXCircle } from 'react-icons/bs';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { MdVaccines } from 'react-icons/md';

export const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Realistic static data based on your form
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      fullName: "John Doe",
      ageOrDob: "25 or 15/03/1998",
      cnic: "12345-6789012-3",
      contact: "+92 300 1234567",
      email: "you@example.com",
      vaccineType: "Pfizer COVID-19",
      hospital: "Aga Khan University Hospital",
      date: "2025-11-28",
      time: "10:30 AM",
      status: "Pending"
    },
    {
      id: 2,
      fullName: "Ayesha Siddiqua",
      ageOrDob: "32 or 22/07/1993",
      cnic: "42201-5678901-2",
      contact: "+92 321 9876543",
      email: "ayesha.s@gmail.com",
      vaccineType: "Sinopharm",
      hospital: "Jinnah Postgraduate Medical Centre",
      date: "2025-11-25",
      time: "02:00 PM",
      status: "Approved"
    },
    {
      id: 3,
      fullName: "Ali Raza",
      ageOrDob: "28 or 10/11/1997",
      cnic: "37405-1234567-9",
      contact: "+92 333 5556677",
      email: null,
      vaccineType: "Moderna",
      hospital: "Civil Hospital Karachi",
      date: "2025-11-24",
      time: "11:15 AM",
      status: "Completed"
    },
    {
      id: 4,
      fullName: "Fatima Noor",
      ageOrDob: "19 or 05/09/2006",
      cnic: "42101-9876543-2",
      contact: "+92 345 1122334",
      email: "fatima.noor@outlook.com",
      vaccineType: "AstraZeneca",
      hospital: "Liaquat National Hospital",
      date: "2025-11-29",
      time: "09:45 AM",
      status: "Pending"
    },
    {
      id: 5,
      fullName: "Hassan Ali",
      ageOrDob: "45 or 18/04/1980",
      cnic: "35202-4567890-1",
      contact: "+92 301 9988776",
      email: "hassan.ali@company.com",
      vaccineType: "Pfizer COVID-19 (Booster)",
      hospital: "Indus Hospital",
      date: "2025-11-26",
      time: "04:30 PM",
      status: "Approved"
    },
  ]);

  const handleApprove = (id) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: "Approved" } : app
    ));
  };

  const handleReject = (id) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: "Rejected" } : app
    ));
  };

  const filteredAppointments = appointments.filter(app =>
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.cnic.includes(searchTerm) ||
    app.vaccineType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/50", icon: <BsCheckCircleFill className="w-5 h-5" /> };
      case "Completed": return { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/50", icon: <BsCheckCircleFill className="w-5 h-5" /> };
      case "Rejected": return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/50", icon: <BsXCircle className="w-5 h-5" /> };
      default: return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/50", icon: <IoAlertCircleOutline className="w-5 h-5" /> };
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 ">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Vaccine Appointment Requests
          </h1>
          <p className="text-cyan-200 text-lg">Review and manage patient vaccination bookings</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <BiSearchAlt2 className="absolute z-10 left-4 top-1/2 -translate-y-1/2 text-cyan-300 w-6 h-6" />
            <input
              type="text"
              placeholder="Search by name, CNIC, vaccine or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-md border border-cyan-500/40 rounded-2xl text-white placeholder-cyan-300 focus:outline-none focus:border-cyan-400 transition-all duration-300 shadow-xl"
            />
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-7">
          {filteredAppointments.map((app) => {
            const statusStyle = getStatusStyle(app.status);
            return (
              <div
                key={app.id}
                className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 hover:bg-white/10 hover:border-cyan-400/60 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {/* Header: Name + Vaccine */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-2xl">
                      <MdVaccines className="w-9 h-9 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{app.fullName}</h3>
                      <p className="text-cyan-300 font-medium">{app.vaccineType}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
                    {statusStyle.icon}
                    <span className="font-semibold">{app.status}</span>
                  </div>
                </div>

                {/* Patient Details Grid */}
                <div className="grid grid-cols-1 gap-3 text-sm mb-5">
                  <div className="flex items-center gap-3 text-cyan-200">
                    <BiUser className="w-5 h-5 text-cyan-400" />
                    <span>{app.ageOrDob}</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-200">
                    <BiIdCard className="w-5 h-5 text-cyan-400" />
                    <span className="font-mono">{app.cnic}</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-200">
                    <BiPhone className="w-5 h-5 text-cyan-400" />
                    <span>{app.contact}</span>
                  </div>
                  {app.email && (
                    <div className="flex items-center gap-3 text-cyan-200">
                      <BiEnvelope className="w-5 h-5 text-cyan-400" />
                      <span className="truncate">{app.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-cyan-200">
                    <BiClinic className="w-5 h-5 text-cyan-400" />
                    <span className="truncate font-medium">{app.hospital}</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-200">
                    <BiCalendar className="w-5 h-5 text-cyan-400" />
                    <span>{app.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-200">
                    <BiTime className="w-5 h-5 text-cyan-400" />
                    <span>{app.time}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {app.status === "Pending" && (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <BiCheckCircle className="w-6 h-6" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold py-3 rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <BiXCircle className="w-6 h-6" />
                      Reject
                    </button>
                  </div>
                )}

                {app.status === "Approved" && (
                  <div className="text-center mt-4">
                    <p className="text-emerald-400 font-semibold">Appointment Confirmed</p>
                  </div>
                )}

                {app.status === "Completed" && (
                  <div className="text-center mt-4">
                    <p className="text-cyan-400 font-bold text-lg">Vaccination Completed</p>
                  </div>
                )}

                {app.status === "Rejected" && (
                  <div className="text-center mt-4">
                    <p className="text-red-400 font-bold">Appointment Rejected</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto border border-cyan-500/30">
              <IoAlertCircleOutline className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
              <p className="text-2xl text-cyan-200 font-medium">No appointments found</p>
              <p className="text-cyan-400 mt-2">Try adjusting your search</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};