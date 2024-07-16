import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { CiHeart } from "react-icons/ci";
import Cookies from "js-cookie";
import "./Components.css";
import BrandsTab from "./BrandsTab";
import Popup from "./Popup";
import UserRegistrationPopup from "./UserRegistration";
import CarouselItem from "./CarouselItem";

import {
  getWishlist,
  getProfileDetails,
} from "../UserDashboard/UserProfile/GetUseDetails";
import Blogs from "./Blogs";
import { Link } from "react-router-dom";
import ProductSlider from "./ProductSlider";

const Home = () => {
  const [brandsItems, setBrandsItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;
  const localUrl = process.env.REACT_APP_LOCAL_URL;
  const imgUrl = process.env.REACT_APP_IMAGES_URL;

  const { setWishlist, setWishlistCount, setUserDetails } =
    useContext(searchResultContext);
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    getWishlist(jwtToken, setWishlist, setWishlistCount);
    getProfileDetails(jwtToken, setUserDetails);
  }, [jwtToken, setWishlist, setWishlistCount, setUserDetails]);

  useEffect(() => {
    const apiCallMethod = async () => {
      try {
        const brandsUrl = `${baseUrl}/brands/data`;
        const categoriesUrl = `${baseUrl}/category/data`;
        const collectionsUrl = `${baseUrl}/collections/data`;
        const bestSellersUrl = `${baseUrl}/product/bestseller`;
        const [
          brandsResponse,
          categoriesResponse,
          collectionsResponse,
          bestSellersResponse,
        ] = await Promise.all([
          axios.get(brandsUrl),
          axios.get(categoriesUrl),
          axios.get(collectionsUrl),
          axios.post(bestSellersUrl),
        ]);

        if (brandsResponse.status === 200) {
          setBrandsItems(brandsResponse.data);
        }
        if (categoriesResponse.status === 200) {
          setCategories(categoriesResponse.data);
        }
        if (collectionsResponse.status === 200) {
          setCollections(collectionsResponse.data);
        }
        if (collectionsResponse.status === 200) {
          setBestSellers(bestSellersResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    apiCallMethod();
  }, [baseUrl]);

  return (
    <div className="bottomSec">
      <div className="home">
        <CarouselItem />
        <Popup />
        <UserRegistrationPopup />
        <ProductSlider
          title={"Explore Multi Collections"}
          type={"categories"}
          items={collections}
        />
        <ProductSlider
          title={"Best Sellers"}
          type={"bestSellers"}
          items={bestSellers}
        />
        {/* <div className="bestSellers">
          <div className="container">
            <h3 className="text-center">Best Sellers</h3>
            <div className="row">
              <div className="col-3 bestSelledProduct">
                <div className="productCard">
                  <div className="d-flex justify-content-between align-items-center">
                    <p
                      className="mb-0"
                      style={{ color: "#EC6B5B", fontWeight: "800" }}
                    >
                      Save 10%
                    </p>
                    <div>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/blackIcon.svg`}
                        alt="heartIcon"
                        className="heartIcon"
                      />
                      <img
                        src={`${process.env.PUBLIC_URL}/images/coloredIcon.svg`}
                        alt="heartIcon"
                        className="heartIcon"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <h6>IscanBreast</h6>
                    <small style={{ color: "rgba(40, 40, 40, 0.8)" }}>
                      Breast Self-Examination Device
                    </small>
                  </div>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/iscanBreast.png`}
                    alt="sef"
                    className="bestSelledImg"
                  />
                  <div className="price">
                    <span style={{ textDecoration: "line-through" }}>
                      Rs 1200
                    </span>
                    <span className="ms-2">Rs 1000</span>
                  </div>
                </div>
                <div class="overlay_bg">
                  <Link to="" class="linkBtn beforeHover">
                    View Details
                  </Link>
                  <Link to="" class="linkBtn beforeHover">
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="categories">
          <div className="container">
            <h3 className="text-center">Categories</h3>
            <div className="row">
              {categories.map((eachCategory, i) => (
                <div
                  className="col-6 col-md-2 categoryBox"
                  key={eachCategory.azst_category_id}
                >
                  <div className="category">
                    <img
                      src={eachCategory.azst_category_img}
                      alt={eachCategory.azst_category_name}
                      className="categoryImg"
                    />
                    <strong className="categoryTxt">
                      {eachCategory.azst_category_name}
                    </strong>
                  </div>
                  <div className="category_overlay">
                    <small>{`${eachCategory.no_products} Products`}</small>
                    {eachCategory.no_products > 0 && (
                      <Link to="viewAll">View All</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mt-4 mb-4">
          <div className="productBannerCont">
            <img
              src={`${process.env.PUBLIC_URL}/images/productBanner.png`}
              alt="productBanner"
              className="productBannerImg"
            />
            <div className="productBannerContent">
              <h2 style={{ fontWeight: "200" }}>
                Made For You Made For Better Skincare.
              </h2>
              <Link className="linkBtn customBtn" to={"toProduct"}>
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        <div className="brands">
          <h3 className="text-center">Explore With Brands</h3>
          <BrandsTab brandsItems={brandsItems} />
        </div>
        <ProductSlider
          title={"Shop at 99"}
          type={"shop99"}
          items={bestSellers}
        />
        <div className="custSatisfiedSec">
          <h3 className="text-center text-light">
            Satisfied customers, happy shopping!
          </h3>
          <div className="gifs">
            <div className="row">
              <div className="col gifCont">
                <img
                  className="gif"
                  src={`${process.env.PUBLIC_URL}/images/free-delivery.gif`}
                  alt="Free Delivery"
                />
                <div className="ps-2">
                  <h5 className="text-light">Free Shipping</h5>
                  <small className="text-light">On all Orders</small>
                </div>
              </div>
              <div className="col gifCont">
                <img
                  className="gif"
                  src={`${process.env.PUBLIC_URL}/images/award.gif`}
                  alt="Award"
                />
                <div className="ps-2">
                  <h5 className="text-light">Free Shipping</h5>
                  <small className="text-light">On all Orders</small>
                </div>
              </div>
              <div className="col gifCont">
                <img
                  className="gif"
                  src={`${process.env.PUBLIC_URL}/images/courier.gif`}
                  alt="Courier"
                />
                <div className="ps-2">
                  <h5 className="text-light">Free Shipping</h5>
                  <small className="text-light">On all Orders</small>
                </div>
              </div>
              <div className="col gifCont">
                <img
                  className="gif"
                  src={`${process.env.PUBLIC_URL}/images/shopping.gif`}
                  alt="Shopping"
                />
                <div className="ps-2">
                  <h5 className="text-light">Free Shipping</h5>
                  <small className="text-light">On all Orders</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blogsSec">
          <Blogs />
        </div>
        <div className="bottomStrip"></div>
      </div>
    </div>
  );
};

export default Home;
