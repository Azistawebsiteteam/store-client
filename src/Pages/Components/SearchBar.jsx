import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Categories from "../HomePage/Categories";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorHandler from "./ErrorHandler";

const SearchBar = ({ handleSearchBar, showSearchBar }) => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTextResult, setSearchTextResult] = useState([]);

  const baseUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const categories = async () => {
      try {
        const categoriesUrl = `${baseUrl}/category/data`;
        const categoriesResponse = await axios.get(categoriesUrl);

        if (categoriesResponse.status === 200) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        ErrorHandler.onError(error);
      }
    };
    categories();
  }, [baseUrl]);

  const closeSearchBar = (val) => {
    handleSearchBar(val);
    setSearchText("");
  };

  const getProducts = async (value) => {
    const url = `${baseUrl}/product/search`;
    const body = {
      searchText: value,
    };
    const response = await axios.post(url, body);
    if (response.data.products) {
      setSearchTextResult(response.data.products);
    }
  };

  const handleSearchProducts = (value) => {
    setTimeout(() => {
      getProducts(value);
    }, 2000);
  };

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
    handleSearchProducts(e.target.value);
  };

  const searchFunctionality = () => {
    const goToSearchResultPage = () => {
      handleSearchBar(false);
      navigate("/search/products");
    };
    return (
      <div className="searchResultsCont">
        <p>
          <strong>Search Results</strong>
        </p>
        <div className="searchResults">
          {searchTextResult.length > 0 ? (
            <>
              <div className="d-flex">
                {searchTextResult.slice(0, 3).map((product, i) => (
                  <Link
                    className="linkBtn"
                    to={`/productitem/${product.product_url_title}`}
                    key={i}
                  >
                    <div
                      className="searchProductCard"
                      onClick={() => closeSearchBar(false)}
                      style={{ backgroundColor: "#F3F4F5" }}
                    >
                      <div className="productContent">
                        <p className="truncate">
                          {product.product_main_title}{" "}
                        </p>
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
              <div>
                {searchTextResult.length > 3 && (
                  <p
                    className="linkBtn"
                    style={{ cursor: "pointer", fontWeight: "500" }}
                    onClick={goToSearchResultPage}
                  >
                    View all products
                  </p>
                )}
              </div>
            </>
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${
        showSearchBar ? "showSearchBar" : "hideSearchBar"
      } searchBarCont`}
    >
      <div className="searchBarLeftSec" onClick={() => closeSearchBar(false)}>
        <button
          style={{
            color: "#fff",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "1.3rem",
            border: "none",
            textDecoration: "none",
          }}
        >
          Continue Shopping
        </button>
      </div>
      <div className="searchBarPage">
        <div className="topSec">
          <IoIosSearch className="searchBarIcon" />
          <input
            className="form-control mr-sm-2 searchBar"
            onChange={onChangeSearchText}
            value={searchText}
            type="search"
            placeholder="Start Typing"
            aria-label="Search"
          />
          {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button> */}
          <RxCross2
            className="searchBarIcon"
            size={20}
            onClick={() => closeSearchBar(false)}
          />
        </div>
        <div className="searchBarRightSec">
          {searchText.length > 0 ? (
            searchFunctionality()
          ) : (
            <div className="">
              <Categories
                categories={categories}
                type="searchbarCont"
                closeCategories={closeSearchBar}
                breakpoint={3}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
