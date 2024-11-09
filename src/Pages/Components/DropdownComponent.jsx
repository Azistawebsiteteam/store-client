import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropdownComponent = () => {
  return (
    <li className="nav-item m-0 dropdown">
      <a
        className="nav-link dropdown-toggle mt-0"
        href="shobby"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        All Orders
        <MdOutlineKeyboardArrowDown size={20} />
      </a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        <li>
          <Link className="dropdown-item" to="Action">
            All Orders
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="Action">
            Placed Orders
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="Action">
            Returned Orders
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="Action">
            Cancelled Orders
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default DropdownComponent;
