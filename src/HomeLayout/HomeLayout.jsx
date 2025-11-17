    import { Outlet } from "react-router"
    import { Navbar } from "../components/Navbar"
    import { Footer } from "../components/Footer"
    import { useLocation } from "react-router"
    export const HomeLayout = () => {
        const location = useLocation()
        const hideLayout  = location.pathname === '/login' || location.pathname === "/register" || location.pathname.includes ("dashboard") 
        return(
            
       <>
        {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
       </>
        )
    }

