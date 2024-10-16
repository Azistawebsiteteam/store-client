import React from "react";
import { Link } from "react-router-dom";
import { getProductDiscount } from "../../Utils/DiscountPrcentage";
import "./Customer.css";
import AddToCart from "../../Utils/AddToCart";

const ProductCard = ({ items }) => {
  return (
    <>
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
                    Save {getProductDiscount(each.compare_at_price, each.price)}
                    %
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
                <span>
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
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
