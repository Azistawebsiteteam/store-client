import React from "react";
// import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";
import "../Components/Customer.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} navigateArrows slickNxt`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/rightArrow.svg`}
        alt="navigationArrows"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} navigateArrows slickPrev`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/leftArrow.svg`}
        alt="navigationArrows"
      />
    </div>
  );
}

const SimilarProductsSlider = ({ similarProducts, closeCart }) => {
  var settings = {
    lazyLoad: true,
    dots: false,
    infinite: similarProducts.length > 1, // Make infinite scrolling only if more than 1 item
    slidesToShow: 1, // Default for desktop view, handle when only 1 item
    slidesToScroll: 1,
    autoplay: false, // Enable autoplay only if more than 1 item
    speed: 500, // Adjust this for faster slide transitions (lower value = faster)
    autoplaySpeed: 1000, // Time in milliseconds between each autoplay slide
    nextArrow: similarProducts.length > 1 ? <SampleNextArrow /> : null, // Show arrows only if more than 1 item
    prevArrow: similarProducts.length > 1 ? <SamplePrevArrow /> : null, // Show arrows only if more than 1 item
  };

  const ProductCard = (product) => {
    return (
      <>
        <Link
          to={`/productitem/${product.product_url_title}`}
          onClick={closeCart}
          className="linkBtn"
        >
          <div className="cartProduct d-flex align-similarProducts-start">
            <div className="imgCont">
              <img
                src={product.image_src}
                alt={product.image_alt_text}
                className="cartProductImg"
              />
            </div>
            <div className="similarProductInfo ms-4">
              <Rating
                name="read-only"
                value={product.product_review_points}
                readOnly
              />
              <small className="d-block">
                <strong>{product.product_main_title}</strong>
              </small>
              {product.is_varaints_aval !== 0 && (
                <>
                  {product.option1 && <small>{product.option1}</small>}
                  {product.option2 && <small> - {product.option2}</small>}
                  {product.option3 && <small> - {product.option3}</small>}
                </>
              )}
              <small className="d-block">
                Rs. {product.price ? product.price : product.offer_price}
              </small>
            </div>
          </div>
        </Link>
      </>
    );
  };

  return (
    <div className="slider-container">
      <h5>Try Other Variants</h5>
      {similarProducts.length > 1 ? (
        <Slider {...settings}>
          {similarProducts.map((product) => (
            <div key={product.product_id}>{ProductCard(product)}</div>
          ))}
        </Slider>
      ) : (
        <>{similarProducts.length && <>{ProductCard(similarProducts[0])}</>}</>
      )}
    </div>
  );
};

export default SimilarProductsSlider;
