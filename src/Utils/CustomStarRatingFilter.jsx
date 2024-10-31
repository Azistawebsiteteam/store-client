import React from "react";
import Select from "react-select";
import { IoIosStar } from "react-icons/io";
import "../Pages/CollectionsPage/index.css";

const options = [
  {
    value: 4,
    label: (
      <>
        4 <img src={`${process.env.PUBLIC_URL}/images/star.svg`} alt="Star" />{" "}
        and More
      </>
    ),
  },
  {
    value: 3,
    label: (
      <>
        3 <IoIosStar /> and More
      </>
    ),
  },
  {
    value: 2,
    label: (
      <>
        2 <IoIosStar /> and More
      </>
    ),
  },
  {
    value: 0,
    label: (
      <>
        1 <IoIosStar /> and More
      </>
    ),
  },
];

const DropdownIndicator = () => null;

const CustomStarRatingFilter = ({ handleStarRating, starRating }) => {
  return (
    <div className="col-6 col-md-2">
      <label htmlFor="ratings" className="form-label custFormlable">
        Customer Ratings
      </label>
      <Select
        id="ratings"
        className="form-select formSelect"
        styles={{
          control: (provided, state) => ({
            ...provided,
            boxShadow: state.isFocused ? "none" : provided.boxShadow,
            border: "none",
          }),
        }}
        onChange={(selectedOption) => handleStarRating(selectedOption.value)}
        value={options.find((option) => option.value === starRating)}
        options={options}
        components={{ DropdownIndicator }}
      />
    </div>
  );
};

export default CustomStarRatingFilter;
