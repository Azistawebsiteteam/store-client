import React from "react";

const SocialIcons = () => {
  const imageUrl = process.env.PUBLIC_URL;

  return (
    <div>
      <a
        href="https://www.facebook.com/Azistastore-110936125083262"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${imageUrl}/images/facebook.svg`}
          className="social_icon"
          alt="facebook"
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
        />
      </a>
    </div>
  );
};

export default SocialIcons;
