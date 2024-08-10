import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "../../Utils/ScrollToTop";

const BlogsInnerPage = () => {
  const [blogData, setBlogData] = useState({});

  const { id } = useParams();

  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const blogsData = useCallback(async () => {
    const url = `${baseUrl}/blogs/customer`;
    const body = {
      id: id,
    };
    const response = await axios.post(url, body);
    if (response.status === 200) {
      setBlogData(response.data);
    }
  }, [baseUrl, id]);

  useEffect(() => {
    blogsData();
  }, [blogsData]);

  console.log(blogData, "blogData");

  return (
    <>
      <ScrollToTop />
      <div className="userPage">
        <div className="container">
          {Object.keys(blogData).length > 1 && (
            <div className="blogsInnerPage">
              <BsArrowLeftCircle
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              <h3 className="blogHeading">{blogData.azst_blg_title}</h3>
              <p class="innerblogType">{blogData.azst_blg_product}</p>
              <div className="">
                <img
                  src={blogData.azst_blg_img}
                  alt={blogData.azst_blg_title}
                  className="blogMainImg"
                />
              </div>
              <p>{blogData.azst_blg_description}</p>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${blogData.azst_blg_content}`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsInnerPage;
