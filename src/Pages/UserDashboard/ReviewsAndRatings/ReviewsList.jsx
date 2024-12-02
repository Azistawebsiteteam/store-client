import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Rating from "@mui/material/Rating";
import SideBar from "../UserProfile/SideBar";
// import moment from "moment";
import { searchResultContext } from "../../../ReactContext/SearchResults";
import axios from "axios";
import ThreeDotsDropdown from "../../Components/ThreeDotsDropdown";
import "../index.css";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const { userDetails } = useContext(searchResultContext);
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    const userReviews = async () => {
      const url = `${baseUrl}/reviews/my`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      const response = await axios.get(url, { headers });
      setReviews(response.data);
    };
    userReviews();
  }, [userDetails, baseUrl, jwtToken]);

  // const date = (createDate) => {
  //   return moment(createDate).format("YYYY-MM-DD");
  // };

  return (
    <div className="bottomSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccount_right_sec reviewsContSec">
          <h5 style={{ fontFamily: "outfit" }}>Reviews & Ratings</h5>

          {reviews.length !== 0 ? (
            <div className="row">
              {reviews.map((review, i) => (
                <div className="col-md-4" key={review.review_id}>
                  <div className="myAccReviewCont">
                    <div className="d-flex justify-content-between align-items-start mt-1 mb-1">
                      {
                        <img
                          src={review.product_image}
                          style={{ width: "26%" }}
                          alt="productImage"
                        />
                      }
                      <small style={{ fontWeight: "500" }}>
                        Reviewed on
                        <br />
                        {review.created_on}
                      </small>
                      <div className="dropdownMenuCont">
                        <ThreeDotsDropdown
                          reviewId={review.review_id}
                          reviews={reviews}
                          setReviews={setReviews}
                        />
                      </div>
                    </div>
                    <Rating
                      name="read-only"
                      value={review.review_points}
                      precision={0.5}
                      readOnly
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: "rgba(0, 128, 96, 1)", // Color for filled stars
                        },
                        "& .MuiRating-iconEmpty": {
                          color: "lightgray", // Color for empty stars
                        },
                      }}
                    />
                    <span className="truncate" style={{ fontWeight: "500" }}>
                      {review.review_title}
                    </span>
                    <small className="truncate">{review.review_content}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <h6>No Reviews Available</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;
