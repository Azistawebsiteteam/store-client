import React from "react";
import "./index.css";
import CustomStarRatingFilter from "../../Utils/CustomStarRatingFilter";

const CollectionsTab = (props) => {
  const {
    filterAccDis,
    filteredValues,
    setFilteredValues,
    setStarRating,
    starRating,
  } = props;

  const handleStarRating = (value) => {
    setStarRating(value);
  };

  const handleFilters = (e) => {
    if (e.target.id === "discount") {
      filterAccDis(e.target.value);
    }
    setFilteredValues({ ...filteredValues, [e.target.id]: e.target.value });
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setFilteredValues({
      availability: "All",
      discount: "10",
      sortOrder: "DESC",
    });
    setStarRating(1);
  };
  return (
    <div className="CollectionsTabCont">
      <form className="row d-md-flex justify-content-md-center">
        <div className="col-md-2">
          <label htmlFor="inputState" className="custFormlable form-label">
            Filters:
          </label>
          <button
            style={{
              color: "rgba(230, 0, 0, 1)",
              border: "none",
              backgroundColor: "transparent",
              display: "block",
              fontWeight: "500",
            }}
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
        <div className="col-md-2">
          <label htmlFor="availability" className="form-label custFormlable">
            Availability
          </label>
          <select
            id="availability"
            className="form-select formSelect"
            onChange={handleFilters}
            value={filteredValues.availability}
          >
            <option value="inStock">Only In Stock</option>
            <option value="All">All</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="discount" className="form-label custFormlable">
            Discount
          </label>
          <select
            id="discount"
            className="form-select formSelect"
            onChange={handleFilters}
            value={filteredValues.discount}
          >
            <option value="10">10% Off or More</option>
            <option value="25">25% Off or More</option>
            <option value="30">30% Off or More</option>
            <option value="50">50% Off or More</option>
            <option value="60">60% Off or More</option>
            <option value="70">70% Off or More</option>
          </select>
        </div>
        <CustomStarRatingFilter
          handleStarRating={handleStarRating}
          starRating={starRating}
        />
        <div className="col-md-2">
          <label htmlFor="sortOrder" className="form-label custFormlable">
            Sort by 
          </label>
          <select
            id="sortOrder"
            className="form-select formSelect"
            onChange={handleFilters}
            value={filteredValues.sortOrder}
          >
            <option value="ASC">Price low to high</option>
            <option value="DESC">Price high to low</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CollectionsTab;
