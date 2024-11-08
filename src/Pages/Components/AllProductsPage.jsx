import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { searchResultContext } from "../../ReactContext/SearchResults";
import ScrollToTop from "../../Utils/ScrollToTop";

const AllProductsPage = () => {
  const { searchResults } = useContext(searchResultContext);

  return (
    <>
      <ScrollToTop />
      <div className="searchProductResults">
        <div className="row">
          {searchResults.map((product, i) => (
            <div className="col-md-3" key={i}>
              <Link
                className="linkBtn"
                to={`/productitem/${product.product_url_title}`}
              >
                <div
                  className="searchProductResultsCard"
                  style={{ backgroundColor: "#F3F4F5" }}
                >
                  <div className="productContent">
                    <p className="truncate">{product.product_main_title} </p>
                    <span
                      className="product_subTitle truncate"
                      style={{ color: "rgba(40, 40, 40, 0.8)" }}
                    >
                      {product.product_title}
                    </span>
                  </div>
                  <div className="text-center">
                    <img
                      className="searchProductImg"
                      src={product.image_src}
                      alt="productImg"
                    />
                  </div>
                  <div className="productPrice">
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "rgba(40, 40, 40, 0.7)",
                        fontSize: "16px",
                      }}
                    >
                      {parseInt(product.is_varaints_aval) !== 1 && "Rs"}{" "}
                      {product.compare_at_price}
                    </span>
                    {parseInt(product.is_varaints_aval) === 1 && <br />}
                    <span style={{ fontSize: "16px" }}>
                      {parseInt(product.is_varaints_aval) !== 1 && "  Rs "}
                      {product.price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProductsPage;
