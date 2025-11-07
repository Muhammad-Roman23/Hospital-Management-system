import { MdLogin } from "react-icons/md"
import { NavLink } from "react-router"

export const LogIn = () => {
    return(
      <NavLink to={"/login"} >

         <button className="group flex items-center gap-2 px-4.5 py-3  bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-blue-700 transition-all duration-300 font-medium text-sm rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105">
  <MdLogin className="w-4 h-4 text-teal-50 group-hover:text-white" />
  Log In
</button>
      </NavLink>
    )
}