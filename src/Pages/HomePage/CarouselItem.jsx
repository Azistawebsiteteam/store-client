import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import "../Components/Customer.css";

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
        console.log(error);
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
    centerPadding: "60px",
    nextArrow: <BsArrowRight />,
    prevArrow: <BsArrowLeft style={{ color: "#fff" }} />,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {banners.map((each, i) => (
          <div key={i} className="carousel-slide">
            <Link className="linkItem" to={each.azst_background_url}>
              <img
                src={isMobile ? each.azst_mobile_image : each.azst_web_image}
                alt={each.banner_id}
                className="carousel-image"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselItem;
