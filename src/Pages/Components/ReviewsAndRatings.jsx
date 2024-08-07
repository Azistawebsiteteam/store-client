import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Rating from "@mui/material/Rating";
import SideBar from "../UserDashboard/UserProfile/SideBar";
import { Link } from "react-router-dom";

const ReviewsAndRatings = () => {
  const [value, setValue] = React.useState(2);
  const [reviewBtn, setReviewBtn] = useState(false);
  const onHandleReviewBtn = () => {
    setReviewBtn(!reviewBtn);
  };

  return (
    <div className="bottomSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccount_right_sec">
          <h5>Reviews & Ratings</h5>
          <div
            className="myAccReviewCont"
            style={{
              maxWidth: "16rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <img src="" alt="" />
              <small>
                <strong>
                  Reviewed on
                  <br />
                  11 Feb 2024
                </strong>
              </small>
              <div className="dropdownMenuCont">
                <button
                  onClick={onHandleReviewBtn}
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <HiOutlineDotsVertical />
                </button>
                {reviewBtn && (
                  <div class="dropdownMenu">
                    <Link to={"/edit-review"} className="dropdownItem linkBtn">
                      Edit
                    </Link>
                    <span class="dropdownItem">Delete</span>
                  </div>
                )}
              </div>
            </div>
            <Rating name="read-only" value={value} precision={0.5} readOnly />
            <small>
              <strong>Cool Product. Affordable Price</strong>
            </small>
            <small>Cool Product. Affordable Price</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
