// import React, { useState, useEffect } from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { getProductDiscount } from "../../Utils/DiscountPrcentage";
import SideBar from "../UserDashboard/UserProfile/SideBar";
import "../UserDashboard/UserProfile/UserProfile.css";
import { useCallback, useEffect, useState } from "react";
import swalHandle from "./ErrorHandler";
import ScrollToTop from "../../Utils/ScrollToTop";

const WishList = () => {
  const [wishList, setWishlist] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  const getWishlist = useCallback(async () => {
    if (!jwtToken) return;
    try {
      const url = `${baseUrl}/whish-list`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      const response = await axios.post(url, {}, { headers });
      setWishlist(response.data.whish_list);
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
    try {
      const url = `${baseUrl}/whish-list/remove`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      await axios.post(
        url,
        {
          whishlistId: id,
        },
        { headers }
      );
      swalHandle.onLoadingClose();
      getWishlist();
    } catch (error) {
      swalHandle.onLoadingClose();
      swalHandle.onError(error);
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="bottomSec">
        <div className="d-flex">
          <SideBar />
          <div className="myAccount_right_sec">
            <h5>Wishlist</h5>
            {wishList.length >= 1 ? (
              <div className="d-flex flex-wrap">
                {wishList.map((each, i) => (
                  <div className="wishlistItem" key={i}>
                    <div className="bestSelledProduct">
                      <div className="productCard">
                        <div className="d-flex justify-content-between align-items-center">
                          <p
                            className="mb-0"
                            style={{ color: "#EC6B5B", fontWeight: "800" }}
                          >
                            Save{" "}
                            {each.azst_variant_id === 0
                              ? getProductDiscount(
                                  each.product_compare_at_price,
                                  each.price
                                )
                              : getProductDiscount(
                                  each.compare_at_price,
                                  each.offer_price
                                )}
                            %
                          </p>
                          <div>
                            <img
                              src={`${process.env.PUBLIC_URL}/images/coloredIcon.svg`}
                              alt="heartIcon"
                              className="heartIcon"
                            />
                          </div>
                        </div>
                        <div className="productContent">
                          <h6>{each.product_main_title}</h6>
                          <small
                            className="product_subTitle"
                            style={{ color: "rgba(40, 40, 40, 0.8)" }}
                          >
                            {each.product_title}
                          </small>
                        </div>
                        <img
                          src={each.variant_image}
                          alt={each.image_alt_text}
                          className="bestSelledImg"
                        />
                        <div className="productPrice">
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "rgba(40, 40, 40, 0.7)",
                            }}
                          >
                            Rs {each.compare_at_price}
                          </span>
                          <span className="ms-2">Rs {each.price}</span>
                        </div>
                      </div>
                      <div className="overlay_bg">
                        <Link to="" className="linkBtn beforeHover">
                          Add to Cart
                        </Link>
                        <button
                          onClick={() => handleDelete(each.azst_wishlist_id)}
                          className="beforeHover"
                          style={{ border: "none" }}
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                No Products Found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
