import { Banner } from "../../components/Banner"
import { ContactUs } from "../../components/ContactUs"
import { Detail } from "../../components/Detail"
// import { Footer } from "../../components/Footer"
import { Hospitals } from "../../components/Hospitals"
import { HowItWorks } from "../../components/HowItWorks"
// import { Navbar } from "../../components/Navbar"
import { Precautions } from "../../components/Precautions"
import BannerPhoto from "../../assets/webPhotos/homePageBannerPhoto.jpg"
import Hospital1 from "../../assets/webPhotos/HospitalPhotos/hospital1.jpg"
import Hospital2 from "../../assets/webPhotos/HospitalPhotos/hospital2.jpg"
import Hospital3 from "../../assets/webPhotos/HospitalPhotos/hospital3.jpg"
import Hospital4 from "../../assets/webPhotos/HospitalPhotos/hospital4.jpg"
import Hospital5 from "../../assets/webPhotos/HospitalPhotos/hospital5.jpg"
import Hospital6 from "../../assets/webPhotos/HospitalPhotos/hospital6.jpg"


export const Home = () => {


        const hospitalsData = [
      {
        id: 1,
        name: "CityCare General Hospital",
        location: "Karachi, Sindh",
        availableVaccines: ["Pfizer", "Moderna", "Flu Vaccine"],
        contact: "+92 300 1234567",
        email: "info@citycarehospital.com",
        image: Hospital1
      },
      {
        id: 2,
        name: "HealthFirst Medical Center",
        location: "Lahore, Punjab",
        availableVaccines: ["Covaxin", "Polio Vaccine", "Hepatitis B"],
        contact: "+92 311 9876543",
        email: "contact@healthfirst.pk",
        image: Hospital2
      },
      {
        id: 3,
        name: "Green Valley Hospital",
        location: "Islamabad, Capital Territory",
        availableVaccines: ["Pfizer", "Sinovac", "Tetanus"],
        contact: "+92 322 4567890",
        email: "info@greenvalley.com",
        image: Hospital3
      },
      {
        id: 4,
        name: "CarePlus Medical Institute",
        location: "Rawalpindi, Punjab",
        availableVaccines: ["Moderna", "Influenza", "Hepatitis A"],
        contact: "+92 345 8765432",
        email: "support@careplus.pk",
        image: Hospital4
      },
      {
        id: 5,
        name: "LifeBridge Hospital",
        location: "Faisalabad, Punjab",
        availableVaccines: ["Sinopharm", "Polio", "Pfizer"],
        contact: "+92 334 1239876",
        email: "hello@lifebridge.com",
        image: Hospital5
      },
      {
        id: 6,
        name: "MetroCare Hospital",
        location: "Hyderabad, Sindh",
        availableVaccines: ["Moderna", "Influenza", "Rabies"],
        contact: "+92 336 8877665",
        email: "metrocare@health.pk",
        image: Hospital6
      }
    ];

    const bannerHead = " Protect Your Health, One Vaccine at a Time"
    const bannerPara = "  Stay informed and protected with our easy-to-use vaccine finder. Explore trusted hospitals, check real-time vaccine availability, and book your slot with confidence. Your health and safety are our top priority."



    return(
        <>
        
     
        <Banner bannerHead={bannerHead} bannerPara={bannerPara} bannerPhoto= {BannerPhoto} />
        <Detail />
        <HowItWorks />
        <Hospitals hospitalsData = {hospitalsData} showText={true} showInput={false}/>
        <Precautions />
        <ContactUs />
       
        </>

    )
}