import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../Components/Customer.css";
import AddToCart from "../../Utils/AddToCart";
import { getProductDiscount } from "../../Utils/DiscountPrcentage";

function SampleNextArrow(props) {
  const { style, onClick } = props;

  return (
    <div
      className={` productSlider next-btn`}
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
  const { style, onClick } = props;
  return (
    <div
      className={`productSlider back-btn`}
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

const productSlider = ({ title, items }) => {
  var settings = {
    lazyLoad: true,
    dots: false,
    infinite: items.length > 1, // Make infinite scrolling only if more than 1 item
    slidesToShow: items.length > 4 ? 5 : items.length, // Default for desktop view, handle when only 1 item
    slidesToScroll: 1,
    autoplay: false, // Enable autoplay only if more than 1 item
    speed: 500, // Adjust this for faster slide transitions (lower value = faster)
    autoplaySpeed: 1000, // Time in milliseconds between each autoplay slide
    nextArrow: items.length > 1 ? <SampleNextArrow /> : null, // Show arrows only if more than 1 item
    prevArrow: items.length > 1 ? <SamplePrevArrow /> : null, // Show arrows only if more than 1 item
    responsive: [
      {
        breakpoint: 1024, // Tablet and small desktop
        settings: {
          slidesToShow: items.length > 2 ? 3 : items.length, // Show 3 slides or the available items
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile devices in portrait mode
        settings: {
          slidesToShow: items.length > 1 ? 2 : items.length, // Show 2 slides or the available items
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
      <h4>{title}</h4>
      <Slider {...settings}>
        {items.map((each, i) => (
          <div className="bestSellerCarouselItem" key={each.product_id}>
            <div className="bestSelledProduct">
              <div className="productCard">
                <div className="d-flex justify-content-between align-items-center">
                  {parseInt(each.is_varaints_aval) !== 1 && (
                    <p
                      className="mb-0"
                      style={{ color: "#EC6B5B", fontWeight: "800" }}
                    >
                      Save{" "}
                      {getProductDiscount(each.compare_at_price, each.price)}%
                    </p>
                  )}

                  <div>
                    {each.in_wishlist === 1 ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/coloredIcon.svg`}
                        alt="heartIcon"
                        className="heartIcon"
                      />
                    ) : (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/blackIcon.svg`}
                        alt="heartIcon"
                        className="heartIcon"
                      />
                    )}
                  </div>
                </div>
                <div className="productContent">
                  <p className="truncate">{each.product_main_title}</p>
                  <small
                    className="product_subTitle truncate"
                    style={{ color: "rgba(40, 40, 40, 0.8)" }}
                  >
                    {each.product_title}
                  </small>
                </div>
                <div className="d-flex justify-content-center">
                  <img
                    src={each.image_src}
                    alt={each.image_alt_text}
                    className="bestSelledImg"
                  />
                </div>
                <div className="productPrice">
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "rgba(40, 40, 40, 0.7)",
                    }}
                    className="me-2"
                  >
                    {parseInt(each.is_varaints_aval) !== 1 && "Rs"}
                    {each.compare_at_price}
                  </span>
                  {parseInt(each.is_varaints_aval) === 1 && <br />}
                  <span className="">
                    {parseInt(each.is_varaints_aval) !== 1 && "Rs"} {each.price}
                  </span>
                </div>
              </div>
              <div className="overlay_bg">
                {/* <Link to="" className="linkBtn beforeHover">
                Add to Cart
              </Link> */}
                {parseInt(each.is_varaints_aval) !== 1 && (
                  <AddToCart
                    productId={each.product_id}
                    variantId={each.variant_id}
                    quantity={each.min_cart_quantity}
                  />
                )}
                <Link
                  to={`/productitem/${each.product_url_title}`}
                  className="linkBtn beforeHover"
                >
                  View Details
                </Link>
                <Link to="" className="linkBtn tertiaryBtn">
                  Add to Favourite
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default productSlider;
