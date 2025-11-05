import React from 'react';
import Container from './LayoutContainer';
import { GiSparkles } from 'react-icons/gi';
import { CgLock } from 'react-icons/cg';
import { BsFileCheck, BsShieldCheck } from 'react-icons/bs';
import { FaMousePointer } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { Button } from './webBtn';


export function WhyChooseUs() {
  return (
    <Container bgColor={"#fff"} >
      {/* Main Section */}
      <div className="rounded-3xl relative overflow-hidden">

        {/* Background Glows */}
      

        {/* Header */}
        <div className="text-center mb-14">
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
               Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A platform designed to simplify, secure, and scale vaccination programs — for everyone.
          </p>
        </div>

        {/* Unique Diagonal Flow Layout */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

            {/* Left Column */}
            <div className="space-y-12 md:space-y-16">

              {/* Feature 1 */}
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-teal-100 group-hover:shadow-lg transition-shadow">
                  <CgLock className="w-9 h-9 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    24/7 Accessible
                  </h3>
                  <p className="text-sm text-gray-600">Anytime, anywhere — on any device.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-teal-100 group-hover:shadow-lg transition-shadow">
                  <BsShieldCheck className="w-9 h-9 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    Data Accuracy & Security
                  </h3>
                  <p className="text-sm text-gray-600">Encrypted, verified, and always up-to-date.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-teal-100 group-hover:shadow-lg transition-shadow">
                  <FaMousePointer className="w-9 h-9 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    Easy-to-Use Interface
                  </h3>
                  <p className="text-sm text-gray-600">Intuitive design for all users.</p>
                </div>
              </div>

            </div>

            {/* Right Column (Offset for Diagonal Flow) */}
            <div className="space-y-12 md:space-y-16 md:mt-10">

              {/* Feature 4 */}
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-teal-100 group-hover:shadow-lg transition-shadow">
                  <BsFileCheck className="w-9 h-9 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    Reduces Paperwork
                  </h3>
                  <p className="text-sm text-gray-600">Go digital — save time and trees.</p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-teal-100 group-hover:shadow-lg transition-shadow">
                  <BiTrendingUp className="w-9 h-9 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    Improves Coverage
                  </h3>
                  <p className="text-sm text-gray-600">Track, remind, and reach more people.</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Final Trust Badge */}

      </div>
      {/* <div className="parent-btn flex justify-center">

        <Button />
      </div> */}
    </Container>
  );    
}