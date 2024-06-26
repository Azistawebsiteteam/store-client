import axios from "axios";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

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
        className="carousel slide"
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
              <Marquee
                speed={80}
                className="marque"
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
                    className="text"
                    style={{ color: each.announcement_text_color }}
                  >
                    {each.announcement_web_text}
                  </span>
                </Link>
              </Marquee>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
