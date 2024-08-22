import axios from "axios";
import Cookies from "js-cookie";
import swalHandle from "../Components/ErrorHandler";
// const jwtToken = Cookies.get(process.env.REACT_APP_JWT_TOKEN);
const baseUrl = process.env.REACT_APP_API_URL;

export const handleAddtoCart = async (custId, product, updateCartData) => {
  const { productId, variantId, quantity } = product;
  try {
    const url = `${baseUrl}/cart`;
    const body = {
      customerId: custId ?? 0,
      sessionId: localStorage.getItem(process.env.REACT_APP_CART_KEY),
      cartProducts: [
        {
          productId,
          variantId: variantId ?? 0,
          quantity: quantity,
        },
      ],
    };
    const response = await axios.post(url, body);
    swalHandle.onSuccess("Product Added to Cart");
    updateCartData();
    console.log(response);
  } catch (error) {
    swalHandle.onError(error);
  }
};

export const cartItems = async (custId) => {
  console.log(custId, "customer djndf");
  try {
    const url = `${baseUrl}/cart/data`;
    const body = {
      customerId: custId ?? 0,
      sessionId: localStorage.getItem(process.env.REACT_APP_CART_KEY),
    };

    swalHandle.onLoading();
    const response = await axios.post(url, body);
    const { cart_products } = response.data;
    swalHandle.onLoadingClose();
    return cart_products;
  } catch (error) {
    swalHandle.onError(error);
  }
};

export const calculateTotal = (cartList) => {
  const cartTotal = cartList.reduce(
    (total, item) =>
      total +
      parseInt(item.offer_price ?? item.price) *
        parseInt(item.azst_cart_quantity),
    0
  );

  return cartTotal;
};
