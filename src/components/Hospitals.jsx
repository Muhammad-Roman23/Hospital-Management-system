import Container from "./LayoutContainer"
import { FaHospital, FaMapMarkerAlt, FaPhone, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { MdVaccines } from 'react-icons/md';
import { hospitalsData } from "../Data/HospitalData"
import { Button } from "./webBtn";

export const Hospitals = () => {
    return(
       <Container   bgColor="#fff" >
        <h2 className="text-4xl font-bold text-center mb-4" >Available Hospital for <span className="text-blue-500" > Vaccines</span></h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
  Explore a list of trusted hospitals offering a wide range of vaccines for individuals of all age groups. Each hospital provides up-to-date information about available vaccines, appointment slots, and contact details to make your vaccination process easier and faster.
</p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
            {hospitalsData.slice(1,7).map((hospital) => (
              <div
                key={hospital.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
                    <FaShieldAlt className="w-5 h-5 text-teal-400" />
                    <span className="text-sm font-medium">Verified Facility</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                      <FaMapMarkerAlt className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">{hospital.location}</span>
                    </div>
                  </div>

                  {/* Vaccines */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <MdVaccines className="w-5 h-5 text-teal-600" />
                      Available Vaccines:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {hospital.availableVaccines.map((vaccine, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200 flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                          {vaccine}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaPhone className="w-4 h-4 text-teal-500" />
                      <a href={`tel:${hospital.contact}`} className="hover:text-teal-600 transition-colors">
                        {hospital.contact}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaEnvelope className="w-4 h-4 text-teal-500" />
                      <a href={`mailto:${hospital.email}`} className="hover:text-teal-600 transition-colors truncate">
                        {hospital.email}
                      </a>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="btn-parent mt-4 w-full full-btn">

                 <Button  />
                  </div>
                </div>
              </div>
            ))}
        </div>
       </Container>
    )
}