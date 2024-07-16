import React from "react";

const BrandsTab = (props) => {
  const { brandsItems } = props;

  return (
    <ul className="brandsList">
      {brandsItems.map((eachBrand) => (
        <li key={eachBrand.azst_brands_id}>
          <img
            src={eachBrand.azst_brand_logo}
            alt={eachBrand.azst_brand_name}
            className="brandImg"
          />
        </li>
      ))}
    </ul>
  );
};

export default BrandsTab;
