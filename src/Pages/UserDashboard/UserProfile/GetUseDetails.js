// Updated functions without 'use' prefix as these are not hooks.
import axios from "axios";
import swalHandle from "../../Components/ErrorHandler";

const baseUrl = process.env.REACT_APP_API_URL;

export const getWishlist = async (jwtToken, setWishlist, setWishlistCount) => {
  if (!jwtToken) return;
  try {
    const url = `${baseUrl}/whish-list`;
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    swalHandle.onLoading();
    const response = await axios.post(url, {}, { headers });
    setWishlist(response.data.whish_list);
    setWishlistCount(response.data.whish_list.length);
    swalHandle.onLoadingClose();
  } catch (error) {
    swalHandle.onLoadingClose();
    swalHandle.onError(error);
  }
};

export const getProfileDetails = async (jwtToken, setUserDetails) => {
  if (!jwtToken) return;
  try {
    console.log("gettingUserDetails");
    const url = `${baseUrl}/profile/data`;
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    swalHandle.onLoading();
    const response = await axios.post(url, {}, { headers });

    if (response.status === 200) {
      swalHandle.onLoadingClose();
      console.log(response);
      setUserDetails(response.data);
    }
  } catch (error) {
    swalHandle.onLoadingClose();
    swalHandle.onError(error);
  }
};
