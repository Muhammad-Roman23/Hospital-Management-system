import Container from "./LayoutContainer";
import { FaHospital, FaSyringe, FaClinicMedical, FaTruck } from "react-icons/fa";

export const Detail = () => {
  const cards = [
    {
      title: "Total Hospitals",
      value: "1,248",
      icon: <FaHospital className="w-12 h-12 text-white" />,
      bgGradient: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/50",
    },
    {
      title: "Total Vaccinated Childs",
      value: "8.5M",
      icon: <FaSyringe className="w-12 h-12 text-white" />,
      bgGradient: "from-green-500 to-green-600",
      shadow: "shadow-green-500/50",
    },
    {
      title: "Total Available Vaccines",
      value: "892",
      icon: <FaClinicMedical className="w-12 h-12 text-white" />,
      bgGradient: "from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/50",
    },
    {
      title: "Recovered Patients",
      value: "7.2M",
      icon: <FaTruck className="w-12 h-12 text-white" />,
      bgGradient: "from-orange-500 to-orange-600",
      shadow: "shadow-orange-500/50",
    },
  ];

  return (
    <Container bgColor="#fff" >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-6 lg:p-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 border-l-6 border-l-blue-500 hover:-translate-y-1 flex flex-col items-center text-center"
          >
            {/* Big Icon at Top */}
            <div
              className={`p-5 rounded-full bg-gradient-to-br ${card.bgGradient} ${card.shadow} shadow-lg mb-4`}
            >
              {card.icon}
            </div>

            {/* Medium Heading */}
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
              {card.title}
            </h3>

            {/* Large Number */}
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};