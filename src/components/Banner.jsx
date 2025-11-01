import { Button } from "./webBtn"
import BannerPhoto from "../assets/webPhotos/homePageBannerPhoto.jpg"
import Container from "./LayoutContainer"

export const Banner = () => {
    return(
        <Container >

 
      {/* Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Column 1 - Content */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Protect Your Health, One Vaccine at a Time
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
           Stay informed and protected with our easy-to-use vaccine finder. Explore trusted hospitals, check real-time vaccine availability, and book your slot with confidence. Your health and safety are our top priority.
          </p>
          <Button/>
        </div>

        {/* Column 2 - Image */}
        <div className="flex justify-end">
          <img
            src={BannerPhoto}
            alt="Flower Decoration"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

      </div>
   
        </Container>

    )
}