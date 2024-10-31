import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <>
      <FiArrowLeft
        size={20}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(-1)}
      />
    </>
  );
};

export default BackBtn;
