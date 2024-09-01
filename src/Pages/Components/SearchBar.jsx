import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import Categories from "../HomePage/Categories";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
        console.log(error);
      }
    };
    categories();
  }, [baseUrl]);

  const closeSearchBar = (val) => {
    handleSearchBar(val);
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
              {searchTextResult.slice(0, 2).map((product, i) => (
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
                      <p>{product.product_main_title} </p>
                      <small
                        className="product_subTitle"
                        style={{ color: "rgba(40, 40, 40, 0.8)" }}
                      >
                        {product.product_title}
                      </small>
                    </div>
                    <div className="text-center">
                      <img
                        className="searchImg"
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
                        Rs {product.compare_at_price}
                      </span>
                      <span className="ms-2">Rs {product.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
              {searchTextResult.length > 2 && (
                <p className="linkBtn" onClick={goToSearchResultPage}>
                  View all products
                </p>
              )}
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
        <Link
          to="/"
          className="linkBtn"
          style={{ color: "#fff", cursor: "pointer", fontSize: "1.3rem" }}
        >
          Continue Shopping
        </Link>
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
          <IoIosClose
            className="searchBarIcon"
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
