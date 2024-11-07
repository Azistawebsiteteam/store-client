import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { searchResultContext } from "../../ReactContext/SearchResults";

const AllProductsPage = () => {
  const { searchResults } = useContext(searchResultContext);

  return (
    <div className="searchProductResults">
      {searchResults.map((product, i) => (
        <Link
          className="linkBtn"
          to={`/productitem/${product.product_url_title}`}
          key={i}
        >
          <div
            className="searchProductCard"
            style={{ backgroundColor: "#F3F4F5" }}
          >
            <div className="productContent">
              <p className="truncate">{product.product_main_title} </p>
              <small
                className="product_subTitle truncate"
                style={{ color: "rgba(40, 40, 40, 0.8)" }}
              >
                {product.product_title}
              </small>
            </div>
            <div className="text-center">
              <img
                className="bestSelledImg"
                src={product.image_src}
                alt="productImg"
              />
            </div>
            <div className="productPrice">
              <span
                style={{
                  textDecoration: "line-through",
                  color: "rgba(40, 40, 40, 0.7)",
                }}
              >
                {parseInt(product.is_varaints_aval) !== 1 && "Rs"}{" "}
                {product.compare_at_price}
              </span>
              {parseInt(product.is_varaints_aval) === 1 && <br />}
              <span>
                {parseInt(product.is_varaints_aval) !== 1 && "  Rs "}
                {product.price}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllProductsPage;
