import React, { useEffect, useRef } from "react";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import "../Components/Customer.css";

const Slider = ({ title, type, items }) => {
  const boxRef = useRef(null);

  const scrollNext = () => {
    const box = boxRef.current;
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
    if (box.scrollLeft >= box.scrollWidth / 2) {
      box.scrollLeft = 0;
    }
  };

  const renderCollections = () => {
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
      </>
    );
  };

  const renderBestSellers = () => {
    return <ProductCard items={items} />;
  };

  const renderShop99 = () => {
    return <ProductCard items={items} />;
  };

  const renderElement = () => {
    switch (type) {
      case "categories":
        return renderCollections();
      case "bestSellers":
        return renderBestSellers();
      case "shop99":
        return renderShop99();
      default:
        return null;
    }
  };
  useEffect(() => {
    const interval = setInterval(scrollNext, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container-fluid">
      <div className="product-carousel">
        <div className="d-flex justify-content-md-between align-items-md-center">
          <h4>{title}</h4>
          {items.length > 4 && (
            <div className="sliderBtn-cont">
              <button
                className="slider-btn"
                onClick={() => {
                  boxRef.current.scrollLeft -= boxRef.current.clientWidth;
                }}
              >
                <BsArrowLeftShort fill="#7E7E7E" className="sliderBtn-icon" />
              </button>
              <button
                className="slider-btn ms-3"
                onClick={() => {
                  boxRef.current.scrollLeft += boxRef.current.clientWidth;
                }}
              >
                <BsArrowRightShort fill="#7E7E7E" className="sliderBtn-icon" />
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
