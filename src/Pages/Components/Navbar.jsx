/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoHeartSharp } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
// import { TfiTruck } from "react-icons/tfi";
import { MdSearch } from "react-icons/md";
import { searchResultContext } from "../../ReactContext/SearchResults";

import "./Components.css";
import CollectionsTab from "./CollectionsTab";
import Announcement from "./Announcement";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTextResult, setSearchTextResult] = useState([]);
  const [collectionsItems, setCollectionsItems] = useState([]);

  const { setSearchResults, wishlistCount, cartTotal } =
    useContext(searchResultContext);
  console.log(wishlistCount, "wishlistCount");
  const navigate = useNavigate();
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  let token = Cookies.get(jwtToken);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getCollections = async () => {
      try {
        const collectionsUrl = `${baseUrl}/collections/data`;
        const collectionsResponse = await axios.get(collectionsUrl);

        if (collectionsResponse.status === 200) {
          setCollectionsItems(collectionsResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCollections();
  }, [baseUrl]);

  const getProducts = async (value) => {
    const url = `${baseUrl}/product/search`;
    const body = {
      searchText: value,
    };
    const response = await axios.post(url, body);
    if (response.data.products) {
      setSearchTextResult(response.data.products);
    }
  };

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
    handleSearchProducts(e.target.value);
  };

  const handleSearchProducts = (value) => {
    setTimeout(() => {
      getProducts(value);
    }, 2000);
  };

  const goToSearchResultPage = () => {
    setSearchResults(searchTextResult);
    navigate("/search/products");
  };

  const searchFunctionality = () => {
    return (
      searchText.length > 0 && (
        <div className="searchResultsCont">
          {searchTextResult.length > 0 ? (
            <>
              {searchTextResult.slice(0, 2).map((product, i) => (
                <Link
                  className="link"
                  to={`/productitem/${product.product_url_title}`}
                  key={i}
                >
                  <div className="d-flex mb-1 hoverSearchItem">
                    <img
                      className="searchImg"
                      src={product.image_src}
                      alt="productImg"
                    />
                    <div>
                      <p className="searchText">{product.product_title}</p>
                      <p className="searchItemPrice">Rs/- {product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {searchTextResult.length > 2 && (
                <p className="linkBtn" onClick={goToSearchResultPage}>
                  View all products
                </p>
              )}
            </>
          ) : (
            <p>No products found</p>
          )}
        </div>
      )
    );
  };

  return (
    <>
      <header className="headerSec">
        <div className="freeShippingBar bg-info text-light">
          <marquee width="100%" direction="right">
            {cartTotal > parseInt(150)
              ? "You are eligible for free shipping"
              : "Free shipping for orders over Rs. 150.00!"}
          </marquee>
        </div>
        <Announcement />
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
          <div className="navbarInnerSection d-flex justify-content-around align-items-center">
            <div className="navIcon">
              <Link className="navbar-brand m-auto mr-md-auto" to="/">
                <img className="navlogo" src="../../../azista.png" alt="img" />{" "}
                Azista
              </Link>
            </div>
            <div className="form input_group">
              <input
                onChange={onChangeSearchText}
                value={searchText}
                type="text"
                placeholder="Search.."
              />
              <button type="submit">
                <MdSearch />
              </button>
              {searchFunctionality()}
            </div>
            <ul className="navbar-nav d-flex align-items-center">
              {token ? (
                <li className="nav-item">
                  <Link to="/wishList" className="nav-link">
                    <div className="wishListCount">
                      <IoHeartSharp className="userNav_social_icon" /> Wishlist
                      {wishlistCount > 0 && (
                        <span className="wishlistNumber">{wishlistCount}</span>
                      )}
                    </div>
                  </Link>
                </li>
              ) : null}
              {/* <li className="nav-item"><button className="nav-link"><TfiTruck className='userNav_social_icon' /> Track Your Order</button></li> */}
              <li className="nav-item d-flex align-items-center">
                <FaUser className="userNav_social_icon" />
                <div>
                  {token ? (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/profile-management"
                    >
                      My Account
                    </Link>
                  ) : (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/login"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  <FaCartShopping className="userNav_social_icon" /> Cart
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="tabsList">
          <CollectionsTab collectionsItems={collectionsItems} />
        </ul>
      </header>
      <div style={{ marginTop: "10rem" }}></div>
    </>
  );
};

export default Navbar;
