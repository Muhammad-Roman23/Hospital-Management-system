import { FaHospital } from "react-icons/fa"
import { NavLink } from "react-router"

export const Button = () => {
    return(
      <NavLink to={"/appointment"} >

          <button className="cursor-pointer py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                             <FaHospital className="w-4 h-4" />
                             Book Appointment
                           </button>
      </NavLink>
    )
}