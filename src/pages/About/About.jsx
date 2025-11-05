import { Banner } from "../../components/Banner";
import BannerPhoto from "../../assets/webPhotos/AboutBannerPhoto.avif";
import { Detail } from "../../components/Detail";

import { AboutTheSystem } from "../../components/AboutTheSystem";
import { OurMission } from "../../components/OurMission";
import { OurVision } from "../../components/OurVission";
import { WhyChooseUs } from "../../components/WhyChoose";
import { ContactUs } from "../../components/ContactUs";
// import { HeartHandshake, ShieldCheck, CalendarCheck, Users } from 'react-icons/fa6';
export const About = () => {


  const bannerHead =
    "Efficient, Reliable & Secure Vaccine Management for Everyone";
  const bannerPara =
    "Our Vaccine Management System helps hospitals, clinics, and users track vaccine availability, schedule appointments, and receive timely reminders — all in one place. Stay updated with real-time data and ensure every dose reaches those who need it most.";

  return (
    <>
      <Banner
        bannerHead={bannerHead}
        bannerPara={bannerPara}
        bannerPhoto={BannerPhoto}
      />
      <Detail />
      <AboutTheSystem />
      <OurVision />
      <OurMission />
      <WhyChooseUs />
        <ContactUs />
    </>
  );
};
