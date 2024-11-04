import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "../../Utils/ScrollToTop";
import "./Blogs.css";

const BlogsInnerPage = () => {
  const [blogData, setBlogData] = useState({});

  const { id } = useParams();
  const imageUrl = process.env.PUBLIC_URL;

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

  return (
    <>
      <ScrollToTop />
      <div className="userPage">
        <div className="container">
          {Object.keys(blogData).length > 1 && (
            <div className="blogsInnerPage">
              <img
                src={`${process.env.PUBLIC_URL}/images/arrowLeftBtn.svg`}
                alt="arrowLeft"
                style={{ cursor: "pointer", width: "46px" }}
                onClick={() => navigate(-1)}
              />
              <h3 className="blogHeading">{blogData.azst_blg_title}</h3>
              <p className="innerblogType">{blogData.azst_blg_product}</p>
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
          <div className="blogPgSocialIconsCont">
            <a
              href="https://www.facebook.com/Azistastore-110936125083262"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${imageUrl}/images/facebookColouredIcon.svg`}
                className="blogPgSocialIcon"
                alt="facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/azistastore/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${imageUrl}/images/instagramColouredIcon.svg`}
                className="blogPgSocialIcon"
                alt="instagram"
              />
            </a>
            <a
              href="https://twitter.com/AzistaStore"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${imageUrl}/images/twitterColouredIcon.svg`}
                className="blogPgSocialIcon"
                alt="twitter"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCvl0776om6DXpwIwSE225jQ"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${imageUrl}/images/youtube.svg`}
                className="blogPgSocialIcon"
                alt="youtube"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsInnerPage;
