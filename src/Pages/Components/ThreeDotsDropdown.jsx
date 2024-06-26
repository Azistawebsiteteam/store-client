import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

const ThreeDotsDropdown = ({ reviewDetails, productReviews }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const open = Boolean(anchorEl);
  const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option === "Delete") {
      deleteReview();
    } else {
      setModalShow(true);
    }
    setAnchorEl(null);
  };

  const editReview = () => {
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          reviewDetails={reviewDetails}
        />
      </>
    );
  };

  const deleteReview = async () => {
    try {
      const url = `${baseUrl}/reviews/delete/review`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      const { review_id } = reviewDetails;
      const response = await axios.post(
        url,
        { reviewId: review_id },
        { headers }
      );
      if (response.status === 200) {
        productReviews();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {modalShow && editReview()}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={(e) => handleClose(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotsDropdown;
