import React from "react";
// import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../Components/Customer.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} collectionSlider nxt-btn`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/right-arrow.svg`}
        alt="navigationArrows"
      />
    </div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} collectionSlider prev-btn`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/left-arrow.svg`}
        alt="navigationArrows"
      />
    </div>
  );
}

const MultiCollections = ({ items }) => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5, // Default for desktop view
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // Responsive settings for different screen sizes
    responsive: [
      {
        breakpoint: 1024, // Tablet and small desktop
        settings: {
          slidesToShow: 3, // Show 3 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile devices in portrait mode
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Small mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h4>
        Explore Multi <br className="d-md-none" />
        Collections
      </h4>
      <Slider {...settings}>
        {items.map((each, i) => (
          <div className="carouselItem" key={each.azst_collection_id}>
            <div className="exploreCategory">
              <img
                src={each.azst_collection_img}
                alt="productBanner"
                className="explore_more_categories_img"
              />
              <div className="custlinkBtnCont">
                <Link
                  className="linkBtn custlinkBtn"
                  to={`/collection/${each.collection_url_title}`}
                  state={{
                    collectionId: each.azst_collection_id,
                    collectionName: each.azst_collection_name,
                  }}
                >
                  {each.azst_collection_name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MultiCollections;
