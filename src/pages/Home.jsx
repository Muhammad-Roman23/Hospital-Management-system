import { Banner } from "../components/Banner"
import { ContactUs } from "../components/ContactUs"
import { Detail } from "../components/Detail"
import { Footer } from "../components/Footer"
import { Hospitals } from "../components/Hospitals"
import { HowItWorks } from "../components/HowItWorks"
import { Navbar } from "../components/Navbar"
import { Precautions } from "../components/Precautions"

export const Home = () => {
    return(
        <>
        
        <Navbar />
        <Banner />
        <Detail />
        <HowItWorks />
        <Hospitals/>
        <Precautions />
        <ContactUs />
        <Footer />
        </>

    )
}