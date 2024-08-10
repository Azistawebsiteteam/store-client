/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ErrorHandle from "../Components/ErrorHandler";
import "./index.css";
import "../Components/Customer.css";
import ProductCard from "../Components/ProductCard";
import CollectionsTab from "./CollectionsTab";
import ScrollToTop from "../../Utils/ScrollToTop";

const CollectionsDetails = () => {
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [collectionData, setCollectionData] = useState({});

  const [filteredValues, setFilteredValues] = useState({
    availability: "All",
    discount: "10",
    sortOrder: "DESC",
  });

  const [starRating, setStarRating] = useState(0);

  const baseUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const { brandId, categoryId, collectionId, collectionName } =
    location.state || {};

  useEffect(() => {
    const collections = async () => {
      let body = {};

      if (brandId) {
        body = { brandId };
      }

      if (categoryId) {
        body = { categoryId };
      }
      if (collectionId) {
        body = { collectionId };
      }
      try {
        const url = `${baseUrl}/product/collection-products`;
        const { sortOrder, availability } = filteredValues;
        body = {
          ...body,
          orderBy: sortOrder,
          reviewpoint: parseInt(starRating),
          productQty: availability,
        };
        console.log(body, "body");
        ErrorHandle.onLoading();
        const response = await axios.post(url, body);
        const { collection_data, products } = response.data;
        setCollectionData(collection_data);
        setProductsList(products);
        setFilteredProducts(products);
        ErrorHandle.onLoadingClose();
      } catch (error) {
        console.log(error, "error");
        ErrorHandle.onLoadingClose();
        ErrorHandle.onError(error);
      }
    };
    collections();
  }, [
    baseUrl,
    brandId,
    categoryId,
    collectionId,
    filteredValues.availability,
    filteredValues.sortOrder,
    starRating,
  ]);

  const filterAccDis = (dis) => {
    const filteredProductsList = productsList.filter((each) => {
      const diff = parseInt(each.compare_at_price) - parseInt(each.price);
      const percentage = Math.ceil(
        (diff / parseInt(each.compare_at_price)) * 100
      );
      return percentage > parseInt(dis);
    });
    setFilteredProducts(filteredProductsList);
  };

  return (
    <>
      <ScrollToTop />
      <div className="userPage">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="breadcrumbCust-icon" to="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {collectionName}
              </li>
            </ol>
          </nav>
          <CollectionsTab
            filterAccDis={filterAccDis}
            filteredValues={filteredValues}
            setFilteredValues={setFilteredValues}
            starRating={starRating}
            setStarRating={setStarRating}
          />
          <div className="CollectionDetails">
            <h1>{collectionData.azst_collection_title}</h1>
            <p>{collectionData.azst_collection_description}</p>
          </div>
          <div className="collectionProducts">
            <ProductCard items={filteredProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionsDetails;
