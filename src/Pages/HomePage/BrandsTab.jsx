import React from "react";
import { Link } from "react-router-dom";
import "../Components/Customer.css";

const BrandsTab = (props) => {
  const { brandsItems } = props;

  return (
    <div className="container">
      <div className="row">
        {brandsItems.map((eachBrand) => (
          <div className="col-2" key={eachBrand.azst_brands_id}>
            <Link
              to={`/collection/${eachBrand.azst_brand_name}`}
              className="brandsListImg"
              state={{
                brandId: eachBrand.azst_brands_id,
                collectionName: eachBrand.azst_brand_name,
              }}
            >
              <img
                src={eachBrand.azst_brand_logo}
                alt={eachBrand.azst_brand_name}
                className="brandImg"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsTab;
