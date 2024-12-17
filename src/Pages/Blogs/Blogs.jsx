/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import ButtonRow from "../Components/ButtonRow";
import { Link } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../../Utils/ScrollToTop";
import "./Blogs.css";

const Blogs = () => {
  const [blogsTypes, setBlogTypes] = useState(["All Blogs"]);
  const [blogs, setBlogs] = useState([]);
  const [filterBlogs, setFilterBlogs] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  const blogsData = useCallback(async () => {
    const url = `${baseUrl}/blogs/customer`;
    const response = await axios.get(url);
    if (response.status === 200) {
      const { blogTypes, blogs } = response.data;

      setBlogTypes((prevBlogTypes) => [...prevBlogTypes, ...blogTypes]);
      setBlogs(blogs);
      setFilterBlogs(blogs);
    }
  }, [baseUrl]);

  useEffect(() => {
    blogsData();
  }, [blogsData]);

  const onChangeBlogType = (blog) => {
    if (blog === "All Blogs") {
      setFilterBlogs(blogs);
    } else {
      const flBlogs = blogs.filter((each) => each.azst_blg_type === blog);
      setFilterBlogs(flBlogs);
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="userPage">
        <div className="blogsPage">
          <h3 className="text-center">
            Exploring the Uncharted:
            <br /> Insights, Ideas, and Inspiration
          </h3>
          <p className="text-center" style={{ color: "#717171" }}>
            It is a long established fact that a reader will be distracted by
            the readable <br />
            content of a page when looking at its layout.
          </p>
          <ButtonRow
            items={blogsTypes}
            handleChange={onChangeBlogType}
            defaultItem={"All Blogs"}
          />
          <div className="container">
            <div className="row">
              {filterBlogs.map((each, i) => (
                <div className="col-md-6">
                  <div className="blogPgItem" key={i}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="blogImgCont">
                          <img
                            src={each.azst_blg_thumbnail_img}
                            alt={each.azst_blg_title}
                            className="card-img-top customBlogPgImg"
                          />
                          <p className="blogType subBlog">
                            {each.azst_blg_product}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ height: "100%" }}>
                          <div className="blogCardBody d-md-flex flex-md-column justify-content-md-between">
                            <div className="">
                              <small className="d-block">
                                {each.azst_blg_created}
                              </small>
                              <h5 className="card-title blogTitle">
                                {each.azst_blg_title}
                              </h5>
                              <p
                                className="card-text cardText"
                                style={{ color: "#717171" }}
                              >
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
