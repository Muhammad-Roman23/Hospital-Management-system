import { Banner } from "../../components/Banner"
import { ContactSupport } from "../../components/ContactSupport"
import BannerPhoto from "../../assets/webPhotos/ContactUsBannerPhoto.jpg";
import { ContactUs } from "../../components/ContactUs"

export const ContactPage = () => {
     const bannerHead =
    "Let’s Connect and Care Together";
  const bannerPara =
    "Your feedback and inquiries matter to us. Whether you’re a patient, doctor, or hospital partner, we’re always here to listen and assist. Fill out the form or contact us through our details below — we’d love to hear from you!";
    return(
        <>
            <Banner bannerHead={bannerHead} bannerPara={bannerPara} bannerPhoto= {BannerPhoto}  />
            <ContactSupport />
            <ContactUs />
        </>
    )
}