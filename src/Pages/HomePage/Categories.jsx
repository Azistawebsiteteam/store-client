import React from "react";
import { Link } from "react-router-dom";
import "../Components/Customer.css";

const Categories = ({ categories, type, closeCategories, breakpoint }) => {
  const handleSearchbarClose = () => {
    if (closeCategories) {
      closeCategories(false);
    }
  };
  return (
    <div className="categories">
      <div className="container">
        {type ? (
          <p style={{ fontWeight: "500", color: "#000" }}>
            Search with Categories
          </p>
        ) : (
          <h4 className="text-center">Categories</h4>
        )}
        <div className="row">
          {categories.map((eachCategory, i) => (
            <div
              className={`col-6 col-md-${breakpoint}`}
              key={eachCategory.azst_category_id}
            >
              <div className="categoryBox">
                <div className="category">
                  <div style={{ position: "relative" }}>
                    <img
                      src={eachCategory.azst_category_img}
                      alt={eachCategory.azst_category_name}
                      className="categoryImg"
                      loading="lazy"
                    />
                    <div className="category_overlay">
                      <>
                        <small
                          className="productCount"
                          style={{ color: "#fff" }}
                        >{`${eachCategory.no_products} Products`}</small>
                        {eachCategory.no_products > 0 && (
                          <Link
                            to={`/collection/${eachCategory.azst_category_name.replace(
                              / /g,
                              "-"
                            )}`}
                            state={{
                              categoryId: eachCategory.azst_category_id,
                              collectionName: eachCategory.azst_category_name,
                            }}
                            onClick={handleSearchbarClose}
                            className="viewAllBtn"
                            style={{ color: "#fff" }}
                          >
                            <small>View All</small>
                          </Link>
                        )}
                      </>
                    </div>
                  </div>
                  <div className="text-center">
                    <strong className="categoryTxt">
                      {eachCategory.azst_category_name}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
