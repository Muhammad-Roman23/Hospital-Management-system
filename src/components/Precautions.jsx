'use client';

import React from 'react';
import { 
  FaHandSparkles, 
  FaMask, 
  FaCalendarCheck, 
  FaBed, 
  FaUtensils, 
  FaPills, 
  FaUsers, 
  FaHospital 
} from 'react-icons/fa';
import Container from './LayoutContainer';

export function Precautions() {
  const precautions = [
    {
      icon: <FaHandSparkles className="w-6 h-6 text-teal-600" />,
      title: "Maintain Hygiene",
      desc: "Wash hands regularly and sanitize frequently-touched surfaces."
    },
    {
      icon: <FaMask className="w-6 h-6 text-teal-600" />,
      title: "Wear a Mask",
      desc: "Especially in crowded areas or healthcare facilities."
    },
    {
      icon: <FaCalendarCheck className="w-6 h-6 text-teal-600" />,
      title: "Follow Vaccine Schedule",
      desc: "Complete all doses as recommended by health authorities."
    },
    {
      icon: <FaBed className="w-6 h-6 text-teal-600" />,
      title: "Rest After Vaccination",
      desc: "Allow your body to recover; mild fever or fatigue is normal."
    },
    {
      icon: <FaUtensils className="w-6 h-6 text-teal-600" />,
      title: "Eat Healthy & Stay Hydrated",
      desc: "A balanced diet supports your immune system."
    },
    {
      icon: <FaPills className="w-6 h-6 text-teal-600" />,
      title: "Avoid Self-Medication",
      desc: "Consult a healthcare professional if you feel unwell."
    },
    {
      icon: <FaUsers className="w-6 h-6 text-teal-600" />,
      title: "Protect Others",
      desc: "Encourage family and friends to get vaccinated on time."
    },
    {
      icon: <FaHospital className="w-6 h-6 text-teal-600" />,
      title: "Seek Medical Help When Needed",
      desc: "Visit your nearest hospital for any post-vaccine concerns."
    }
  ];

  return (
   <Container>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            Precautions for Diseases
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed and protected by following essential health precautions 
            
              before and after vaccination.
          
          </p>
        </div>

        {/* Precautions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {precautions.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              {/* Icon with Pulse Animation */}
              <div className="mb-4 p-3 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors duration-300 animate-pulse-slow">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 group-hover:text-teal-600 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

   </Container>

 

  );
}