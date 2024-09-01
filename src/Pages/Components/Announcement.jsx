import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiArrowRight, TiArrowLeft } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./Customer.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAnnouncementText = async () => {
      try {
        const url = `${baseUrl}/announcement/data`;
        const response = await axios.get(url);
        setAnnouncements(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAnnouncementText();
  }, [baseUrl]);

  return (
    <div className="announcements">
      <div
        id="marqueeCarousel"
        className="carousel slide customAnnouncementBar"
        data-bs-ride="carousel"
        data-bs-interval="13500"
      >
        <div className="carousel-inner">
          {announcements.map((each, i) => (
            <div
              className={`carousel-item ${i === 0 ? "active" : ""}`}
              id={i}
              key={i}
            >
              <div
                className="AnnouncementSlider"
                style={{
                  backgroundColor: `${each.announcement_background_color}`,
                }}
              >
                <Link
                  to={each.announcement_web_link}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <span
                    className="announcement-text"
                    style={{ color: each.announcement_text_color }}
                  >
                    {each.announcement_web_text}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {announcements.length > 1 && (
          <div className="btnCont">
            <button
              className="carousel-control-prev announcementSlideBtns"
              type="button"
              data-bs-target="#marqueeCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true">
                <TiArrowLeft className="announcementArrow" />
              </span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next announcementSlideBtns"
              type="button"
              data-bs-target="#marqueeCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true">
                <TiArrowRight className="announcementArrow" />
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
