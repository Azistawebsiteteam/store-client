/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";
import Rating from "@mui/material/Rating";
import axios from "axios";
import "./Components.css";
import ThreeDotsDropdown from "./ThreeDotsDropdown";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { MdDelete } from "react-icons/md";

const baseUrl = `${process.env.REACT_APP_API_URL}/reviews`;
const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

export const CreateReview = (props) => {
  const { productId, buttonText, reviewDetails } = props;
  const [currentVal, setCurrenVal] = useState(0);
  const [hoverVal, setHoverVal] = useState(undefined);
  const [reviewData, setReviewData] = useState({
    reviewTitle: "",
    reviewContent: "",
    reviewImg: [],
  });
  const [reviewImgFile, setReviewImgFile] = useState([]);

  let stars = Array(5).fill(0);

  const handleStarClick = (value) => {
    setCurrenVal(value);
  };

  const handleMouseHover = (value) => {
    setHoverVal(value);
  };

  const handleMouseRemove = () => {
    setHoverVal(undefined);
  };

  const handleReviewForm = (e) => {
    const { id, value, files } = e.target;

    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setReviewData({
        ...reviewData,
        reviewImg: [...reviewData.reviewImg, ...newFiles],
      });
    } else {
      setReviewData({ ...reviewData, [id]: value });
    }
  };

  useEffect(() => {
    if (!reviewDetails) return;
    const { review_title, review_content, review_images, review_points } =
      reviewDetails;
    setReviewData({
      reviewTitle: review_title,
      reviewContent: review_content,
      reviewImg: review_images,
    });
    setCurrenVal(review_points);
  }, [reviewDetails]);

  const onSubmitReview = async (url, reviewId) => {
    try {
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const formdata = new FormData();

      const objLen = reviewData.reviewImg.length;
      for (let i = 0; i < objLen; i++) {
        const img = reviewData.reviewImg[i];
        formdata.append("reviewImages", img);
      }

      formdata.append("productId", productId);
      formdata.append("reviewTitle", reviewData.reviewTitle);
      formdata.append("reviewContent", reviewData.reviewContent);
      formdata.append("reviewPoints", currentVal);
      reviewId && formdata.append("reviewId", reviewId);

      const response = await axios.post(url, formdata, { headers });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickReview = async (buttonText) => {
    if (buttonText === "submit") {
      const url = `${baseUrl}/create/review`;
      onSubmitReview(url);
    } else {
      const url = `${baseUrl}/update/review`;
      onSubmitReview(url, reviewDetails.review_id);
    }
  };

  const handleReviewImg = (e, id) => {
    if (e.target.checked) {
      setReviewImgFile((prev) => [...prev, id]);
    } else {
      let selected = reviewImgFile.filter((each) => each !== id);
      setReviewImgFile(selected);
    }
  };

  const deleteReviewImg = () => {
    let filteredReviewImgs = reviewData.reviewImg.filter(
      (img, i) => !reviewImgFile.includes(i)
    );

    setReviewData({
      ...reviewData,
      reviewImg: filteredReviewImgs,
    });
  };

  return (
    <div className="writeReview d-flex flex-column align-items-center">
      <div className="ratingSec d-flex flex-column">
        <h6>Rating</h6>
        <div className="starRating">
          {stars.map((_, i) => (
            <FaStar
              key={i}
              onClick={() => handleStarClick(i + 1)}
              onMouseOver={() => handleMouseHover(i + 1)}
              onMouseLeave={handleMouseRemove}
              color={(hoverVal || currentVal) > i ? "gold" : "black"}
              precision={0.5}
            />
          ))}
        </div>
        <div className="reviewTitle d-flex flex-column">
          <label htmlFor="reviewTitle">Review Title</label>
          <input
            id="reviewTitle"
            type="text"
            value={reviewData.reviewTitle}
            onChange={handleReviewForm}
          />
        </div>
        <div className="reviewSec d-flex flex-column">
          <label htmlFor="review">Review</label>
          <textarea
            id="reviewContent"
            rows={4}
            cols={50}
            onChange={handleReviewForm}
            value={reviewData.reviewContent}
          ></textarea>
        </div>
        <div className="reviewImgsSection">
          <div className="dltReviewImgBtn">
            {reviewImgFile.length > 0 && (
              <MdDelete onClick={deleteReviewImg} className="dltImgBtn" />
            )}
          </div>
          <div className="reviewImgsCont">
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
        </div>
        <div className="uploadFiles d-flex flex-column align-items-center">
          <h6>Picture</h6>
          <input
            className="m-auto"
            id="reviewImg"
            multiple
            type="file"
            onChange={handleReviewForm}
          />
        </div>
        <button
          className="reviewBtn"
          onClick={(e) => onClickReview(buttonText)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const productReviews = async (productId) => {
  try {
    const url = `${baseUrl}/product`;
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    const response = await axios.post(
      url,
      { productId: productId },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAvgReview = (reviews) => {
  if (reviews) {
    const totalReview = reviews.reduce((acc, r) => acc + r.review_points, 0);
    const avgReview = (totalReview / reviews.length).toFixed(1);
    return avgReview;
  }
  return 0;
};

export const DisplayReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const { userDetails } = useContext(searchResultContext);

  const [review, setReview] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await productReviews(productId);
      setReviews(reviews);
    };
    fetchReviews();
  }, [productId]);

  return (
    <div>
      {reviews && (
        <div className="reviewCont flex-column">
          <div className="col-md-12 d-flex flex-row justify-content-between align-items-center mb-5">
            <div className="">
              <h6>Reviews</h6>
              <div className="flex-row align-items-center">
                {getAvgReview(reviews)}
                <Rating
                  name="read-only"
                  value={parseFloat(getAvgReview(reviews))}
                  precision={0.5}
                  readOnly
                  className="gold-stars individualRating me-1"
                />
                Based on <span> {reviews.length}</span> reviews
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <button
                value={review}
                onClick={() => setReview(!review)}
                className="reviewBtn"
              >
                {review ? "Cancel review" : "Write a review"}
              </button>
              {review && (
                <>
                  <CreateReview productId={productId} buttonText={"submit"} />
                  <div className="mt-2">
                    <button
                      className="reviewBtn"
                      onClick={() => setReview(!review)}
                    >
                      Cancel review
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {reviews.map((each, i) => (
              <div key={i} className="review m-3">
                <div className="topSec">
                  <div className="editSec">
                    <Rating
                      name="read-only"
                      value={each.review_points}
                      precision={0.5}
                      readOnly
                    />
                    {userDetails?.azst_customer_id ===
                      parseInt(each.customer_id) && (
                      <ThreeDotsDropdown
                        productReviews={productReviews}
                        reviewDetails={each}
                        reviewId={reviews.review_id}
                      />
                    )}
                  </div>
                  <span>{each.created_on}</span>
                </div>
                <div className="botSec">
                  {/* <h6>{each.review_title}</h6> */}
                  <p>{each.review_content}</p>
                </div>
                <div className="reviewImgsCont">
                  {each.review_images.map((img, i) => (
                    <img
                      key={i}
                      className="reviewImg"
                      src={img}
                      alt="reviewImg"
                    />
                  ))}
                </div>
                <p style={{ fontWeight: "500" }}>
                  {each.azst_customer_fname} {each.azst_customer_lname}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductRating = ({ productId }) => {
  const [reviewsCount, setReviewsCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await productReviews(productId);
      setReviews(reviews);
      const reviewCount = reviews ? reviews.length : 0;
      setReviewsCount(reviewCount);
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="d-flex align-items-center">
      {reviewsCount > 0 ? (
        <>
          {" "}
          <Rating
            name="read-only"
            value={parseFloat(getAvgReview(reviews))}
            precision={0.5}
            readOnly
            className="gold-stars me-1"
          />
          <span> ({reviewsCount})</span>{" "}
        </>
      ) : null}
    </div>
  );
};
