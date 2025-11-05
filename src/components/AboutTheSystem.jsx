import Container from "./LayoutContainer";
import { BiCalendarCheck } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";
import { Button } from "./webBtn";

export const AboutTheSystem = () => {
      const highlights = [
    {
      icon: <BiCalendarCheck className="w-6 h-6 text-teal-600" />,
      title: "Easy Scheduling",
      desc: "Book and manage appointments in seconds.",
    },
    {
      icon: <BsShieldCheck className="w-6 h-6 text-teal-600" />,
      title: "Secure & Verified",
      desc: "Digital certificates and real-time updates.",
    },
    {
      icon: <FaUserSecret className="w-6 h-6 text-teal-600" />,
      title: "For Everyone",
      desc: "Hospitals, clinics, and citizens connected.",
    },
    {
      icon: <LuHeartHandshake className="w-6 h-6 text-teal-600" />,
      title: "Public Health First",
      desc: "Built with care for communities worldwide.",
    },
  ];
    return(
             <Container>
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          About the System
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our Vaccine Management System is a digital platform designed to simplify vaccine tracking, 
          appointment scheduling, and stock management for healthcare providers and the public. 
          We aim to make vaccination <span className="text-teal-600 font-medium">accessible, transparent, and efficient</span> for everyone.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
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
        <div className="flex text-center justify-center align-center mt-5 ">

      <Button />
        </div>
    </Container>
    )
}