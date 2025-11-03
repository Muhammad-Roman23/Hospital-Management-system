'use client';

import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHeart
} from 'react-icons/fa';

export  function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">VaccineTracker</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted platform for finding verified hospitals, booking vaccines, and staying protected.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-600 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Find Hospitals</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Book Vaccine</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Precautions</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Report Issue</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Get in Touch</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-teal-500" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-teal-500" />
                <span>support@vaccinetracker.pk</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-teal-500 mt-1" />
                <span>123 Health Plaza, Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center text-sm">
            <p className="text-white/90">
              © 2025 <span className="font-semibold">VaccineTracker</span>. All rights reserved.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
}