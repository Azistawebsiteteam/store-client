import React from "react";
import Rating from "@mui/material/Rating";
import SideBar from "./UserProfile/SideBar";

const EditReview = () => {
  const [value, setValue] = React.useState(2);
  // const handleReviewForm = (e) => {
  //   const { id, value, files } = e.target;

  //   if (files && files.length > 0) {
  //     const newFiles = Array.from(files);
  //     setReviewData({
  //       ...reviewData,
  //       reviewImg: [...reviewData.reviewImg, ...newFiles],
  //     });
  //   } else {
  //     setReviewData({ ...reviewData, [id]: value });
  //   }
  // };

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
              style={{ width: "20%" }}
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
          {/* <div className="uploadFiles d-flex flex-column mt-2">
            <label htmlFor="reviewImg" class="custom-file-upload">
              Upload image
            </label>
            <input
              id="reviewImg"
              multiple
              type="file"
              onChange={handleReviewForm}
            />
            <div className="reviewImgsCont mt-1 mb-2">
              {Array.from(reviewData.reviewImg).map((img, i) =>
                typeof img === "string" ? (
                  <div className="selectImg" key={i}>
                    <img className="reviewImg" src={img} alt="reviewImg" />
                    <input
                      type="checkbox"
                      id="chooseRviewImg"
                      className={
                        reviewImgFile.length > 0
                          ? "selectImgInput"
                          : "hideImgInput"
                      }
                      checked={reviewImgFile.includes(i)}
                      onClick={(e) => handleReviewImg(e, i)}
                    />
                  </div>
                ) : (
                  <div className="selectImg" key={i}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Banner"
                      className="reviewImg"
                      checked={reviewImgFile.includes(i)}
                      onClick={(e) => handleReviewImg(e, i)}
                    />
                    <input
                      type="checkbox"
                      id="chooseRviewImg"
                      className={
                        reviewImgFile.length > 0
                          ? "selectImgInput"
                          : "hideImgInput"
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div> */}
          <button className="reviewBtn mt-3">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
