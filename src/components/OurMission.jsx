import React from 'react';
import { BiGlobe, BiTargetLock } from 'react-icons/bi';
import { BsHeartPulse } from 'react-icons/bs';
import { FaHandshake } from 'react-icons/fa';
import Container from './LayoutContainer';
// import { Target, HeartPulse, Globe, Handshake } from 'react-icons/fa6';

export function OurMission() {
  return (
    <Container>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our mission is to ensure <span className="text-teal-600 font-semibold">timely and accurate vaccine distribution</span> by bridging the gap between healthcare providers and patients through <span className="text-teal-600 font-semibold">technology-driven solutions</span>.
        </p>
      </div>

      {/* Flowing Mission Highlights – Vertical Timeline Style */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 via-teal-100 to-teal-50 hidden md:block"></div>

        {[
          {
            icon: <BiTargetLock className="w-7 h-7 text-teal-600" />,
            title: "Timely Distribution",
            desc: "Vaccines delivered on schedule, every time.",
          },
          {
            icon: <BsHeartPulse className="w-7 h-7 text-teal-600" />,
            title: "Health Equity",
            desc: "No patient left behind — access for all.",
          },
          {
            icon: <BiGlobe className="w-7 h-7 text-teal-600" />,
            title: "Global Impact",
            desc: "Supporting immunization programs worldwide.",
          },
          {
            icon: <FaHandshake className="w-7 h-7 text-teal-600" />,
            title: "Trusted Partnerships",
            desc: "Collaborating with clinics, governments, and NGOs.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="relative flex items-start gap-6 mb-10 md:mb-12 group"
          >
            {/* Icon Dot */}
            <div className="flex-shrink-0 w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:bg-teal-100 transition-all duration-300 z-10">
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-1 bg-gradient-to-r from-teal-50/30 to-transparent p-6 rounded-2xl border border-teal-100/50 backdrop-blur-sm hover:border-teal-200 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Final Accent */}
     
    </Container>
  );
}