import React, { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCheckCircle 
} from 'react-icons/fa';
import Container from './LayoutContainer';
import emailjs from 'emailjs-com';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('idle');

  const handleChange = (property, value) => {
    setFormData({
      ...formData,
      [property]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // 💌 Send email using EmailJS
    emailjs
      .send(
        'service_7yafzbg',        // 🔹 replace with your EmailJS service ID
        'template_vyzaeur',       // 🔹 replace with your template ID
        formData,
        '15Lse1_PkQx65O3EC'         // 🔹 replace with your public key
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setStatus('success');
          setFormData({ name: '', email: '', phone: '', message: '' });
          setTimeout(() => setStatus('idle'), 3000);
        },
        (error) => {
          console.error('Email sending failed:', error.text);
          setStatus('error');
        }
      );
  };

  return (
    <Container bgColor={"#fff"} >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h3>

          <div className="space-y-5">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-teal-100 rounded-full">
                <FaPhone className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Phone</h4>
                <p className="text-gray-600">+92 300 1234567</p>
                <p className="text-sm text-gray-500">Mon–Fri: 9 AM – 6 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-teal-100 rounded-full">
                <FaEnvelope className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email</h4>
                <p className="text-gray-600">support@vaccinetracker.pk</p>
                <p className="text-sm text-gray-500">We reply within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-teal-100 rounded-full">
                <FaMapMarkerAlt className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Office</h4>
                <p className="text-gray-600">123 Health Plaza, Karachi, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-teal-100 rounded-full">
                <FaClock className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Support Hours</h4>
                <p className="text-gray-600">Monday – Saturday</p>
                <p className="text-sm text-gray-500">9:00 AM – 6:00 PM (PKT)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>

          {status === 'success' && (
            <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-3 text-teal-700">
              <FaCheckCircle className="w-5 h-5" />
              <p className="font-medium">Thank you! Your message has been sent.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <p className="font-medium">Oops! Something went wrong. Please try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                placeholder="+92 300 1234567"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="How can we help you today?"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};
