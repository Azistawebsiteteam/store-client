/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import Cookies from "js-cookie";
import swalHandle from "./ErrorHandler";
import Swal from "sweetalert2";
import { searchResultContext } from "../../ReactContext/SearchResults";
import { getWishlist } from "../UserDashboard/UserProfile/GetUseDetails";
import { FaLocationDot } from "react-icons/fa6";
import { CreateReview, DisplayReview } from "./CustomerRating";

const ProductItem = () => {
  const [productDetails, setProductDetails] = useState({});
  const [mainImg, setMainImg] = useState();
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
  const [review, setReview] = useState(false);

  const baseUrl = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(token);
  let { id } = useParams();
  const navigate = useNavigate();

  const { setWishlistCount, setWishlist } = useContext(searchResultContext);

  const localUrl = process.env.REACT_APP_LOCAL_URL;

  useEffect(() => {
    const productDetails = async () => {
      try {
        const url = `${baseUrl}/product/details`;
        const response = await axios.post(url, { productId: id });
        setAvailableVarients(response.data.avalaibleVariants);
        setProductDetails(response.data.productDetails);
        setVariants(response.data.variants);
      } catch (error) {
        console.log(error);
      }
    };
    productDetails();
  }, [id, baseUrl]);

  useEffect(() => {
    if (Object.keys(productDetails).length > 0) {
      setMainImg(productDetails.product_images[0]);
    }
  }, [productDetails, setMainImg]);

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

    // Loop through each element with class "content" and extract its HTML content
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
    console.log(productDetails.product_title, "cartProducts");
    console.log(productDetails, "ppp");
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
      getWishlist(jwtToken, setWishlist, setWishlistCount);
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
  console.log(productDetails, "oikoo");
  return (
    <div className="userPage">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="productContImgSec">
              <div className="subImagesCont">
                {productDetails.product_images.map((imgUrl, i) => (
                  <img
                    src={imgUrl}
                    key={i}
                    className="subImages"
                    alt="yyu"
                    onMouseOver={() => setMainImg(imgUrl)}
                  />
                ))}
              </div>
              <div className="mainImage">
                <img src={mainImg} className="mainImage" alt="mainImage" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="rightSec">
              <h3>
                {productDetails.product_title}
                {selectedVariant1 && `-${selectedVariant1}`}
                {selectedVariant2 && `-${selectedVariant2}`}
                {selectedVariant3 && `-${selectedVariant3}`}
              </h3>
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
              </div>
              <div className="">
                <div className="d-flex">
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
                    className="btn addToCartBtn"
                    type="button"
                  >
                    Add to cart
                  </button>
                </div>
                <button
                  onClick={handleWishlist}
                  className="btn wishListBtn"
                  type="button"
                >
                  <IoMdHeart style={{ color: "#f7ebb2" }} /> Add to Wishlist
                </button>
                <div className="variants">
                  {variants.length > 0 && (
                    <div key={variants[0].UOM}>
                      <h5>{variants[0].UOM}</h5>
                      <div className="variantsValues">
                        {variants[0].values.map((eachValue, si) => (
                          <button
                            key={si}
                            onClick={(e, i) => handleVariantOpt1(eachValue, i)}
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
                            onClick={(e, i) => handleVariantOpt2(eachValue, i)}
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
                            onClick={(e, i) => handleVariantOpt3(eachValue, i)}
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
                <div className="delivaryStatus">
                  <label htmlFor="checkDelivery">Delivery</label>
                  <div className="checkPincodeCont">
                    <FaLocationDot className="locationIcon" />
                    <input
                      className="checkPincode"
                      id="checkDelivery"
                      type="search"
                    />
                  </div>
                  <input id="checkBtn" type="submit" value="check" />
                </div>
              </div>
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
                        dangerouslySetInnerHTML={{ __html: `${tabHeading}` }}
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
                      dangerouslySetInnerHTML={{ __html: `${tabContent}` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-12 d-flex flex-column align-items-center mb-5">
            <h4>Customer Reviews</h4>
            <div className="d-flex flex-column align-items-center">
              <button
                value={review}
                onClick={() => setReview(!review)}
                className="reviewBtn"
              >
                {review ? "Cancel review" : "Write a review"}
              </button>
              {review && (
                <>
                  <CreateReview
                    productId={productDetails.id}
                    buttonText={"submit"}
                  />
                  <div className="mt-2">
                    <button
                      className="reviewBtn"
                      onClick={() => setReview(!review)}
                    >
                      Cancel review
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <DisplayReview productId={productDetails.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
