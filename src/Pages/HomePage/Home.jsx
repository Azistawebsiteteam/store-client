/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
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
import ErrorHandler from "../Components/ErrorHandler";
import MultiCollections from "./MultiCollections";
import BannerImages from "./BannerImages";

const Home = () => {
  const [brandsItems, setBrandsItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [shop99Data, setShop99Data] = useState([]);
  const [productBanners, setProductBanners] = useState([]);
  const [popupData, setPopupData] = useState({});
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
        const shop99Url = `${baseUrl}/product/shop@99`;
        const popupUrl = `${baseUrl}/popups/current/popup`;

        const [
          brandsResponse,
          categoriesResponse,
          collectionsResponse,
          productBannersResponse,
          bestSellersResponse,
          shop99Response,
          popupResponse,
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
          axios.post(shop99Url),
          axios.get(popupUrl),
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
        if (shop99Response.status === 200) {
          setShop99Data(shop99Response.data);
        }
        if (popupResponse.status === 200) {
          setPopupData(popupResponse.data);
        }
      } catch (error) {
        ErrorHandler.onError(error);
      }
    };
    apiCallMethod();
  }, [baseUrl, userDetails.azst_customer_id]);

  return (
    <>
      <ScrollToTop />
      <div className="bottomSec" style={{ marginTop: "0" }}>
        <div className="home">
          <CarouselItem />
          {Object.keys(popupData).length > 0 && <Popup popupData={popupData} />}
          <UserRegistrationPopup />
          {collections.length > 0 && (
            <div className="container multiCollections mt-md-5">
              <MultiCollections items={collections} />
            </div>
          )}
          {bestSellers.length > 0 && (
            <div className="container bestSellers d-none d-md-block mt-md-5">
              <ProductSlider
                title={"Best Sellers"}
                type={"bestSellers"}
                items={bestSellers}
                setUpdate={setBestSellers}
              />
            </div>
          )}
          {categories.length > 0 && (
            <div className="container bestSellers mt-md-5">
              <div className="ctn">
                <a href="#" id="categories">
                  &nbsp;
                </a>
              </div>

              <Categories categories={categories} breakpoint={2} />
            </div>
          )}
          <div className="container productBanner mt-md-5">
            <div className="mt-4 mb-4">
              <div className="productBannerCont">
                <BannerImages productBanners={productBanners} />
              </div>
            </div>
          </div>
          {brandsItems.length > 0 && (
            <div className="container brandsSec d-none d-md-block mt-md-5">
              <div className="brands">
                <div className="ctn">
                  <a href="#" id="brands">
                    &nbsp;
                  </a>
                </div>
                <h4 className="text-center">Explore With Brands</h4>
                <BrandsTab brandsItems={brandsItems} />
              </div>
            </div>
          )}

          {shop99Data.length > 0 && (
            <div className="container shop99 d-none d-md-block mt-md-5">
              <div className="ctn">
                <a href="" id="shop99">
                  &nbsp;
                </a>
              </div>
              <ProductSlider
                title={"Shop at 99"}
                type={"shop99"}
                items={shop99Data}
                setUpdate={setShop99Data}
              />
            </div>
          )}

          <div className="custSatisfiedSecTop mt-md-5">
            <div className="container">
              <h4 className="text-center mb-5">
                Satisfied customers, happy shopping!
              </h4>
              <div className="row">
                <div className="col-md-4">
                  <div
                    className="card custSatisfiedCard"
                    style={{ width: "21rem" }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/satisfiedCust.png`}
                      alt="satisfiedCust"
                      className="satisfiedCustImg"
                    />
                    <div className="card-body custSatisfiedCardbody">
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
                      <small className="card-text d-block mb-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
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
            </div>
          </div>
          <div className="custSatisfiedSec mt-md-5">
            <h5 className="text-center text-light">
              Satisfied customers, happy shopping!
            </h5>
            <div className="gifs">
              <div className="row">
                <div className="col-6 col-md-3 gifCont">
                  <img
                    className="gif"
                    src={`${process.env.PUBLIC_URL}/images/free-delivery.gif`}
                    alt="Free Delivery"
                  />
                  <div className="ps-2 gifInfo">
                    <p className="text-light mb-0">Free Shipping</p>
                    <small className="text-light">On all Orders</small>
                  </div>
                </div>
                <div className="col-6 col-md-3 gifCont">
                  <img
                    className="gif"
                    src={`${process.env.PUBLIC_URL}/images/award.gif`}
                    alt="Award"
                  />
                  <div className="ps-2 gifInfo">
                    <p className="text-light mb-0">Global Quality</p>
                    <small className="text-light">Make in India</small>
                  </div>
                </div>
                <div className="col-6 col-md-3 gifCont">
                  <img
                    className="gif"
                    src={`${process.env.PUBLIC_URL}/images/courier.gif`}
                    alt="Courier"
                  />
                  <div className="ps-2 gifInfo">
                    <p className="text-light mb-0">COD Available</p>
                    <small className="text-light">
                      Order Now, Pay On Delivery
                    </small>
                  </div>
                </div>
                <div className="col-6 col-md-3 gifCont">
                  <img
                    className="gif"
                    src={`${process.env.PUBLIC_URL}/images/shopping.gif`}
                    alt="Shopping"
                  />
                  <div className="ps-2 gifInfo">
                    <p className="text-light mb-0">Try & Buy</p>
                    <small className="text-light">Click, Try and Buy</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container blogs d-none d-md-block">
            <BlogsSection />
          </div>
          <div className="bottomStrip"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
