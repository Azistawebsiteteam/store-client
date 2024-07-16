import React, { useRef, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import "./Customer.css"; // Make sure to create and import a corresponding CSS file
import { Link } from "react-router-dom";

const Slider = ({ title, type, items }) => {
  const boxRef = useRef(null);

  // const scrollNext = () => {
  //   const box = boxRef.current;
  //   let width = box.clientWidth;
  //   box.scrollLeft = box.scrollLeft + width;
  //   if (box.scrollLeft >= box.scrollWidth / 2) {
  //     box.scrollLeft = 0;
  //   }
  // };

  const renderCategories = () => {
    return (
      <>
        {items.map((each, i) => (
          <div className="carouselItem" key={each.azst_collection_id}>
            <div className="exploreCategory">
              <img
                src={each.azst_collection_img}
                alt="productBanner"
                className="explore_more_categories_img"
              />
              <div className="custlinkBtnCont">
                <Link className="linkBtn custlinkBtn" to="/teas">
                  {each.azst_collection_name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const getProductDiscount = (price, disPrice) => {
    const diff = parseInt(price) - parseInt(disPrice);
    const percentage = (diff / parseInt(price)) * 100;
    return Math.ceil(percentage);
  };

  const renderBestSellers = () => {
    return (
      <>
        {items.map((each, i) => (
          <div className="bestSellerCarouselItem" key={each.product_id}>
            <div className="bestSelledProduct">
              <div className="productCard">
                <div className="d-flex justify-content-between align-items-center">
                  <p
                    className="mb-0"
                    style={{ color: "#EC6B5B", fontWeight: "800" }}
                  >
                    Save {getProductDiscount(each.compare_at_price, each.price)}
                    %
                  </p>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/blackIcon.svg`}
                      alt="heartIcon"
                      className="heartIcon"
                    />
                  </div>
                </div>
                <div className="content">
                  <h6>IscanBreast</h6>
                  <small style={{ color: "rgba(40, 40, 40, 0.8)" }}>
                    {each.product_title}
                  </small>
                </div>
                <img
                  src={each.image_src}
                  alt={each.image_alt_text}
                  className="bestSelledImg"
                />
                <div className="price">
                  <span style={{ textDecoration: "line-through" }}>
                    Rs {each.compare_at_price}
                  </span>
                  <span className="ms-2">Rs {each.price}</span>
                </div>
              </div>
              <div className="overlay_bg">
                <Link to="" className="linkBtn beforeHover">
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderShop99 = () => {
    return (
      <>
        {items.map((each, i) => (
          <div className="bestSellerCarouselItem" key={each.product_id}>
            <div className="bestSelledProduct">
              <div className="productCard">
                <div className="d-flex justify-content-between align-items-center">
                  <p
                    className="mb-0"
                    style={{ color: "#EC6B5B", fontWeight: "800" }}
                  >
                    Save {getProductDiscount(each.compare_at_price, each.price)}
                    %
                  </p>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/blackIcon.svg`}
                      alt="heartIcon"
                      className="heartIcon"
                    />
                  </div>
                </div>
                <div className="content">
                  <h6>IscanBreast</h6>
                  <small style={{ color: "rgba(40, 40, 40, 0.8)" }}>
                    {each.product_title}
                  </small>
                </div>
                <img
                  src={each.image_src}
                  alt={each.image_alt_text}
                  className="bestSelledImg"
                />
                <div className="price">
                  <span style={{ textDecoration: "line-through" }}>
                    Rs {each.compare_at_price}
                  </span>
                  <span className="ms-2">Rs {each.price}</span>
                </div>
              </div>
              <div className="overlay_bg">
                <Link to="" className="linkBtn beforeHover">
                  Add to Cart
                </Link>
                <Link to="" className="linkBtn beforeHover">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderElement = () => {
    switch (type) {
      case "categories":
        return renderCategories();
      case "bestSellers":
        return renderBestSellers();
      case "shop99":
        return renderShop99();
      default:
        return null;
    }
  };
  // useEffect(() => {
  //   const interval = setInterval(scrollNext, 3000); // Auto-scroll every 3 seconds
  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div className="container-fluid">
      <div className="product-carousel">
        <div className="d-flex justify-content-md-between align-items-md-center">
          <h3>{title}</h3>
          {items.length > 4 && (
            <div className="sliderBtn-cont">
              <button
                className="slider-btn prev-btn"
                onClick={() => {
                  boxRef.current.scrollLeft -= boxRef.current.clientWidth;
                }}
              >
                <BsArrowLeftCircle />
              </button>
              <button
                className="slider-btn next-btn ms-3"
                onClick={() => {
                  boxRef.current.scrollLeft += boxRef.current.clientWidth;
                }}
              >
                <BsArrowRightCircle />
              </button>
            </div>
          )}
        </div>
        <div className="carouselItems-cont" ref={boxRef}>
          <div className="carouselItems">{renderElement()}</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
