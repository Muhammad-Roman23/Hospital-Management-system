import React from 'react';
// import { 
//   IdCard, 
//   Mask, 
//   Utensils, 
//   CalendarX, 
//   Sparkles 
// } from 'react-icons/fa6';
import Container from './LayoutContainer';
import { BiCalendarX, BiIdCard, BiMask } from 'react-icons/bi';
import { FaUtensilSpoon } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';

export function VaccinationGuidelines() {
  const guidelines = [
    {
      icon: <BiIdCard className="w-7 h-7 text-teal-600" />,
      title: "Bring your CNIC / ID card and confirmation slip.",
      desc: "Required for verification at the center."
    },
    {
      icon: <BiMask className="w-7 h-7 text-teal-600" />,
      title: "Wear a mask and follow social distancing.",
      desc: "Protect yourself and others in public spaces."
    },
    {
      icon: <FaUtensilSpoon className="w-7 h-7 text-teal-600" />,
      title: "Eat light and stay hydrated before vaccination.",
      desc: "A small meal and water help your body respond better."
    },
    {
      icon: <BiCalendarX className="w-7 h-7 text-teal-600" />,
      title: "If you’re feeling unwell, reschedule your appointment.",
      desc: "Your health comes first — book when you're ready."
    }
  ];

  return (
    <Container bgColor={"#fff"} >
      {/* Main Section */}
      

        {/* Subtle Background Glows */}
       

        {/* Header */}
        <div className="text-center mb-12">
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Vaccination <span className="text-teal-600">Guidelines</span>
          </h2>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Follow these simple steps to ensure a smooth and safe experience.
          </p>
        </div>

        {/* Unique Checklist Flow */}
     <div className=" mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {guidelines.map((item, index) => (
      <div
        key={index}
        className="group flex items-start gap-5 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-teal-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300"
      >
        {/* Icon Circle */}
        <div className="flex-shrink-0 w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center group-hover:bg-teal-100 transition-colors">
          {item.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {item.desc}
          </p>
        </div>

        {/* Checkmark on Hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        {/* Final Tip */}
            
   
    </Container>
  );
}