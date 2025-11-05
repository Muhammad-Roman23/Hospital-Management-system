import { Banner } from "../../components/Banner"
import BannerPhoto from "../../assets/webPhotos/AppointmentBannerphoto.avif";
import { AppointmentForm } from "../../components/AppointmentForm";
import { VaccinationGuidelines } from "../../components/Guidline";


export const Appointment = () => {
    const bannerHead =
    "Schedule your vaccination in just a few clicks.";
  const bannerPara =
    "Our online appointment system makes it easier than ever to get vaccinated safely and conveniently. Choose your preferred date, time, and vaccination center, and we’ll ensure your slot is reserved. Your protection starts with one appointment.";
    return(
        <>
        {/* <Banner bannerHead={bannerHead} bannerPara={bannerPara} bannerPhoto={BannerPhoto} /> */}
        <VaccinationGuidelines />
        <AppointmentForm />
        
        </>
    )
}