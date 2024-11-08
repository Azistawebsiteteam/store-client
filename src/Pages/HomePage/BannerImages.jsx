import { Link } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { useMediaQuery } from "@mui/material";

const BannerImages = ({ productBanners }) => {
  const settings = {
    dots: productBanners.length > 1,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="slider-container">
      {productBanners.length === 1 ? (
        <div className="carousel-slide carouselImgBg">
          <Link className="linkItem" to={productBanners[0].azst_background_url}>
            <div className="carousel-image-wrapper">
              <img
                src={
                  isMobile
                    ? productBanners[0].azst_mobile_image
                    : productBanners[0].azst_web_image
                }
                alt="banner-img"
                className="carousel-image carouselImgOverlay"
              />
            </div>
          </Link>
        </div>
      ) : (
        <>
          {" "}
          <Slider {...settings}>
            {productBanners.map((each, i) => (
              <div key={i} className="carousel-slide carouselImgBg">
                <Link className="linkItem" to={each.azst_background_url}>
                  <div className="carousel-image-wrapper">
                    <img
                      src={
                        isMobile ? each.azst_mobile_image : each.azst_web_image
                      }
                      alt={each.banner_id}
                      className="carousel-image carouselImgOverlay"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default BannerImages;
