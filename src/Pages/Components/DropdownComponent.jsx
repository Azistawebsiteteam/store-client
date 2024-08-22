import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownComponent = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
        All Orders
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
