import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Rating from "@mui/material/Rating";
import SideBar from "./UserProfile/SideBar";

import { searchResultContext } from "../../ReactContext/SearchResults";
import axios from "axios";
import ThreeDotsDropdown from "../Components/ThreeDotsDropdown";

const ReviewsAndRatings = () => {
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

  return (
    <div className="bottomSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccount_right_sec">
          <h5>Reviews & Ratings</h5>
          {reviews.length !== 0
            ? reviews.map((review, i) => (
                <div
                  className="myAccReviewCont"
                  style={{
                    maxWidth: "18rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  key={review.review_id}
                >
                  <div className="d-flex justify-content-between align-items-start mt-1 mb-1">
                    {
                      <img
                        src={review.product_image}
                        style={{ width: "26%" }}
                        alt="productImage"
                      />
                    }
                    <small>
                      <strong>
                        Reviewed on
                        <br />
                        {review.created_on}
                      </strong>
                    </small>
                    <div className="dropdownMenuCont">
                      <ThreeDotsDropdown reviewId={review.review_id} />
                    </div>
                  </div>
                  <Rating
                    name="read-only"
                    value={review.review_points}
                    precision={0.5}
                    readOnly
                  />
                  <small>
                    <strong>{review.review_title}</strong>
                  </small>
                  <small>{review.review_content}</small>
                </div>
              ))
            : "No Reviews Available"}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
