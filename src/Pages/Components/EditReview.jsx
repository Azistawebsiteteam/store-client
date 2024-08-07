import React from "react";
import Rating from "@mui/material/Rating";
import SideBar from "../UserDashboard/UserProfile/SideBar";

const EditReview = () => {
  const [value, setValue] = React.useState(2);

  return (
    <div className="bottomSec">
      <div className="d-flex">
        <SideBar />
        <div style={{ padding: "4% 3%", width: "40%" }}>
          <h5>Edit Review</h5>
          <small>
            Reviews & Ratings &gt;{" "}
            <span style={{ fontWeight: "500" }}>11 Feb, 2024</span>
          </small>
          <div className="d-flex align-items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/iscanBreast.png`}
              className="reviewImg"
              alt="isanBreast"
            />
            <small style={{ display: "inline-block" }}>
              <strong>
                bbold Dissolvable Microneedle Acne Patch | Your Clear Skin
                Savior | Pack of 1
              </strong>
            </small>
          </div>
          <span style={{ color: "#787878", display: "block" }}>
            Overall Rating
          </span>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            precision={0.5}
          />
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="headlineInput"
              placeholder="headline"
            />
            <label htmlFor="headlineInput">Headline</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="reviewTextInput"
              placeholder="Write a Review"
            />
            <label htmlFor="reviewTextInput">Write a Review</label>
          </div>
          <span style={{ color: "#787878", display: "block" }}>
            Photo or Video
          </span>
          <button className="reviewBtn mt-3">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
