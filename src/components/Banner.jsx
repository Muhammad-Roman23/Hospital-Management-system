import { Button } from "./webBtn"
// import BannerPhoto from "../assets/webPhotos/homePageBannerPhoto.jpg"
import Container from "./LayoutContainer"

export const Banner = ({bannerHead,bannerPara,bannerPhoto}) => {
    return(
        <Container >

 
      {/* Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-100">
        
        {/* Column 1 - Content */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
           {bannerHead}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
         {bannerPara}
          </p>
          <Button/>
        </div>

        {/* Column 2 - Image */}
        <div className="flex justify-end">
          <img
            src={bannerPhoto}
            alt="Flower Decoration"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

      </div>
   
        </Container>

    )
}