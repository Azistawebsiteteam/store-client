import Cookies from "js-cookie";
import ErrorHandler from "../Pages/Components/ErrorHandler";
import axios from "axios";

// export const AddToWishlist = async (productId, variantId) => {
//   const baseUrl = process.env.REACT_APP_API_URL;
//   const token = process.env.REACT_APP_JWT_TOKEN;
//   const jwtToken = Cookies.get(token);
//   try {
//     const url = `${baseUrl}/whish-list/add`;
//     const headers = {
//       Authorization: `Bearer ${jwtToken}`,
//     };
//     ErrorHandler.onLoading();
//     const response = await axios.post(
//       url,
//       {
//         productId,
//         variantId,
//       },
//       { headers }
//     );

//     ErrorHandler.onLoadingClose();
//     return response;
//   } catch (error) {
//     ErrorHandler.onLoadingClose();
//     ErrorHandler.onError(error);
//   }
// };

const baseUrl = process.env.REACT_APP_API_URL;
const tokenKey = process.env.REACT_APP_JWT_TOKEN;

export const AddToWishlist = async (productId, variantId) => {
  const jwtToken = Cookies.get(tokenKey);

  if (!jwtToken) {
    return window.location.replace("/login");
  }

  try {
    const url = `${baseUrl}/wish-list/add`;
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    ErrorHandler.onLoading();

    const response = await axios.post(
      url,
      { productId, variantId },
      { headers }
    );

    return response;
  } catch (error) {
    ErrorHandler.onError(error);
    throw error;
  } finally {
    ErrorHandler.onLoadingClose();
  }
};

export const removeFromWishlist = async (id) => {
  const jwtToken = Cookies.get(tokenKey);
  try {
    const url = `${baseUrl}/wish-list/remove`;
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    ErrorHandler.onLoading();
    await axios.post(
      url,
      {
        whishlistId: id,
      },
      { headers }
    );
    return true;
  } catch (error) {
    ErrorHandler.onError(error);
    throw error;
  } finally {
    ErrorHandler.onLoadingClose();
  }
};
