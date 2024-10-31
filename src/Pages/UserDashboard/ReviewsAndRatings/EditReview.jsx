import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import SideBar from "../UserProfile/SideBar";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import ErrorHandler from "../../Components/ErrorHandler";
import axios from "axios";
import BackBtn from "../../Components/BackBtn";
import { BsPlus } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const EditReview = () => {
  const [review, setReview] = useState({
    rating: 0,
    reviewTitle: "",
    reviewContent: "",
    reviewImgs: [],
    createdOn: "",
    productId: "",
    productTitle: "",
    productImage: "",
    urlHandle: "",
  });

  const [reviewImgFile, setReviewImgFile] = useState([]);

  const location = useLocation();
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);
  const { id } = location.state || 0;
  useEffect(() => {
    try {
      const fetchReview = async () => {
        const url = `${baseUrl}/reviews/review/${id}`;
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
        ErrorHandler.onLoading();
        const response = await axios.get(url, { headers });

        ErrorHandler.onLoadingClose();
        const output = response.data;
        setReview({
          createdOn: output.created_on,
          productId: output.product_id,
          productImage: output.product_image,
          productTitle: output.product_title,
          reviewContent: output.review_content,
          reviewImgs: output.review_images,
          rating: output.review_points,
          reviewTitle: output.review_title,
          urlHandle: output.url_handle,
        });
      };
      fetchReview();
    } catch (error) {
      ErrorHandler.onError(error);
    }
  }, [id, baseUrl, jwtToken]);

  const handleReviewForm = (e) => {
    const { id, value, files } = e.target;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setReview({
        ...review,
        reviewImgs: [...review.reviewImgs, ...newFiles],
      });
    } else {
      setReview({ ...review, [id]: value });
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

  const handleReviewFormChange = (e) => {
    setReview({ ...review, [e.target.id]: e.target.value });
  };

  const setRating = (rating) => {
    setReview({ ...review, rating: rating });
  };

  const onSubmitReview = async () => {
    try {
      const url = `${baseUrl}/reviews/update/review`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const formdata = new FormData();

      const objLen = review.reviewImgs.length;
      console.log(objLen);
      for (let i = 0; i < objLen; i++) {
        const img = review.reviewImgs[i];
        formdata.append("reviewImages", img);
      }

      formdata.append("productId", review.productId);
      formdata.append("reviewTitle", review.reviewTitle);
      formdata.append("reviewContent", review.reviewContent);
      formdata.append("reviewPoints", review.rating);
      formdata.append("reviewId", id);
      ErrorHandler.onLoading();
      await axios.post(url, formdata, { headers });
      ErrorHandler.onSuccess();
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  const onDeleteImg = () => {
    const updatedReviewImgs = review.reviewImgs.filter(
      (_, index) => !reviewImgFile.includes(index)
    );
    setReview({
      ...review,
      reviewImgs: updatedReviewImgs,
    });

    setReviewImgFile([]);
  };

  console.log(review);

  return (
    <div className="bottomSec">
      <div className="d-flex">
        <SideBar />
        <div className="myAccount_right_sec" style={{ width: "40%" }}>
          <BackBtn />
          <h5 className="mb-0">Edit Review</h5>
          <small>
            Reviews & Ratings &gt;{" "}
            <span style={{ fontWeight: "500" }}>{review.createdOn}</span>
          </small>
          <div className="d-flex align-items-center mt-2 mb-2">
            <img
              src={review.productImage}
              style={{ width: "20%" }}
              alt="productImage"
              onChange={handleReviewFormChange}
            />
            <small className="ms-3" style={{ display: "inline-block" }}>
              <strong>{review.productTitle}</strong>
            </small>
          </div>
          <span style={{ color: "#787878", display: "block" }}>
            Overall Rating
          </span>
          <Rating
            name="simple-controlled"
            value={review.rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            precision={0.5}
            className="reviewEditPgStarIcon"
          />
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control reviewTxt"
              id="reviewTitle"
              placeholder="headline"
              value={review.reviewTitle}
              onChange={handleReviewFormChange}
            />
            <label htmlFor="headlineInput">Headline</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control reviewTxt"
              id="reviewContent"
              placeholder="Write a Review"
              value={review.reviewContent}
              onChange={handleReviewFormChange}
            />
            <label htmlFor="reviewTextInput">Write a Review</label>
          </div>
          <span style={{ color: "#787878", display: "block" }}>
            Photo or Video
          </span>
          <div className="reviewImgsCont">
            <div className="d-flex align-items-center">
              <div className="reviewImgsCont mt-1 mb-2">
                {review.reviewImgs.map((img, i) =>
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
                        onChange={(e) => handleReviewImg(e, i)}
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
              <div className="uploadFiles mt-1 mb-2">
                <div className="imgUploadIcon">
                  <label htmlFor="reviewImg" className="custom-file-upload">
                    Upload image
                  </label>
                  <input
                    id="reviewImg"
                    multiple
                    type="file"
                    onChange={handleReviewForm}
                  />
                </div>
                <BsPlus size={30} />
              </div>
            </div>
            {reviewImgFile.length > 0 && (
              <div className="d-flex justify-content-start align-items-start ms-2">
                <MdDelete
                  size={20}
                  className="d-block"
                  fill="red"
                  onClick={onDeleteImg}
                />
              </div>
            )}
          </div>
          <button className="commonBtn mt-3" onClick={onSubmitReview}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
