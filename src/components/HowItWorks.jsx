
// import React from 'react';
import { FaUserPlus, FaHospital, FaSyringe, FaCheckCircle } from 'react-icons/fa';
import Container from './LayoutContainer';
import { Button } from './webBtn';

export function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus className="w-8 h-8 text-teal-600" />,
      title: "Register on the Platform",
      description: "Create your free account in under 2 minutes with email or phone."
    },
    {
      icon: <FaHospital className="w-8 h-8 text-teal-600" />,
      title: "Choose a Hospital",
      description: "Browse verified hospitals near you with available slots."
    },
    {
      icon: <FaSyringe className="w-8 h-8 text-teal-600" />,
      title: "Select Vaccine & Date",
      description: "Pick your preferred vaccine and book a convenient time slot."
    },
    {
      icon: <FaCheckCircle className="w-8 h-8 text-teal-600" />,
      title: "Confirm & Visit",
      description: "Get confirmation via SMS/email and visit on your scheduled date."
    }
  ];

  return (
   <Container>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get vaccinated in just 4 simple steps — fast, safe, and hassle-free.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1"
            >
              {/* Step Number Circle */}
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-full mb-4 shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 group-hover:text-teal-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>

            
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="flex justify-center mt-12">
      <Button/>
        </div>
   </Container>

    
   
  );
}