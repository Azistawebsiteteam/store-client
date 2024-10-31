import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
// import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import "../Components/Customer.css";
import ErrorHandler from "../Components/ErrorHandler";

const CarouselItem = () => {
  const [banners, setBanners] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const getBanners = async () => {
      try {
        const bannersUrl = `${baseUrl}/banners/data`;
        const bannersResponse = await axios.get(bannersUrl);

        if (bannersResponse.status === 200) {
          setBanners(bannersResponse.data);
        }
      } catch (error) {
        ErrorHandler.onError(error);
      }
    };
    getBanners();
  }, [baseUrl]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "40px",
    nextArrow: <GoArrowRight />,
    prevArrow: <GoArrowLeft />,
  };

  return (
    <div className="carousel-container ">
      {banners.length === 1 ? (
        <div className="carousel-slide carouselImgBg">
          <Link className="linkItem" to={banners[0].azst_background_url}>
            <div className="carousel-image-wrapper">
              <img
                src={
                  isMobile
                    ? banners[0].azst_mobile_image
                    : banners[0].azst_web_image
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
            {banners.map((each, i) => (
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

export default CarouselItem;
