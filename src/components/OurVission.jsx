import React from 'react';
import Container from './LayoutContainer';
import { GiSparkles } from 'react-icons/gi';
import { BiGlobe } from 'react-icons/bi';
import { BsHeartPulse, BsShieldCheck } from 'react-icons/bs';
import { FaUserSecret } from 'react-icons/fa';
import { Button } from './webBtn';
// import { Globe, ShieldCheck, HeartPulse, Users, Sparkles } from 'react-icons/fa6';

export function OurVision() {
  return (
    <Container bgColor={"#fff"} >
      {/* Main Vision Section */}
      <div className=" overflow-hidden relative">

        {/* Soft Background Glows */}
      

        {/* Header */}
        <div className="text-center mb-12">
         
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
           Our Vision
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            To build a <span className="text-teal-600 font-bold">safer, healthier world</span> where every individual has access to accurate vaccine information and reliable healthcare support.
          </p>
        </div>

        {/* Simple Icon Row – No Map, No item.icon */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-10">
          
          {/* Icon 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 border border-teal-100">
              <BiGlobe className="w-10 h-10 text-teal-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Global Reach</p>
          </div>

          {/* Icon 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 border border-teal-100">
              <BsShieldCheck className="w-10 h-10 text-teal-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Trusted Truth</p>
          </div>

          {/* Icon 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 border border-teal-100">
              <BsHeartPulse className="w-10 h-10 text-teal-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Universal Care</p>
          </div>

          {/* Icon 4 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 border border-teal-100">
              <FaUserSecret className="w-10 h-10 text-teal-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Connected Communities</p>
          </div>

        </div>

        {/* Final CTA */}
      </div>
   
    </Container>
  );
}