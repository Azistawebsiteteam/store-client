/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { searchResultContext } from "../../ReactContext/SearchResults";
import Cookies from "js-cookie";
import BrandsTab from "./BrandsTab";
import Popup from "./Popup";
import UserRegistrationPopup from "./UserRegistration";
import CarouselItem from "./CarouselItem";
import ScrollToTop from "../../Utils/ScrollToTop";
import Rating from "@mui/material/Rating";
import { getProfileDetails } from "../UserDashboard/UserProfile/GetUseDetails";
import BlogsSection from "./BlogsSection";
import { Link } from "react-router-dom";
import ProductSlider from "./ProductSlider";
import Categories from "./Categories";
import { useMediaQuery } from "@mui/material";
import "../Components/Components.css";
import "../Components/Customer.css";

const Home = () => {
  const [brandsItems, setBrandsItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [productBanners, setProductBanners] = useState([]);
  const [value, setValue] = useState(3);
  const baseUrl = process.env.REACT_APP_API_URL;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { userDetails, setUserDetails } = useContext(searchResultContext);
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    getProfileDetails(jwtToken, setUserDetails);
  }, [jwtToken, setUserDetails]);

  useEffect(() => {
    const apiCallMethod = async () => {
      try {
        const brandsUrl = `${baseUrl}/brands/data`;
        const categoriesUrl = `${baseUrl}/category/data`;
        const productBannersUrl = `${baseUrl}/banners/product`;
        const collectionsUrl = `${baseUrl}/collections/data`;
        const bestSellersUrl = `${baseUrl}/product/bestseller`;
        const [
          brandsResponse,
          categoriesResponse,
          collectionsResponse,
          productBannersResponse,
          bestSellersResponse,
        ] = await Promise.all([
          axios.get(brandsUrl),
          axios.get(categoriesUrl),
          axios.get(collectionsUrl),
          axios.get(productBannersUrl),
          axios.post(bestSellersUrl, {
            customerId:
              userDetails.azst_customer_id ??
              localStorage.getItem(process.env.REACT_APP_CART_KEY),
          }),
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
        if (productBannersResponse.status === 200) {
          setProductBanners(productBannersResponse.data);
        }
        if (collectionsResponse.status === 200) {
          setBestSellers(bestSellersResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    apiCallMethod();
  }, [baseUrl, userDetails.azst_customer_id]);

  return (
    <>
      <ScrollToTop />
      <div className="bottomSec">
        <div className="home">
          <CarouselItem />
          <Popup />
          <UserRegistrationPopup />
          <div className="container multiCollections">
            <ProductSlider
              title={"Explore Multi Collections"}
              type={"categories"}
              items={collections}
            />
          </div>
          <div className="container bestSellers">
            <ProductSlider
              title={"Best Sellers"}
              type={"bestSellers"}
              items={bestSellers}
            />
          </div>
          <div className="container bestSellers">
            <Categories categories={categories} />
          </div>
          <div className="container productBanner">
            <div className="mt-4 mb-4">
              <div className="productBannerCont">
                {productBanners.map((each, i) => (
                  <Link className="linkItem" to={each.azst_background_url}>
                    <img
                      src={
                        isMobile ? each.azst_mobile_image : each.azst_web_image
                      }
                      alt={each.banner_id}
                      className="carousel-image"
                    />
                  </Link>
                ))}
                {/* <img
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
                </div> */}
              </div>
            </div>
          </div>
          <div className="container brandsSec">
            <div className="brands">
              <h4 className="text-center">Explore With Brands</h4>
              <BrandsTab brandsItems={brandsItems} />
            </div>
          </div>
          <div className="container shop99">
            <ProductSlider
              title={"Shop at 99"}
              type={"shop99"}
              items={bestSellers}
            />
          </div>

          <div className="custSatisfiedSecTop">
            <div className="container">
              <h4 className="text-center mb-5">
                Satisfied customers, happy shopping!
              </h4>
              <div className="card" style={{ width: "22rem" }}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/satisfiedCust.png`}
                  alt="satisfiedCust"
                  className="satisfiedCustImg"
                />
                <div className="card-body">
                  <p className="card-title">
                    <strong>Card title</strong>
                  </p>
                  <Rating
                    name="read-only"
                    value={value}
                    precision={0.5}
                    readOnly
                    className="gold-stars"
                  />
                  <small className="card-text d-block">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </small>
                  <div className="productBox">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/kwikmint.png`}
                      alt="satisfiedCust"
                      className="satisfiedProductImg"
                    />
                    <small>kwikmint mouth fresheners</small>
                    <Link className="linkBtn activeBtn">Add to cart</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="custSatisfiedSec">
            <h5 className="text-center text-light">
              Satisfied customers, happy shopping!
            </h5>
            <div className="gifs">
              <div className="row">
                <div className="col gifCont">
                  <img
                    className="gif"
                    src={`${process.env.PUBLIC_URL}/images/free-delivery.gif`}
                    alt="Free Delivery"
                  />
                  <div className="ps-2">
                    <p className="text-light mb-0">Free Shipping</p>
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
                    <p className="text-light mb-0">Global Quality</p>
                    <small className="text-light">Make in India</small>
                  </div>
                </div>
                <div className="col gifCont">
                  <img
                    className="gif"
                    src={`${process.env.PUBLIC_URL}/images/courier.gif`}
                    alt="Courier"
                  />
                  <div className="ps-2">
                    <p className="text-light mb-0">COD Available</p>
                    <small className="text-light">
                      Order Now, Pay On Delivery
                    </small>
                  </div>
                </div>
                <div className="col gifCont">
                  <img
                    className="gif"
                    src={`${process.env.PUBLIC_URL}/images/shopping.gif`}
                    alt="Shopping"
                  />
                  <div className="ps-2">
                    <p className="text-light mb-0">Try & Buy</p>
                    <small className="text-light">Click, Try and Buy</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container blogs">
            <BlogsSection />
          </div>
          <div className="bottomStrip"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
