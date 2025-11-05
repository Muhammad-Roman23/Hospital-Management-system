import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import {
  BiCalendar, BiCheckCircle, BiIdCard, BiPhone, BiUser
} from 'react-icons/bi';
import { BsHospital } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg';
import { RiMvAiLine } from 'react-icons/ri';
import { FaDropletSlash, FaChevronDown } from 'react-icons/fa6';
import Container from './LayoutContainer';

export function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    ageOrDob: '',
    cnic: '',
    contact: '',
    email: '',
    vaccineType: '',
    hospital: '',
    date: '',
    time: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'VMS' + Math.floor(10000 + Math.random() * 90000);
    setBookingId(id);

    // Combine booking ID with form data
    const dataToSend = { ...formData, bookingId: id };

    // Send email using EmailJS
    emailjs
      .send(
        'service_i6d1ekf',     // e.g. service_xxxxxxx
        'template_hm6ab46',    // e.g. template_xxxxxxx
        dataToSend,
        '15Lse1_PkQx65O3EC'      // e.g. v0pABC123xyz
      )
      .then(() => {
        console.log('Email sent successfully!');
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            fullName: '',
            ageOrDob: '',
            cnic: '',
            contact: '',
            email: '',
            vaccineType: '',
            hospital: '',
            date: '',
            time: ''
          });
        }, 5000);
      })
      .catch((err) => {
        console.error('Email send failed:', err);
        alert('Error sending email. Please try again.');
      });
  };

  // ✅ Confirmation Screen
  if (submitted) {
    return (
      <Container>
        <div className="max-w-md mx-auto text-center">
          <BiCheckCircle className="w-20 h-20 text-teal-600 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
          <p className="text-lg text-gray-700 mb-2">Your appointment has been scheduled.</p>
          <div className="bg-teal-100 text-teal-700 px-6 py-3 rounded-full inline-block text-xl font-mono font-bold">
            {bookingId}
          </div>
          <p className="text-sm text-gray-600 mt-6">
            A confirmation has been sent to your Email Address.
          </p>
        </div>
      </Container>
    );
  }


  return (
    <Container className='remove-margin-bottom'  >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Book Your Vaccine <span className="text-teal-600">Today</span>
        </h2>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
          Fill in your details and secure your spot in just a few clicks.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mx-auto space-y-8">

        {/* Name + Age/DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <BiUser className="w-5 h-5 text-teal-600" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <BiCalendar className="w-5 h-5 text-teal-600" />
              Age or Date of Birth
            </label>
            <input
              type="text"
              name="ageOrDob"
              value={formData.ageOrDob}
              onChange={handleChange}
              required
              placeholder="25 or 15/03/1998"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* CNIC + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <BiIdCard className="w-5 h-5 text-teal-600" />
              CNIC / ID Number
            </label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              required
              placeholder="12345-6789012-3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <BiPhone className="w-5 h-5 text-teal-600" />
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="+92 300 1234567"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* Email + Vaccine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <RiMvAiLine className="w-5 h-5 text-teal-600" />
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
            />
          </div>

          {/* Vaccine Type with Right Arrow */}
          <div className="relative">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaDropletSlash className="w-5 h-5 text-teal-600" />
              Vaccine Type
            </label>
            <select
              name="vaccineType"
              value={formData.vaccineType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none appearance-none bg-none"
            >
              <option value="">Select Vaccine</option>
              <option>Pfizer-BioNTech</option>
              <option>Moderna</option>
              <option>Sinovac</option>
              <option>AstraZeneca</option>
              <option>Sinopharm</option>
            </select>
            <FaChevronDown className="absolute right-3 top-12 w-5 h-5 text-teal-600 pointer-events-none" />
          </div>
        </div>

        {/* Hospital + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hospital with Right Arrow */}
          <div className="relative">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <BsHospital className="w-5 h-5 text-teal-600" />
              Preferred Center
            </label>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none appearance-none bg-none"
            >
              <option value="">Choose Hospital</option>
              <option>Aga Khan University Hospital</option>
              <option>Civil Hospital Karachi</option>
              <option>Jinnah Postgraduate Medical Centre</option>
              <option>Indus Hospital</option>
              <option>Shaukat Khanum (Lahore)</option>
            </select>
            <FaChevronDown className="absolute right-3 top-12 w-5 h-5 text-teal-600 pointer-events-none" />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <BiCalendar className="w-5 h-5 text-teal-600" />
              Appointment Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}  
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* Time with Right Arrow */}
        <div className="relative">
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <CgLock className="w-5 h-5 text-teal-600" />
            Preferred Time
          </label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all outline-none appearance-none bg-none"
          >
            <option value="">Select Time Slot</option>
            <option>09:00 AM - 10:00 AM</option>
            <option>10:00 AM - 11:00 AM</option>
            <option>11:00 AM - 12:00 PM</option>
            <option>02:00 PM - 03:00 PM</option>
            <option>03:00 PM - 04:00 PM</option>
            <option>04:00 PM - 05:00 PM</option>
          </select>
          <FaChevronDown className="absolute right-3 top-12 w-5 h-5 text-teal-600 pointer-events-none" />
        </div>

        {/* Submit */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <BiCalendar className="w-6 h-6" />
            Book Appointment
          </button>
        </div>

      </form>
    </Container>
  );
}


