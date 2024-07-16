import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Customer.css";

const Blogs = () => {
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
        console.log(error);
      }
    };
    getBlogContent();
  }, [baseUrl]);

  const firstElement = blogContent[0] || {};

  console.log(blogContent, "blog");

  return (
    <div className="blogCont">
      <div className="container">
        <div className="blogs">
          <div className="row">
            <div className="col-sm-12 d-md-flex align-items-md-center justify-content-md-between mb-3">
              <h3>Latest Blogs</h3>
              <Link className="linkBtn customLinkBtn" to={`/blogs`}>
                View All
              </Link>
            </div>
            <div className="col-sm-6">
              {Object.keys(firstElement).length > 0 && (
                <div className="card mainCustomCard">
                  <div className="blogImgCont">
                    <img
                      src={firstElement.azst_blg_img}
                      alt={firstElement.azst_blg_title}
                      className="card-img-top blogImg"
                    />
                    <p className="blogType">{firstElement.azst_blg_product}</p>
                    <div class="overlay" />
                  </div>
                  <div className="card-body customCardBody">
                    <small className="d-block text-light">
                      {firstElement.azst_blg_created}
                    </small>
                    <h5 className="card-title text-light">
                      {firstElement.azst_blg_title}
                    </h5>
                    <p className="card-text cardText text-light">
                      sdfsdfsdfsd sefsefsfdsfsd sdfsf sdfsf sdfsfs sdfsdfs
                      sdfsdfs sefsfsf sdfsdfsd Include every Bootstrap
                      JavaScript plugin and dependency with one of our
                    </p>
                    <Link to="/somewhere" className="readmoreLink text-light">
                      Read More
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="col-sm-6 d-md-flex flex-md-column justify-content-md-between">
              {blogContent.slice(1).map((each, i) => (
                <div className="card customCard" key={i}>
                  <div className="blogImg">
                    <img
                      src={each.azst_blg_img}
                      alt={each.azst_blg_title}
                      className="card-img-top blogImg"
                    />
                    <p className="blogType">{each.azst_blg_product}</p>
                  </div>
                  <div className="card-body  d-md-flex flex-md-column justify-content-md-between">
                    <div className="">
                      <small className="d-block">{each.azst_blg_created}</small>
                      <h5 className="card-title">{each.azst_blg_title}</h5>
                      <p className="card-text cardText">
                        sdfsdfsdfsd sefsefsfdsfsd sdfsf sdfsf sdfsfs sdfsdfs
                        sdfsdfs sefsfsf sdfsdfsd Include every Bootstrap
                        JavaScript plugin and dependency with one of our
                      </p>
                    </div>
                    <div className="">
                      <Link to="/somewhere" className="readmoreLink">
                        Read More
                      </Link>
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

export default Blogs;
