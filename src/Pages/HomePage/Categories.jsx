import React from "react";
import { Link } from "react-router-dom";
import "../Components/Customer.css";

const Categories = ({ categories, type }) => {
  return (
    <div className="categories">
      <div className="container">
        {type ? (
          <h6>Search with Categories</h6>
        ) : (
          <h4 className="text-center">Categories</h4>
        )}
        <div className="d-flex flex-wrap">
          {categories.map((eachCategory, i) => (
            <div className="categoryBox" key={eachCategory.azst_category_id}>
              <div className="category">
                <img
                  src={eachCategory.azst_category_img}
                  alt={eachCategory.azst_category_name}
                  className="categoryImg"
                />
                <strong className="categoryTxt">
                  {eachCategory.azst_category_name}
                </strong>
              </div>
              <div className="category_overlay">
                <small>{`${eachCategory.no_products} Products`}</small>
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
                  >
                    View All
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
