/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import Cookies from "js-cookie";
import { DisplayReview, ProductRating } from "./CustomerRating";
import { getProductDiscount } from "../../Utils/DiscountPrcentage";
import { IoIosArrowRoundForward } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { GrShareOption } from "react-icons/gr";
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import ScrollToTop from "../../Utils/ScrollToTop";
import { handleAddtoCart } from "../Cart/Functions";
import { AddToWishlist, removeFromWishlist } from "../../Utils/AddToWishlist";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { TiArrowRight } from "react-icons/ti";
import Faqs from "./Faqs";
import ErrorHandler from "./ErrorHandler";

const ProductItem = () => {
  const [productDetails, setProductDetails] = useState({});
  const [variants, setVariants] = useState([]);
  const [quantityCounter, setQuantityCounter] = useState(1);
  const [availableVariants, setAvailableVarients] = useState([]);
  const [selectedVariant1, setSelectedVariant1] = useState(null);
  const [selectedVariant2, setSelectedVariant2] = useState(null);
  const [selectedVariant3, setSelectedVariant3] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [descriptionHeadings, setDescriptionHeadings] = useState([]);
  const [contArray, setContArray] = useState();
  const [reqVariantId, setReqVariantId] = useState(0);
  const [output, setOutput] = useState();
  const [isFixed, setIsFixed] = useState(false);
  const [productImagesArr, setProductImagesArr] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [readMoreContent, setReadMoreContent] = useState(false);
  const [faqsList, setFaqsList] = useState([]);
  const [pincode, setPincode] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState({});
  const [pincodeError, setPincodeError] = useState("");
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  let { id } = useParams();
  const { userDetails, updateCartData } = useContext(searchResultContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const renderSection = document.getElementById("productBuyNowSection");
      const scrollPosition = window.scrollY;

      if (renderSection) {
        if (scrollPosition <= 420) {
          setIsFixed(false);
          renderSection.style.display = "none";
        } else {
          setIsFixed(true);
          renderSection.style.display = "block";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFaqs = useCallback(
    async (productId) => {
      const faqsUrl = `${baseUrl}/faqs/customer/product`;
      const faqsResponse = await axios.post(faqsUrl, { productId });
      setFaqsList(faqsResponse.data);
    },
    [baseUrl]
  );

  // useEffect(() => {
  //   if (showSearchBar === false && showCart === false) {
  //     const timer = setTimeout(() => {
  //       setIsButtonVisible(true);
  //     }, 1500);

  //     // Clear timeout if the component unmounts before the delay
  //     return () => clearTimeout(timer);
  //   } else {
  //     setIsButtonVisible(false);
  //   }
  // }, [showSearchBar, showCart]);

  useLayoutEffect(() => {
    const productDetails = async () => {
      try {
        const url = `${baseUrl}/product/details`;
        const productResponse = await axios.post(url, {
          productId: id,
          customerId:
            userDetails.azst_customer_id ??
            localStorage.getItem(process.env.REACT_APP_CART_KEY),
        });

        const { avalaibleVariants, productDetails, variants } =
          productResponse.data;
        getFaqs(productDetails.id);
        setAvailableVarients(avalaibleVariants);
        setProductDetails(productDetails);
        setQuantityCounter(productDetails.min_cart_quantity);
        setProductImagesArr(productDetails.product_images);
        variants ? setVariants(variants) : setVariants("");
      } catch (error) {
        ErrorHandler.onError(error);
      }
    };
    productDetails();
  }, [id, baseUrl]);

  const htmlString = productDetails.product_info;

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const h4Elements = doc.querySelectorAll("h4");
    const contentItems = doc.querySelectorAll("div");

    // Initialize arrays to store headings and content
    const headingsArray = [];
    const contentArray = [];

    // Loop through each <h4> element and extract its HTML content
    h4Elements.forEach((element, index) => {
      headingsArray.push(element.innerHTML);
    });

    // Loop through each element with className "content" and extract its HTML content
    contentItems.forEach((element, index) => {
      contentArray.push(element.innerHTML);
    });

    // Update state with the extracted data
    setDescriptionHeadings(headingsArray);
    setContArray(contentArray);
  }, [htmlString]);

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant1(variants[0].values[0]);
      if (variants.length > 1) {
        setSelectedVariant2(variants[1].values[0]);
      }
      if (variants.length > 2) {
        setSelectedVariant3(variants[2].values[0]);
      }
    }
  }, [variants]);

  useEffect(() => {
    const variantGroupId = () => {
      const matchingVariant = availableVariants.find(
        (each, i) =>
          each.option1 === selectedVariant1 &&
          each.option2 === selectedVariant2 &&
          each.option3 === selectedVariant3
      );

      if (matchingVariant) {
        setReqVariantId(matchingVariant.id);
      }
    };
    variantGroupId();
  }, [availableVariants, selectedVariant1, selectedVariant2, selectedVariant3]);

  // useEffect(() => {
  //   const variantDetails = async () => {
  //     try {
  //       const url = `${baseUrl}/product/variants`;
  //       const variantId = reqVariantId ? reqVariantId : "0";
  //       let response = await axios.post(url, { variantId });
  //       setOutput(response.data.variant);
  //     } catch (error) {
  //       ErrorHandler.onError(error);
  //     }
  //   };
  //   if (reqVariantId) {
  //     variantDetails();
  //   }
  // }, [baseUrl, reqVariantId]);

  const variantDetails = useCallback(async () => {
    try {
      const url = `${baseUrl}/product/variants`;
      const variantId = reqVariantId ? reqVariantId : "0";
      let response = await axios.post(url, { variantId });
      setOutput(response.data.variant);
    } catch (error) {
      ErrorHandler.onError(error);
    }
  }, [baseUrl, reqVariantId]);

  useEffect(() => {
    if (reqVariantId) {
      variantDetails();
    }
  }, [variantDetails]);

  if (Object.keys(productDetails).length === 0) {
    return null;
  }

  const decreaseQuantity = () => {
    if (quantityCounter > 1) {
      setQuantityCounter((prevVal) => prevVal - 1);
    }
  };

  const increaseQuantity = () => {
    const maxQuantity = productDetails.max_cart_quantity;
    // ? parseInt(output.variant_quantity)
    // : parseInt(productDetails.chintal_quantity) +
    //   parseInt(productDetails.corporate_office_quantity);
    if (quantityCounter < maxQuantity) {
      setQuantityCounter((prevVal) => prevVal + 1);
    }
  };

  const handleWishlist = async () => {
    try {
      if (!jwtToken) return navigate("/login");
      const response = await AddToWishlist(
        productDetails.id,
        reqVariantId || 0
      );
      if (response?.status === 200) {
        const { wishlist_id } = response.data;
        setProductDetails({
          ...productDetails,
          in_wishlist: wishlist_id,
        });
      }
    } catch (error) {
      ErrorHandler.onError(error);
    }
  };

  const handleWishlistRemove = async (id) => {
    const result = await removeFromWishlist(id);
    if (result) {
      setProductDetails({ ...productDetails, in_wishlist: 0 });
    }
  };
  const handleVariantOpt1 = (v) => {
    if (!selectedVariant1.includes(v)) {
      setSelectedVariant1(v);
    }
  };

  const handleVariantOpt2 = (v) => {
    if (!selectedVariant2.includes(v)) {
      setSelectedVariant2(v);
    }
  };

  const handleVariantOpt3 = (v) => {
    if (!selectedVariant3.includes(v)) {
      setSelectedVariant3(v);
    }
  };

  const handleTab = (index) => {
    for (const each in descriptionHeadings) {
      if (each === index) {
        setSelectedTab(index);
      }
    }
  };
  const hanlePrevBtn = () => {
    let newIndex = imgCount === 0 ? productImagesArr.length - 1 : imgCount - 1;
    setImgCount(newIndex);
  };
  const hanleNextBtn = () => {
    let newIndex = imgCount === productImagesArr.length - 1 ? 0 : imgCount + 1;
    setImgCount(newIndex);
  };

  let productMainImg = productImagesArr[imgCount];

  // const handleBodyCondn = (type) => {
  //   setChooseCondn(type);
  // };

  const onSubmitPincode = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/orders/customer/estimate/date`;
      const response = await axios.post(url, { pincode });
      setEstimatedDelivery(response.data);
      setPincodeError("");
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      setPincodeError(message);
      setEstimatedDelivery("");
    }
  };

  const handleEstimateDate = (e) => {
    setPincode(e.target.value);
  };

  const handleBuyNow = async () => {
    try {
      if (!jwtToken) return navigate("/login");
      await handleAddtoCart(
        userDetails.azst_customer_id,
        {
          productId: productDetails.id,
          variantId: output?.id ?? 0,
          quantity: quantityCounter,
        },
        updateCartData
      );
      navigate("/checkout");
    } catch (error) {
      ErrorHandler.onError(error);
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="productUserPage">
        <div className="productInfoSec">
          <div className="container">
            <div className="row">
              <nav aria-label="breadcrumb mb-4">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumbCust-icon" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    {productDetails.product_title}
                  </li>
                </ol>
              </nav>
              <div className="col-md-6">
                <div className="productContImgSec">
                  <div className="subImagesCont">
                    {productDetails.product_images.map((imgUrl, i) => (
                      <img
                        src={imgUrl}
                        key={i}
                        className="subImages"
                        alt="yyu"
                        onMouseOver={() => setImgCount(i)}
                      />
                    ))}
                  </div>
                  <div className="mainImageCont">
                    <img
                      src={productMainImg}
                      className="mainImage"
                      alt="mainImage"
                    />
                    <div className="navigatingBtns">
                      <RxCaretLeft
                        className="playIcon prevIcon"
                        onClick={hanlePrevBtn}
                      />
                      <RxCaretRight
                        className="playIcon nextIcon"
                        onClick={hanleNextBtn}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="rightSec">
                  <h5 className="productName">
                    {productDetails.product_title}
                    {selectedVariant1 && `-${selectedVariant1}`}
                    {selectedVariant2 && `-${selectedVariant2}`}
                    {selectedVariant3 && `-${selectedVariant3}`}
                  </h5>
                  <ProductRating productId={productDetails.id} />

                  <div className="product_properties">
                    {productDetails.product_features?.map((feature, i) => (
                      <div className="property" key={feature.feature_id}>
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="propertyImg"
                        />
                        <span>{feature.title}</span>
                      </div>
                    ))}
                  </div>
                  {/* <div className="bodyType">
                    <p>
                      <strong>What is Your Skin type</strong>
                    </p>
                    <div className="bodyTypeCondn">
                      <button
                        className={`bodyTypeStyle ${
                          chooseCondn === "oilySkin" ? "activeCondn" : ""
                        }`}
                        onClick={() => handleBodyCondn("oilySkin")}
                      >
                        Oily Skin
                      </button>
                      <button
                        className={`bodyTypeStyle ${
                          chooseCondn === "drySkin" ? "activeCondn" : ""
                        }`}
                        onClick={() => handleBodyCondn("drySkin")}
                      >
                        Dry Skin
                      </button>
                      <button
                        className={`bodyTypeStyle ${
                          chooseCondn === "normalSkin" ? "activeCondn" : ""
                        }`}
                        onClick={() => handleBodyCondn("normalSkin")}
                      >
                        Normal Skin
                      </button>
                      <button
                        className={`bodyTypeStyle ${
                          chooseCondn === "combination" ? "activeCondn" : ""
                        }`}
                        onClick={() => handleBodyCondn("combination")}
                      >
                        Combination
                      </button>
                      <button
                        className={`bodyTypeStyle ${
                          chooseCondn === "sensitive" ? "activeCondn" : ""
                        }`}
                        onClick={() => handleBodyCondn("sensitive")}
                      >
                        Sensitive
                      </button>
                    </div>
                  </div> */}
                  {/* <div className="">
                    <p>
                      <strong>Availability</strong>
                    </p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Default radio
                      </label>
                    </div>
                  </div> */}
                  <div className="d-flex productPrice">
                    <p className="comparedPrice">
                      Rs{" "}
                      {variants.length > 0
                        ? output?.compare_at_price
                        : productDetails.compare_at_price}
                    </p>
                    <p className="price">
                      Rs{" "}
                      {variants.length > 0
                        ? output?.offer_price
                        : productDetails.price}
                    </p>
                    <p className="discountPer">
                      Save{" "}
                      {variants.length > 0
                        ? getProductDiscount(
                            output?.compare_at_price,
                            output?.offer_price
                          )
                        : getProductDiscount(
                            productDetails.compare_at_price,
                            productDetails.price
                          )}
                      %
                    </p>
                    <p style={{ color: "red", marginLeft: "6px" }}>
                      {!(
                        parseInt(productDetails.product_qty) > 0 &&
                        parseInt(productDetails.product_qty) >=
                          parseInt(productDetails.min_cart_quantity)
                      ) && "Out of Stock"}
                    </p>
                  </div>
                  <div className="clickableElements">
                    <div className="d-flex justify-content-between">
                      {parseInt(productDetails.product_qty) > 0 &&
                        parseInt(productDetails.product_qty) >=
                          parseInt(productDetails.min_cart_quantity) && (
                          <>
                            <div className="quantityCont">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={decreaseQuantity}
                              >
                                <FaMinus />
                              </span>
                              <span className="quantityVal">
                                {quantityCounter}
                              </span>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={increaseQuantity}
                              >
                                <FaPlus />
                              </span>
                            </div>
                            <button
                              className="productPgBtn"
                              type="button"
                              disabled={
                                !(
                                  parseInt(productDetails.product_qty) > 0 &&
                                  parseInt(productDetails.product_qty) >=
                                    parseInt(productDetails.min_cart_quantity)
                                )
                              }
                              onClick={() =>
                                handleAddtoCart(
                                  userDetails.azst_customer_id,
                                  {
                                    productId: productDetails.id,
                                    variantId: output?.id ?? 0,
                                    quantity: quantityCounter,
                                  },
                                  updateCartData
                                )
                              }
                            >
                              Add to cart
                            </button>
                          </>
                        )}
                      {/* {parseInt(productDetails.is_varaints_aval === 1)
                        ? output.in_wishlist
                        : productDetails.in_wishlist} */}

                      {parseInt(productDetails.in_wishlist) > 0 ? (
                        <button
                          onClick={() =>
                            handleWishlistRemove(productDetails.in_wishlist)
                          }
                          className="hoveredCardButton"
                        >
                          <img
                            src={`${process.env.PUBLIC_URL}/images/coloredIcon.svg`}
                            alt="wishlist"
                            className="wishListBtn"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={handleWishlist}
                          className="hoveredCardButton"
                        >
                          <img
                            src={`${process.env.PUBLIC_URL}/images/blackIcon.svg`}
                            alt="wishlist"
                            className="wishListBtn"
                          />
                        </button>
                      )}
                    </div>
                    {parseInt(productDetails.product_qty) > 0 &&
                      parseInt(productDetails.product_qty) >=
                        parseInt(productDetails.min_cart_quantity) && (
                        <button
                          className="buyNowBtn"
                          onClick={handleBuyNow}
                          disabled={
                            !(
                              parseInt(productDetails.product_qty) > 0 &&
                              parseInt(productDetails.product_qty) >=
                                parseInt(productDetails.min_cart_quantity)
                            )
                          }
                        >
                          Buy it Now
                        </button>
                      )}

                    <div className="variants">
                      {variants.length > 0 && (
                        <div
                          key={variants[0].UOM}
                          style={{ padding: "0.4rem 0" }}
                        >
                          <small style={{ color: "#747474" }}>
                            {variants[0].UOM} :
                          </small>
                          <div className="variantsValues">
                            {variants[0].values.map((eachValue, si) => (
                              <button
                                key={si}
                                onClick={(e, i) =>
                                  handleVariantOpt1(eachValue, i)
                                }
                                className={
                                  eachValue === selectedVariant1
                                    ? "selected"
                                    : `variantsValue`
                                }
                                style={{
                                  fontSize: "0.8rem",
                                  padding: "0.4rem",
                                }}
                              >
                                {eachValue}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {variants.length > 1 && (
                        <div
                          key={variants[1].UOM}
                          style={{ padding: "0.4rem 0" }}
                        >
                          <small style={{ color: "#747474" }}>
                            {variants[1].UOM} :
                          </small>
                          <div className="variantsValues">
                            {variants[1].values.map((eachValue, si) => (
                              <button
                                key={si}
                                onClick={(e, i) =>
                                  handleVariantOpt2(eachValue, i)
                                }
                                className={
                                  eachValue === selectedVariant2
                                    ? "selected"
                                    : `variantsValue`
                                }
                                style={{
                                  fontSize: "0.8rem",
                                  padding: "0.4rem",
                                }}
                              >
                                {eachValue}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {variants.length > 2 && (
                        <div
                          style={{ padding: "0.4rem 0" }}
                          key={variants[2].UOM}
                        >
                          <small style={{ color: "#747474" }}>
                            {variants[2].UOM} :
                          </small>
                          <div className="variantsValues">
                            {variants[2].values.map((eachValue, si) => (
                              <button
                                key={si}
                                onClick={(e, i) =>
                                  handleVariantOpt3(eachValue, i)
                                }
                                className={
                                  eachValue === selectedVariant3
                                    ? "selected"
                                    : `variantsValue`
                                }
                                style={{
                                  fontSize: "0.8rem",
                                  padding: "0.4rem",
                                }}
                              >
                                {eachValue}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="d-md-flex justify-content-md-between align-items-end">
                      <div className="delivaryStatus">
                        <label
                          htmlFor="checkDelivery"
                          style={{ fontWeight: "500", marginBottom: "2px" }}
                        >
                          Delivery
                        </label>
                        <form
                          className="searchAvailability"
                          onSubmit={onSubmitPincode}
                        >
                          <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Enter Delivery Pincode"
                            aria-label="Search"
                            onChange={handleEstimateDate}
                            value={pincode}
                          />
                          <button className="pinSearchBtn" type="submit">
                            <IoIosArrowRoundForward className="pinSearchBtnArr" />
                          </button>
                        </form>
                        {Object.keys(estimatedDelivery).length > 0 && (
                          <small>
                            Estimated between{" "}
                            {estimatedDelivery.expectedDateFrom} &{" "}
                            {estimatedDelivery.expectedDateto}
                          </small>
                        )}
                        {pincodeError && <small>{pincodeError}</small>}
                      </div>
                      <div className="d-flex flex-column align-items-start align-items-md-end">
                        <span
                          style={{
                            color: "black",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {productDetails.product_return_accept === "No"
                            ? "Non-returnable and non-replaceable"
                            : `Returnable within ${productDetails.product_return_days} days`}
                        </span>
                        <a
                          href="mailto:'ecommerce@azistaindustries.com'"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "500",
                          }}
                        >
                          <HiOutlineMail
                            color="black"
                            className="productPgIcon"
                          />{" "}
                          Ask a Question?
                        </a>
                        <a
                          href="mailto:'ecommerce@azistaindustries.com'"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "500",
                          }}
                        >
                          <GrShareOption
                            color="black"
                            className="productPgIcon"
                          />{" "}
                          Share
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ingredientsCont">
          <div className="container">
            <div className="row">
              {productDetails?.product_ingredients !== null && (
                <div className="col-md-12">
                  <h4 className="text-center">Ingredients</h4>
                  <div className="ingredientsList">
                    {productDetails.product_ingredients?.map(
                      (ingredient, i) => (
                        <div
                          className="ingredient d-flex flex-column align-items-center m-2"
                          key={i}
                        >
                          <div className="ingredientCont">
                            <img
                              src={ingredient.image}
                              alt={ingredient.title}
                              className="ingredientImg"
                            />
                            <p className="ingredientTitle">
                              {ingredient.title}
                            </p>
                          </div>
                          <span className="ingredientHoverCont">
                            {ingredient.description}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              <div className="col-md-12 d-flex justify-content-center">
                <div className="productInfo">
                  <ul
                    className="nav nav-pills custNavPills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    {descriptionHeadings.map((tabHeading, id) => (
                      <li
                        key={id}
                        className="nav-item custNavItem"
                        role="presentation"
                      >
                        <button
                          className={`nav-link custNavLink ${
                            selectedTab === id && "active"
                          }`}
                          id={`tab-${id}`}
                          onClick={() => handleTab(id)}
                          data-bs-toggle="pill"
                          data-bs-target={`#content-${id}`}
                          type="button"
                          role="tab"
                          aria-controls={`content-${id}`}
                          aria-selected={selectedTab === id ? "true" : "false"}
                        >
                          <div
                            style={{ fontFamily: "outFit", fontWeight: "600" }}
                            dangerouslySetInnerHTML={{
                              __html: `${tabHeading}`,
                            }}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content tabContent" id="pills-tabContent">
                    {contArray.map((tabContent, id) => (
                      <div
                        key={id}
                        className={`tab-pane fade ${
                          selectedTab === id && "show active"
                        }`}
                        id={`content-${id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${id}`}
                      >
                        <div
                          className={`hideProductContentInfo ${
                            readMoreContent ? "expanded" : "hideContent"
                          }`}
                          id="productContentInfo"
                          dangerouslySetInnerHTML={{
                            __html: tabContent,
                          }}
                        />

                        {tabContent.length > 700 ? (
                          <button
                            className="mt-1"
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              color: "#008060",
                              fontWeight: "500",
                              cursor: "pointer",
                            }}
                            onClick={() => setReadMoreContent(!readMoreContent)}
                          >
                            {readMoreContent ? "Read Less" : "Read More"}
                            <TiArrowRight />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`productBuyNowSection  ${isFixed ? "fixed-top" : ""}`}
          id="productBuyNowSection"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <nav aria-label="breadcrumb mb-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="breadcrumbCust-icon" to="/">
                        Home
                      </Link>
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                      {productDetails.product_title}
                    </li>
                  </ol>
                </nav>
                <h5 className="productName">
                  {productDetails.product_title}
                  {selectedVariant1 && `-${selectedVariant1}`}
                  {selectedVariant2 && `-${selectedVariant2}`}
                  {selectedVariant3 && `-${selectedVariant3}`}
                </h5>
              </div>
              <div className="col-md-6 d-flex align-items-md-end justify-content-md-end">
                <div className="d-flex align-items-end justify-content-end">
                  {parseInt(productDetails.product_qty) > 0 &&
                    parseInt(productDetails.product_qty) >=
                      parseInt(productDetails.min_cart_quantity) && (
                      <>
                        <button
                          className="secProductPgBtn secondaryBuynowBtn me-3"
                          onClick={handleBuyNow}
                          disabled={
                            !(
                              parseInt(productDetails.product_qty) > 0 &&
                              parseInt(productDetails.product_qty) >=
                                parseInt(productDetails.min_cart_quantity)
                            )
                          }
                        >
                          Buy it Now
                        </button>
                        <button
                          className="secProductPgBtn secondaryAddtocartBtn"
                          type="button"
                          onClick={() =>
                            handleAddtoCart(
                              userDetails.azst_customer_id,
                              {
                                productId: productDetails.id,
                                variantId: output?.id ?? 0,
                                quantity: quantityCounter,
                              },
                              updateCartData
                            )
                          }
                        >
                          Add to cart
                        </button>
                      </>
                    )}
                  {parseInt(productDetails.in_wishlist) > 0 ? (
                    <button
                      onClick={() =>
                        handleWishlistRemove(productDetails.in_wishlist)
                      }
                      className="hoveredCardButton"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/coloredIcon.svg`}
                        alt="wishlist"
                        className="wishListBtn"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={handleWishlist}
                      className="hoveredCardButton"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/blackIcon.svg`}
                        alt="wishlist"
                        className="wishListBtn"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviewsCont">
          <div className="container">
            <div className="row">
              <DisplayReview productId={productDetails.id} />
            </div>
          </div>
        </div>
        {faqsList.length > 0 && (
          <div className="faqsSec">
            <div className="container">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-column">
                  <h4>Frequently Asked Questions</h4>
                  <div className="accordianCont">
                    <Faqs faqsList={faqsList} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductItem;
