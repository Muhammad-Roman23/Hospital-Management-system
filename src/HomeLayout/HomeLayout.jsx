import { Outlet } from "react-router"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useLocation } from "react-router"
export const HomeLayout = () => {
    const location = useLocation()
    return(
        
        <>
        <Navbar />
        <Outlet/>
        <Footer/>
        </>
    )
}

