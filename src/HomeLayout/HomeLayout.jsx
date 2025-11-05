import { Outlet } from "react-router"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const HomeLayout = () => {
    return(
        <>
        <Navbar />
        <Outlet/>
        <Footer/>
        </>
    )
}