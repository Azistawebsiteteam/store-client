import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <>
      <MdOutlineArrowBack
        width="1.4em"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(-1)}
      />
    </>
  );
};

export default BackBtn;
