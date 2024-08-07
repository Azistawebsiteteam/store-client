/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import Cookies from "js-cookie";
import swalHandle from "./ErrorHandler";
import Swal from "sweetalert2";
import { DisplayReview, ProductRating } from "./CustomerRating";
import { getProductDiscount } from "../../Utils/DiscountPrcentage";
import { PiHeart } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { GrShareOption } from "react-icons/gr";
import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowDropLeftLine } from "react-icons/ri";
import Faqs from "./Faqs";
import ScrollToTop from "../../Utils/ScrollToTop";

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
  const [reqVariantId, setReqVariantId] = useState();
  const [output, setOutput] = useState();
  const [chooseCondn, setChooseCondn] = useState("oilySkin");

  const [productImagesArr, setProductImagesArr] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [readMoreContent, setReadMoreContent] = useState(false);
  const [contentHeight, setContentHeight] = useState("14rem");
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [faqsList, setFaqsList] = useState([]);
  const [pincode, setPincode] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState({});
  const [pincodeError, setPincodeError] = useState("");

  const contentRef = useRef(null);
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  let { id } = useParams();
  //  const location = useLocation();

  // const { productId = 0 } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (contentRef.current) {
      // Get the full height of the content
      const fullHeight = contentRef.current.scrollHeight;
      console.log(fullHeight, "full");
      setContentHeight(`${fullHeight}px`);

      // Check if content is overflowing the initial max-height
      setIsContentOverflowing(fullHeight > 224); // 14rem in pixels
    }
  }, []);

  const getFaqs = useCallback(
    async (productId) => {
      const faqsUrl = `${baseUrl}/faqs/customer/product`;
      const faqsResponse = await axios.post(faqsUrl, { productId });
      setFaqsList(faqsResponse.data);
    },
    [baseUrl]
  );

  useEffect(() => {
    const productDetails = async () => {
      try {
        const url = `${baseUrl}/product/details`;

        const productResponse = await axios.post(url, { productId: id });

        const { avalaibleVariants, productDetails, variants } =
          productResponse.data;
        getFaqs(productDetails.id);
        setAvailableVarients(avalaibleVariants);
        setProductDetails(productDetails);
        setProductImagesArr(productDetails.product_images);
        setVariants(variants);
      } catch (error) {
        console.log(error);
      }
    };
    productDetails();
  }, [id, baseUrl]);

  console.log(productDetails, "productDetails");

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

  useEffect(() => {
    const variantDetails = async () => {
      try {
        const url = `${baseUrl}/product/variants`;
        let response = await axios.post(url, { variantId: reqVariantId });
        setOutput(response.data.variant);
      } catch (error) {
        console.log(error);
      }
    };
    variantDetails();
  }, [baseUrl, reqVariantId]);

  const addtoCartApi = async (Products, isClear = "no") => {
    try {
      const url = `${baseUrl}/cart`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      const cartProducts = Products.map((p) => ({
        productId: p.productId,
        variantId: p.variantId,
        quantity: p.azst_quantity,
      }));
      const response = await axios.post(url, { cartProducts }, { headers });
      if (response.status === 200) {
        swalHandle.onSuccess("Product added to cart");
        if (isClear === "ClearCart") {
          localStorage.removeItem(process.env.REACT_APP_LOACL_CART);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let localCart = localStorage.getItem(process.env.REACT_APP_LOACL_CART);
    if (jwtToken && localCart) {
      addtoCartApi(JSON.parse(localCart), "ClearCart");
    }
  }, [jwtToken]);

  if (Object.keys(productDetails).length === 0) {
    return null;
  }

  const decreaseQuantity = () => {
    if (quantityCounter > 1) {
      setQuantityCounter((prevVal) => prevVal - 1);
    }
  };

  const increaseQuantity = () => {
    const maxQuantity = output
      ? parseInt(output.variant_quantity)
      : parseInt(productDetails.chintal_quantity) +
        parseInt(productDetails.corporate_office_quantity);
    if (quantityCounter < maxQuantity - 1) {
      setQuantityCounter((prevVal) => prevVal + 1);
    }
  };

  const addtoLoaclSorage = (cartProducts) => {
    try {
      let localCart = localStorage.getItem(process.env.REACT_APP_LOACL_CART);
      let updatedCart = [];
      if (localCart) {
        localCart = JSON.parse(localCart);
        cartProducts.forEach((p) => {
          const isProductTheir = localCart.find(
            (cp) => cp.productId === p.productId
          );

          if (isProductTheir) {
            updatedCart = localCart.map((cp) => {
              if (cp.productId === p.productId) {
                return { ...cp, quantity: cp.quantity + p.quantity };
              } else {
                return cp;
              }
            });
          } else {
            updatedCart = [...localCart, p];
          }
        });
      } else {
        updatedCart = cartProducts;
      }

      localStorage.setItem(
        process.env.REACT_APP_LOACL_CART,
        JSON.stringify(updatedCart)
      );
      swalHandle.onSuccess();
    } catch (error) {
      swalHandle.onError();
    }
  };

  const addToCart = async () => {
    const cartProducts = [
      {
        azst_cart_id: v4(),
        productId: productDetails.id,
        variantId: output?.id ?? 0,
        azst_quantity: quantityCounter,
        variant_image: output?.variant_image[1] || "",
        image_src: productDetails.product_images[0],
        product_title: productDetails.product_title,
        offer_price: output?.offer_price || null,
        compare_at_price: output?.compare_at_price,
        price: productDetails.price,
        product_compare_at_price: productDetails.compare_at_price,
        variant_quantity: output?.variant_quantity,
        chintal_quantity: productDetails.chintal_quantity,
        corporate_office_quantity: productDetails.corporate_office_quantity,
      },
    ];

    if (jwtToken) {
      addtoCartApi(cartProducts);
    } else {
      addtoLoaclSorage(cartProducts);
    }
  };

  const handleWishlist = async () => {
    try {
      if (!jwtToken) return navigate("/login");
      const url = `${baseUrl}/whish-list/add`;
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      swalHandle.onLoading();
      await axios.post(
        url,
        {
          productId: productDetails.id,
          variantId: availableVariants[0]?.id ?? 0,
        },
        { headers }
      );
      Swal.close();
    } catch (error) {
      Swal.close();
      swalHandle.onError(error);
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

  const handleBodyCondn = (type) => {
    setChooseCondn(type);
  };

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
  console.log(productDetails, "productDetails");
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
                    {productDetails.product_main_title}
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
                      <RiArrowDropLeftLine
                        className="playIcon prevIcon"
                        onClick={hanlePrevBtn}
                      />
                      <RiArrowDropRightLine
                        className="playIcon nextIcon"
                        onClick={hanleNextBtn}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="rightSec">
                  <h5>
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
                  <div className="bodyType">
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
                  </div>
                  <div className="">
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
                  </div>
                  <div className="d-flex">
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
                      Save
                      {getProductDiscount(
                        productDetails.compare_at_price,
                        productDetails.price
                      )}
                      %
                    </p>
                  </div>
                  <div className="">
                    <div className="d-flex justify-content-md-between">
                      <div className="quantityCont">
                        <span onClick={decreaseQuantity}>
                          <FaMinus />
                        </span>
                        <span className="quantityVal">{quantityCounter}</span>
                        <span onClick={increaseQuantity}>
                          <FaPlus />
                        </span>
                      </div>
                      <button
                        onClick={addToCart}
                        className="productPgBtn"
                        type="button"
                      >
                        Add to cart
                      </button>
                      <PiHeart
                        className="wishListBtn"
                        onClick={handleWishlist}
                      />
                    </div>
                    <button className="buyNowBtn">Buy it Now</button>

                    <div className="variants">
                      {variants.length > 0 && (
                        <div key={variants[0].UOM}>
                          <h5>{variants[0].UOM}</h5>
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
                              >
                                {eachValue}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {variants.length > 1 && (
                        <div key={variants[1].UOM}>
                          <h5>{variants[1].UOM}</h5>
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
                              >
                                {eachValue}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {variants.length > 2 && (
                        <div key={variants[2].UOM}>
                          <h5>{variants[2].UOM}</h5>
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
                      <div className="d-flex flex-column align-items-end">
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
              <div className="col-md-12">
                <h4 className="text-center">Ingredients</h4>
                <div className="ingredientsList">
                  {productDetails.product_ingredients?.map((ingredient, i) => (
                    <div
                      className="ingredient d-flex flex-column align-items-center m-2"
                      key={i}
                    >
                      <div className="ingredientCont">
                        <img
                          src={ingredient.image}
                          alt={ingredient.title}
                          className="ingredientImg"
                          style={{ width: "8rem" }}
                        />
                        <p>
                          <strong>{ingredient.title}</strong>
                        </p>
                      </div>
                      <small className="ingredientHoverCont">
                        {ingredient.description}
                      </small>
                    </div>
                  ))}
                  {/* <div className="ingredient d-flex flex-column align-items-center m-2">
                  <div className="ingredientCont">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/ingredient2.png`}
                      alt="ingredient"
                      className="ingredientImg"
                      style={{ width: "8rem" }}
                    />
                    <p>
                      <strong>Fragrance</strong>
                    </p>
                  </div>
                  <small className="ingredientHoverCont">
                    Reduce the production of melanin and appearence of dark
                    spots and hyperpigmentation
                  </small>
                </div>
                <div className="ingredient d-flex flex-column align-items-center m-2">
                  <div className="ingredientCont">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/ingredient3.png`}
                      alt="ingredient"
                      className="ingredientImg"
                      style={{ width: "8rem" }}
                    />
                    <p>
                      <strong>Glutathione</strong>
                    </p>
                  </div>
                  <small className="ingredientHoverCont">
                    Reduce the production of melanin and appearence of dark
                    spots and hyperpigmentation
                  </small>
                </div> */}
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-center m-4">
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
                          ref={contentRef}
                          className={`hideProductContentInfo ${
                            readMoreContent ? "expanded" : ""
                          }`}
                          style={{
                            maxHeight: readMoreContent
                              ? contentHeight
                              : "14rem",
                          }}
                          id="productContentInfo"
                          dangerouslySetInnerHTML={{ __html: `${tabContent}` }}
                        />
                        {isContentOverflowing && (
                          <btn
                            className="btn btn-secondary displayBtn"
                            onClick={() => setReadMoreContent(!readMoreContent)}
                          >
                            {readMoreContent ? "Read Less" : "Read More"}
                          </btn>
                        )}
                      </div>
                    ))}
                  </div>
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
                <div className="col-md-12 d-flex align-items-center flex-column m-4">
                  <h3>Frequently Asked Questions</h3>
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
