import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import SideBar from '../UserProfile/SideBar';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorHandler from '../../Components/ErrorHandler';
import axios from 'axios';
import BackBtn from '../../Components/BackBtn';
import { BsPlus } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import ScrollToTop from '../../../Utils/ScrollToTop';
import { handleValidationErrors } from '../../Components/ReviewsValidation';

const EditReview = () => {
  const [review, setReview] = useState({
    rating: 0,
    reviewTitle: '',
    reviewContent: '',
    reviewImgs: [],
    createdOn: '',
    productId: '',
    productTitle: '',
    productImage: '',
    urlHandle: '',
  });

  const [reviewImgFile, setReviewImgFile] = useState([]);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_API_URL;
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);
  const { id } = location.state || 0;
  const navigate = useNavigate();

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
      const remainingSlots = 5 - review.reviewImgs.length;
      if (remainingSlots === 0) {
        return alert('Cannot add more images. Maximum of 5 images allowed.');
      }
      if (remainingSlots > 0) {
        const newFiles = Array.from(files);
        setReview({
          ...review,
          reviewImgs: [...review.reviewImgs, ...newFiles],
        });
      } else {
        setReview({ ...review, [id]: value });
        setErrors({ ...errors, [id]: value });
      }
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
    const inputValues = {
      reviewTitle: review.reviewTitle,
      reviewContent: review.reviewContent,
    };
    const validationErrors = handleValidationErrors(inputValues);
    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo(0, 0);
      setErrors(validationErrors);
      return;
    }
    try {
      const url = `${baseUrl}/reviews/update/review`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const formdata = new FormData();

      const objLen = review.reviewImgs.length;
      for (let i = 0; i < objLen; i++) {
        const img = review.reviewImgs[i];
        formdata.append('reviewImages', img);
      }

      formdata.append('productId', review.productId);
      formdata.append('reviewTitle', review.reviewTitle);
      formdata.append('reviewContent', review.reviewContent);
      formdata.append('reviewPoints', review.rating);
      formdata.append('reviewId', id);
      ErrorHandler.onLoading();
      await axios.post(url, formdata, { headers });
      ErrorHandler.onSuccess();
      navigate(-1);
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  const onDeleteImg = () => {
    let filteredReviewImgs = review.reviewImgs.filter(
      (img, i) => !reviewImgFile.includes(i)
    );

    setReview({
      ...review,
      reviewImgs: filteredReviewImgs,
    });
  };

  return (
    <>
      <ScrollToTop />
      <div className='bottomSec'>
        <div className='d-flex'>
          <SideBar />
          <div
            className='myAccount_right_sec reviewsContSec'
            style={{ width: '40%' }}>
            <BackBtn />
            <h5 className='mb-0'>Edit Review</h5>
            <small>
              Reviews & Ratings &gt;{' '}
              <span style={{ fontWeight: '500' }}>{review.createdOn}</span>
            </small>
            <div className='d-flex align-items-center mt-2 mb-2'>
              <img
                src={review.productImage}
                style={{ width: '20%' }}
                alt='productImage'
                onChange={handleReviewFormChange}
              />
              <small className='ms-3' style={{ display: 'inline-block' }}>
                <strong>{review.productTitle}</strong>
              </small>
            </div>
            <span style={{ color: '#787878', display: 'block' }}>
              Overall Rating
            </span>
            <Rating
              name='simple-controlled'
              value={review.rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5}
              className='reviewEditPgStarIcon'
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'rgba(0, 128, 96, 1)', // Color for filled stars
                },
                '& .MuiRating-iconEmpty': {
                  color: 'lightgray', // Color for empty stars
                },
              }}
            />
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control reviewTxt'
                id='reviewTitle'
                placeholder='headline'
                value={review.reviewTitle}
                onChange={handleReviewFormChange}
                maxLength='80'
              />
              <label htmlFor='headlineInput'>Headline</label>
              {errors.reviewTitle && (
                <span className='error'>{errors.reviewTitle}</span>
              )}
            </div>
            <div className='form-floating'>
              <textarea
                type='text'
                className='form-control reviewTxt'
                id='reviewContent'
                placeholder='Write a Review'
                value={review.reviewContent}
                onChange={handleReviewFormChange}
                maxLength='500'
                rows={7}></textarea>
              <label htmlFor='reviewTextInput'>Write a Review</label>
              {errors.reviewContent && (
                <span className='error'>{errors.reviewContent}</span>
              )}
            </div>
            <span style={{ color: '#787878', display: 'block' }}>
              Photo or Video
            </span>
            <div className='reviewImgsContSec'>
              <div
                className='d-flex align-items-center'
                style={{ maxWidth: '100%' }}>
                <div className='reviewImgsCont mt-1 mb-2'>
                  {review.reviewImgs.map((img, i) =>
                    typeof img === 'string' ? (
                      <div className='selectImg' key={i}>
                        <img className='reviewImg' src={img} alt='reviewImg' />
                        <input
                          type='checkbox'
                          id='chooseRviewImg'
                          className={
                            reviewImgFile.length > 0
                              ? 'selectImgInput'
                              : 'hideImgInput'
                          }
                          checked={reviewImgFile.includes(i)}
                          onChange={(e) => handleReviewImg(e, i)}
                        />
                      </div>
                    ) : (
                      <div className='selectImg' key={i}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt='Banner'
                          className='reviewImg'
                          checked={reviewImgFile.includes(i)}
                          onClick={(e) => handleReviewImg(e, i)}
                        />
                        <input
                          type='checkbox'
                          id='chooseRviewImg'
                          className={
                            reviewImgFile.length > 0
                              ? 'selectImgInput'
                              : 'hideImgInput'
                          }
                        />
                      </div>
                    )
                  )}
                </div>
                <div className='uploadFiles mt-1 mb-2'>
                  <div className='imgUploadIcon'>
                    <label htmlFor='reviewImg' className='custom-file-upload'>
                      Upload image
                    </label>
                    <input
                      id='reviewImg'
                      multiple
                      type='file'
                      onChange={handleReviewForm}
                    />
                  </div>
                  <BsPlus size={30} />
                </div>
              </div>
              {reviewImgFile.length > 0 && (
                <div className='d-flex justify-content-start align-items-start ms-2'>
                  <MdDelete
                    size={20}
                    className='d-block'
                    onClick={onDeleteImg}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>
            <button className='myAccSecBtn mt-3' onClick={onSubmitReview}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditReview;
