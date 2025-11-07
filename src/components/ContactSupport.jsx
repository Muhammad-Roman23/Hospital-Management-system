import { GiSparkles } from "react-icons/gi";
import Container from "./LayoutContainer";
import { BiPhone } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { RiMvAiLine } from "react-icons/ri";
import { BsShieldCheck } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";

export const ContactSupport = () => {
  return (
    <Container bgColor="#fff">
      {/* Main Section */}
     

        {/* Background Glows */}
        
        {/* Header */}
        <div className="text-center mb-12">
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Contact Us <span className="text-teal-600"> Anytime</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Have questions about vaccination, booking, or need assistance? Our dedicated support team is available around the clock.
          </p>
        </div>

        {/* Contact Options - Clean Horizontal Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Call Us */}
            <div className="group text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-teal-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-100 transition-colors">
                <BiPhone className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                Call Us
              </h3>
              <p className="text-2xl font-bold text-teal-600 mt-2">+92 300 1234567</p>
              <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
                <CgLock className="w-4 h-4" /> 24/7 Hotline
              </p>
            </div>

            {/* Email Us */}
            <div className="group text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-teal-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-100 transition-colors">
                <RiMvAiLine className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                Email Us
              </h3>
              <p className="text-lg font-medium text-teal-600 mt-2 break-all">support@vmshealth.pk</p>
              <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
                <BsShieldCheck className="w-4 h-4" /> Response within 1 hour
              </p>
            </div>

            {/* Live Chat */}
            <div className="group text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-teal-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-100 transition-colors">
                <FiMessageCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                Live Chat
              </h3>
              <p className="text-lg font-medium text-teal-600 mt-2">Start Chat Now</p>
              <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Agents Online
              </p>
            </div>

          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
            <BsShieldCheck className="w-6 h-6" />
            Your Privacy & Health Are Fully Protected
          </div>
        </div>
     
    </Container>
  );
}