import Container from "./LayoutContainer";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import { MdVaccines } from "react-icons/md";
import { Button } from "./webBtn";
import { useState, useEffect } from "react";

export const Hospitals = ({ hospitalsData, showText, showInput }) => {
  const [filteredHospitals, setFilteredHospitals] = useState(hospitalsData);
  const [searchTerm, setSearchTerm] = useState("");

  // Update filtered data whenever hospitalsData changes
  useEffect(() => {
    setFilteredHospitals(hospitalsData);
  }, [hospitalsData]);

  // Handle search input and filtering
  const handleFilter = (val) => {
    setSearchTerm(val);

    if (val.trim() === "") {
      setFilteredHospitals(hospitalsData);
      return;
    }
    const filtered = hospitalsData.filter((hospital) => {
      return (
        hospital.name.toLowerCase().includes(val.toLowerCase()) ||
        hospital.location.toLowerCase().includes(val.toLowerCase()) ||
        hospital.availableVaccines.some((vaccine) =>
          vaccine.toLowerCase().includes(val.toLowerCase())
        )
      );
    });

    setFilteredHospitals(filtered);
  };

  return (
    <Container bgColor="#fff">
      {showText && (
        <>
          <h2 className="text-4xl font-bold text-center mb-4">
            Available Hospitals for{" "}
            <span className="text-blue-500">Vaccines</span>
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Explore a list of trusted hospitals offering a wide range of
            vaccines for individuals of all age groups. Each hospital provides
            up-to-date information about available vaccines, appointment slots,
            and contact details to make your vaccination process easier and
            faster.
          </p>
        </>
      )}

      {showInput && (
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="Search hospitals by name, location, or vaccine..."
              className="w-full px-5 py-4 pl-12 rounded-2xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none text-gray-700 placeholder-gray-400"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
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
                    <a
                      href={`tel:${hospital.contact}`}
                      className="hover:text-teal-600 transition-colors"
                    >
                      {hospital.contact}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaEnvelope className="w-4 h-4 text-teal-500" />
                    <a
                      href={`mailto:${hospital.email}`}
                      className="hover:text-teal-600 transition-colors truncate"
                    >
                      {hospital.email}
                    </a>
                  </div>
                </div>

                {/* Action Button */}
                <div className="btn-parent mt-4 w-full full-btn">
                  <Button />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-8">
            No hospitals found.
          </p>
        )}
      </div>
    </Container>
  );
};
