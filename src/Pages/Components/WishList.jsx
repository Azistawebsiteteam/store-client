// import React, { useState, useEffect } from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import { getProductDiscount } from "../../Utils/DiscountPrcentage";
import SideBar from "../UserDashboard/UserProfile/SideBar";
import "../UserDashboard/UserProfile/UserProfile.css";
import { useCallback, useEffect, useState } from "react";
import swalHandle from "./ErrorHandler";
import ScrollToTop from "../../Utils/ScrollToTop";
import AddToCart from "../../Utils/AddToCart";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../Utils/AddToWishlist";

const WishList = () => {
  const [wishList, setWishlist] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);

  const getWishlist = useCallback(async () => {
    if (!jwtToken) return;
    try {
      const url = `${baseUrl}/wish-list`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      const response = await axios.post(url, {}, { headers });
      setWishlist(response.data.wishlist);
      swalHandle.onLoadingClose();
    } catch (error) {
      swalHandle.onLoadingClose();
      swalHandle.onError(error);
    }
  }, [baseUrl, jwtToken]);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  const handleDelete = async (id) => {
    const result = await removeFromWishlist(id);
    if (result) {
      const updateData = wishList.filter((wl) => wl.azst_wishlist_id !== id);
      setWishlist(updateData);
    }
  };

  const getDicountPercentage = (each) => {
    const discount =
      each.is_varaints_aval === 0
        ? getProductDiscount(each.product_compare_at_price, each.price)
        : getProductDiscount(each.compare_at_price, each.offer_price);

    return discount > 0 ? (
      <p className="mb-0" style={{ color: "#EC6B5B", fontWeight: "800" }}>
        Save {discount}%
      </p>
    ) : (
      <p className="mb-0" style={{ color: "#EC6B5B", fontWeight: "800" }}></p>
    );
  };

  const getProductPrice = (each) => {
    const isVariantAvailable = parseInt(each.is_varaints_aval) === 1;
    const comparePrice = isVariantAvailable
      ? each.compare_at_price
      : each.product_compare_at_price;
    const salePrice = isVariantAvailable ? each.offer_price : each.price;

    return (
      <>
        <span className="me-2 comparedPrice">Rs {comparePrice}</span>
        <span>Rs {salePrice}</span>
      </>
    );
  };

  return (
    <>
      <ScrollToTop />
      <div className="bottomSec">
        <div className="d-flex">
          <SideBar />
          <div className="myAccount_right_sec wishlistContSec">
            <h5>Wishlist</h5>
            {wishList.length >= 1 ? (
              <div className="d-flex flex-wrap">
                {wishList.map((each, i) => (
                  <div className="wishlistItem" key={i}>
                    <div
                      className="bestSelledProduct"
                      style={{ minHeight: "49vh", maxHeight: "49vh" }}
                    >
                      <div className="productCard">
                        <div className="d-flex justify-content-between align-items-center">
                          {getDicountPercentage(each)}
                          <div>
                            <img
                              src={`${process.env.PUBLIC_URL}/images/coloredIcon.svg`}
                              alt="heartIcon"
                              className="heartIcon"
                            />
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
                            src={each.variant_image}
                            alt={each.image_alt_text}
                            className="bestSelledImg"
                          />
                        </div>
                        <div className="productPrice">
                          {getProductPrice(each)}
                        </div>
                        {(parseInt(each.product_qty) <= 0 ||
                          parseInt(each.product_qty) <
                            parseInt(each.min_cart_quantity)) && (
                          <small style={{ color: "red" }}>Out of Stock</small>
                        )}
                        {/* <div className="productPrice">
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "rgba(40, 40, 40, 0.7)",
                            }}
                          >
                            Rs {each.product_compare_at_price}
                          </span>
                          <span className="ms-2">Rs {each.price}</span>
                        </div> */}
                      </div>
                      <div className="overlay_bg">
                        <Link
                          to={`/productitem/${each.product_url_title}`}
                          className="linkBtn secondaryBuynowBtn"
                        >
                          View Details
                        </Link>
                        <div className="hoveredCardButtonCont">
                          <button
                            onClick={() => handleDelete(each.azst_wishlist_id)}
                            className="hoveredCardButton"
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/images/cartActiveWishlistIcon.svg`}
                              alt="wishlist"
                              className="hoverIcon"
                            />
                          </button>
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
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100">
                <h6>No Products Found</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
