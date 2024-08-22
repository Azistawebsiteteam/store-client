/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Rating from "@mui/material/Rating";
import axios from "axios";
import "./Components.css";
import ThreeDotsDropdown from "./ThreeDotsDropdown";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { MdDelete } from "react-icons/md";
import ErrorHandler from "./ErrorHandler";

const baseUrl = `${process.env.REACT_APP_API_URL}/reviews`;
const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

export const CreateReview = (props) => {
  const { productId, buttonText, reviewDetails } = props;
  const [value, setValue] = useState(1);
  const [reviewData, setReviewData] = useState({
    reviewTitle: "",
    reviewContent: "",
    reviewImg: [],
  });
  const [reviewImgFile, setReviewImgFile] = useState([]);

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
    setValue(review_points);
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
      formdata.append("reviewPoints", value);
      reviewId && formdata.append("reviewId", reviewId);
      ErrorHandler.onLoading();
      await axios.post(url, formdata, { headers });
      ErrorHandler.onSuccess();
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  const onClickReview = async (buttonText) => {
    if (buttonText === "Submit") {
      const url = `${baseUrl}/create/review`;
      onSubmitReview(url);
    } else {
      const url = `${baseUrl}/update/review`;
      onSubmitReview(url, reviewDetails?.review_id);
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
        <div className="starRating">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            precision={0.5}
          />
        </div>
        <div className="reviewTitle d-flex flex-column">
          <label htmlFor="reviewTitle">Title</label>
          <input
            id="reviewTitle"
            type="text"
            value={reviewData.reviewTitle}
            onChange={handleReviewForm}
          />
        </div>
        <div className="reviewSec d-flex flex-column mt-2">
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
        </div>
        <div className="uploadFiles d-flex flex-column mt-2">
          <label htmlFor="reviewImg" className="custom-file-upload">
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
    ErrorHandler.onError(error);
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

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await productReviews(productId);
      setReviews(reviews);
    };
    fetchReviews();
  }, [productId]);

  return (
    <div>
      {reviews.length > 1 && (
        <div className="reviewCont flex-column">
          <div className="col-md-12 d-flex flex-row justify-content-between align-items-center mb-5">
            <div className="">
              <h6>Reviews</h6>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <span>{getAvgReview(reviews)}</span>
                <span>
                  <Rating
                    name="read-only"
                    value={parseFloat(getAvgReview(reviews))}
                    precision={0.5}
                    readOnly
                    className="gold-stars individualRating me-1"
                  />
                </span>
                <span>
                  Based on <span>{reviews.length}</span> reviews
                </span>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <button
                type="button"
                className="reviewBtn"
                data-bs-toggle="modal"
                data-bs-target="#createReview"
              >
                Write a review
              </button>

              <div
                className="modal fade"
                id="createReview"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Review the product
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <CreateReview
                        productId={productId}
                        buttonText={"Submit"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {reviews.map((each, i) => (
              <div key={i} className="review m-3">
                <div className="d-flex justify-content-between">
                  <div className="editSec">
                    <Rating
                      name="read-only"
                      value={each.review_points}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  {userDetails?.azst_customer_id ===
                    parseInt(each.customer_id) && (
                    <ThreeDotsDropdown
                      productReviews={productReviews}
                      reviewDetails={each}
                      reviewId={reviews.review_id}
                    />
                  )}
                  {/* <span>{each.created_on}</span> */}
                </div>
                <div className="botSec">
                  {/* <h6>{each.review_title}</h6> */}
                  <p style={{ fontSize: "1rem", lineHeight: "1" }}>
                    {each.review_content}
                  </p>
                </div>
                <div className="displayIeviewImgsCont">
                  {each.review_images.map((img, i) => (
                    <img
                      key={i}
                      className="displayIeviewImg"
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
