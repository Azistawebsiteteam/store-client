/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoHeartSharp } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";

// import { TfiTruck } from "react-icons/tfi";
import { MdSearch } from "react-icons/md";
import { searchResultContext } from "../../ReactContext/SearchResults";

// import "./Components.css";
import "./Customer.css";
import CollectionsTab from "./CollectionsTab";
import Announcement from "./Announcement";
import SocialIcons from "./SocialIcons";

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

  // const getProducts = async (value) => {
  //   const url = `${baseUrl}/product/search`;
  //   const body = {
  //     searchText: value,
  //   };
  //   const response = await axios.post(url, body);
  //   if (response.data.products) {
  //     setSearchTextResult(response.data.products);
  //   }
  // };

  // const onChangeSearchText = (e) => {
  //   setSearchText(e.target.value);
  //   handleSearchProducts(e.target.value);
  // };

  // const handleSearchProducts = (value) => {
  //   setTimeout(() => {
  //     getProducts(value);
  //   }, 2000);
  // };

  // const goToSearchResultPage = () => {
  //   setSearchResults(searchTextResult);
  //   navigate("/search/products");
  // };

  // const searchFunctionality = () => {
  //   return (
  //     searchText.length > 0 && (
  //       <div className="searchResultsCont">
  //         {searchTextResult.length > 0 ? (
  //           <>
  //             {searchTextResult.slice(0, 2).map((product, i) => (
  //               <Link
  //                 className="link"
  //                 to={`/productitem/${product.product_url_title}`}
  //                 key={i}
  //               >
  //                 <div className="d-flex mb-1 hoverSearchItem">
  //                   <img
  //                     className="searchImg"
  //                     src={product.image_src}
  //                     alt="productImg"
  //                   />
  //                   <div>
  //                     <p className="searchText">{product.product_title}</p>
  //                     <p className="searchItemPrice">Rs/- {product.price}</p>
  //                   </div>
  //                 </div>
  //               </Link>
  //             ))}
  //             {searchTextResult.length > 2 && (
  //               <p className="linkBtn" onClick={goToSearchResultPage}>
  //                 View all products
  //               </p>
  //             )}
  //           </>
  //         ) : (
  //           <p>No products found</p>
  //         )}
  //       </div>
  //     )
  //   );
  // };

  return (
    <>
      <header className="headerSec">
        <div className="freeShippingBar">
          <div className="socialIconsCont">
            <SocialIcons />
          </div>
          <div className="content">
            {cartTotal > parseInt(150) ? (
              <small>You are eligible for free shipping</small>
            ) : (
              <small>Free shipping for orders over Rs. 150.00!</small>
            )}
          </div>
          <div className="chatbotCont">
            <small>
              Help or Support
              <img
                src={`${process.env.PUBLIC_URL}/images/customer-service.svg`}
                className="social_icon"
                alt="email"
              />
            </small>
          </div>
        </div>
        <Announcement />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="navbarInnerSection">
              <div className="navIcon">
                <Link className="navbar-brand m-auto mr-md-auto" to="/">
                  <img
                    className="navlogo"
                    src={`${process.env.PUBLIC_URL}/images/logo1.svg`}
                    alt="img"
                  />
                </Link>
              </div>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav m-auto mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="aboutUs">
                      About Us
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="categories">
                      Categories
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="shobby"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Shop by
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link class="dropdown-item" to="Action">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="Action">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="Action">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="combos">
                      Combos
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="shop99">
                      Shop @99
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="rightSec">
                <Link to="sfs">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/search.svg`}
                    alt="searchIcon"
                    className="social_icon"
                  />
                </Link>
                <Link to={"sfs"}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/shopping-cart.svg`}
                    alt="cartIcon"
                    className="cartIcon"
                  />
                </Link>
                <Link to={"/profile-management"}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/user.svg`}
                    alt="userIcon"
                    className="social_icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {/* <ul className="tabsList">
          <CollectionsTab collectionsItems={collectionsItems} />
        </ul> */}
      </header>
    </>
  );
};

export default Navbar;

{
  /* <div>
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
</div> */
}
