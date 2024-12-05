import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import "./Customer.css";

const DropdownComponent = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="dropdownStyling">
        All Orders <MdOutlineKeyboardArrowDown size={20} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="">
          All Orders
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="">
          Placed Orders
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="">
          Returned Orders
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="">
          Cancelled Orders
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
