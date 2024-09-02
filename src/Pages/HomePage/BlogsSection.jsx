import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Components/Customer.css";
import "../Components/Components.css";
import ErrorHandler from "../Components/ErrorHandler";

const BlogsSection = () => {
  const [blogContent, setBlogContent] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getBlogContent = async () => {
      try {
        const url = `${baseUrl}/blogs/customer`;
        const response = await axios.get(url);
        const { blogs } = response.data;
        setBlogContent(blogs);
      } catch (error) {
        ErrorHandler.onError(error);
      }
    };
    getBlogContent();
  }, [baseUrl]);

  const firstElement = blogContent[0] || {};

  return (
    <div className="blogCont">
      <div className="container">
        <div className="blogs">
          <div className="row">
            <div className="col-sm-12 d-md-flex align-items-md-center justify-content-md-between mb-3">
              <h4>Latest Blogs</h4>
              <Link className="linkBtn customLinkBtn" to={`/blogs`}>
                View All
              </Link>
            </div>
            <div className="col-sm-6">
              {Object.keys(firstElement).length > 0 && (
                <div className="card mainCustomCard">
                  <div className="blogImgCont">
                    <img
                      src={firstElement.azst_blg_thumbnail_img}
                      alt={firstElement.azst_blg_title}
                      className="card-img-top blogImg mainImgOverlay"
                    />
                    <p className="blogType mainBlog">
                      {firstElement.azst_blg_product}
                    </p>
                  </div>
                  <div className="card-body customCardBody">
                    <small className="d-block text-light">
                      {firstElement.azst_blg_created}
                    </small>
                    <h5 className="card-title text-light">
                      {firstElement.azst_blg_title}
                    </h5>
                    <p className="card-text cardText text-light">
                      {firstElement.azst_blg_description}
                    </p>
                    <Link
                      to={`/blogsInner/${firstElement.azst_blg_id}`}
                      className="readmoreLink text-light"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="col-sm-6 d-md-flex flex-md-column justify-content-md-between">
              {blogContent.slice(1, 3).map((each, i) => (
                <div className="blogItem" key={i}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="blogImgCont">
                        <img
                          src={each.azst_blg_thumbnail_img}
                          alt={each.azst_blg_title}
                          className="card-img-top "
                        />
                        <p className="blogType subBlog">
                          {each.azst_blg_product}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="cardBody  d-md-flex flex-md-column justify-content-md-between"
                        style={{ height: "100%" }}
                      >
                        <div className="">
                          <small className="d-block">
                            {each.azst_blg_created}
                          </small>
                          <h5 className="card-title">{each.azst_blg_title}</h5>
                          <p className="card-text cardText">
                            {each.azst_blg_description}
                          </p>
                        </div>
                        <div className="">
                          <Link
                            to={`/blogsInner/${each.azst_blg_id}`}
                            className="readmoreLink"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
