import { Link } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { useMediaQuery } from "@mui/material";

const BannerImages = ({ productBanners }) => {
  const settings = {
    dots: false,
    infinite: productBanners.length > 1,
    autoplay: productBanners.lenght > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {productBanners.map((each, i) => (
          <div>
            <Link key={i} className="linkItem" to={each.azst_background_url}>
              <img
                src={isMobile ? each.azst_mobile_image : each.azst_web_image}
                alt={each.banner_id}
                className="carousel-image bannerImg"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerImages;
