import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getProductDiscount } from "../../Utils/DiscountPrcentage";
import { AddToWishlist, removeFromWishlist } from "../../Utils/AddToWishlist";
import "./Customer.css";
import AddToCart from "../../Utils/AddToCart";
import ErrorHandler from "./ErrorHandler";

const ProductCard = ({ items, setUpdate }) => {
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const navigate = useNavigate();

  const handleWishlist = async (product) => {
    try {
      if (!jwtToken) return navigate("/login");
      const productId = product.product_id;
      //const variantid = product.availableVariants[0]?.id ?? 0;
      const response = await AddToWishlist(productId, 0);
      if (response?.status === 200) {
        const wishlist_id = response.data.wishlist_id;
        const updatedItem = items.map((item) => {
          if (item.product_id === product.product_id) {
            return {
              ...item,
              in_wishlist: wishlist_id,
            };
          } else {
            return item;
          }
        });
        setUpdate(updatedItem);
      }
    } catch (error) {
      ErrorHandler.onError(error);
    }
  };

  const handleWishlistRemove = async (id) => {
    const result = await removeFromWishlist(id);
    if (result) {
      const updateData = items.map((p) => {
        if (p.in_wishlist === id) {
          return { ...p, in_wishlist: 0 };
        } else {
          return p;
        }
      });
      setUpdate(updateData);
    }
  };

  return (
    <>
      {items.map((each, i) => (
        <div className="col-6 col-md-3" key={each.product_id}>
          <div className="productsCardCont commonProductCard">
            <div className="productCard">
              <div className="productCardContTopSec">
                {parseInt(each.is_varaints_aval) !== 1 && (
                  <p className="productCardDiscount mb-0">
                    Save {getProductDiscount(each.compare_at_price, each.price)}
                    %
                  </p>
                )}

                <div>
                  {parseInt(each.in_wishlist) > 0 ? (
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
                <span style={{}} className="me-2 comparedPrice">
                  {parseInt(each.is_varaints_aval) !== 1 ? "Rs " : null}
                  {each.compare_at_price}
                </span>
                {parseInt(each.is_varaints_aval) === 1 && <br />}
                <span>
                  {parseInt(each.is_varaints_aval) !== 1 ? "Rs " : null}
                  {each.price}
                </span>
              </div>
              {(parseInt(each.product_qty) <= 0 ||
                parseInt(each.product_qty) <
                  parseInt(each.min_cart_quantity)) && (
                <small style={{ color: "red" }}>Out of Stock</small>
              )}
            </div>
            <div className="overlay_bg">
              <Link
                to={`/productitem/${each.product_url_title}`}
                className="linkBtn cardButton"
              >
                View Details
              </Link>
              <div className="hoveredCardButtonCont">
                {parseInt(each.in_wishlist) > 0 ? (
                  <button
                    onClick={() => handleWishlistRemove(each.in_wishlist)}
                    className="hoveredCardButton"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/cartActiveWishlistIcon.svg`}
                      alt="wishlist"
                      className="hoverIcon"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => handleWishlist(each)}
                    className="hoveredCardButton"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/cartWishlistIcon.svg`}
                      alt="wishlist"
                      className="hoverIcon"
                    />
                  </button>
                )}
                {parseInt(each.is_varaints_aval) !== 1 && (
                  <AddToCart
                    productId={each.product_id}
                    variantId={each.variant_id}
                    quantity={each.min_cart_quantity}
                    productQty={each.product_qty}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
