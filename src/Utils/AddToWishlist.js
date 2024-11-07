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

export const AddToWishlist = async (productId, variantId) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const tokenKey = process.env.REACT_APP_JWT_TOKEN;
  const jwtToken = Cookies.get(tokenKey);

  if (!jwtToken) {
    return window.location.replace("/login");
  }

  try {
    const url = `${baseUrl}/whish-list/add`;
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
    throw error; // Rethrow if further handling is needed in calling function
  } finally {
    ErrorHandler.onLoadingClose();
  }
};
