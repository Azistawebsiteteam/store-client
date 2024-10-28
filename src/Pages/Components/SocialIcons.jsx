import React from "react";

const SocialIcons = ({ width }) => {
  const imageUrl = process.env.PUBLIC_URL;

  return (
    <div className="footerSocialIcons">
      <a
        href="https://www.facebook.com/Azistastore-110936125083262"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${imageUrl}/images/facebook.svg`}
          className="social_icon"
          alt="facebook"
          style={{ width: `${width}rem` }}
        />
      </a>
      <a
        href="https://www.instagram.com/azistastore/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${imageUrl}/images/instagram.svg`}
          className="social_icon"
          alt="instagram"
          style={{ width: `${width}rem` }}
        />
      </a>
      <a
        href="https://twitter.com/AzistaStore"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${imageUrl}/images/twitter.svg`}
          className="social_icon"
          alt="twitter"
          style={{ width: `${width}rem` }}
        />
      </a>
      <a
        href="https://www.youtube.com/channel/UCvl0776om6DXpwIwSE225jQ"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${imageUrl}/images/youtube.svg`}
          className="social_icon"
          alt="youtube"
          style={{ width: `${width}rem` }}
        />
      </a>
    </div>
  );
};

export default SocialIcons;
