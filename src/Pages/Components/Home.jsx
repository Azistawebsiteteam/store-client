import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { searchResultContext } from "../../ReactContext/SearchResults";
import Cookies from "js-cookie";
import "./Components.css";
import BrandsTab from "./BrandsTab";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import UserRegistrationPopup from "./UserRegistration";
import {
  getWishlist,
  getProfileDetails,
} from "../UserDashboard/UserProfile/GetUseDetails";

const Home = () => {
  const [brandsItems, setBrandsItems] = useState([]);
  const [banners, setBanners] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;
  const localUrl = process.env.REACT_APP_LOCAL_URL;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { setWishlist, setWishlistCount, setUserDetails } =
    useContext(searchResultContext);
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    getWishlist(jwtToken, setWishlist, setWishlistCount);
    getProfileDetails(jwtToken, setUserDetails);
  }, [jwtToken, setWishlist, setWishlistCount, setUserDetails]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const bannersUrl = `${baseUrl}/banners/data`;
        const bannersResponse = await axios.get(bannersUrl);
        const brandsUrl = `${baseUrl}/brands/data`;
        const brandsResponse = await axios.get(brandsUrl);

        if (brandsResponse.status === 200) {
          setBrandsItems(brandsResponse.data);
        }

        if (bannersResponse.status === 200) {
          setBanners(bannersResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCollections();
  }, [baseUrl]);

  return (
    <div className="bottomSec">
      <div className="home">
        <div
          id="carouselExample"
          data-bs-ride="carousel"
          className="carousel slide"
        >
          <div className="carousel-inner">
            {banners.map((eachObj) => (
              <div
                className="carousel-item active"
                id={eachObj.banner_id}
                key={eachObj.banner_id}
              >
                <Link to={eachObj.azst_background_url ?? ""}>
                  <img
                    src={
                      isMobile
                        ? eachObj.azst_mobile_image
                        : eachObj.azst_web_image
                    }
                    className="d-block w-100"
                    alt={eachObj.url}
                  />
                </Link>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <Popup />
        <UserRegistrationPopup />

        <div className="brands">
          <h4 className="text-center">Brands</h4>
          <BrandsTab brandsItems={brandsItems} />
        </div>
      </div>
    </div>
  );
};

export default Home;
