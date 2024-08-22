// Updated functions without 'use' prefix as these are not hooks.
import axios from "axios";
import swalHandle from "../../Components/ErrorHandler";

const baseUrl = process.env.REACT_APP_API_URL;

export const getProfileDetails = async (jwtToken, setUserDetails) => {
  if (!jwtToken) return;
  try {
    const url = `${baseUrl}/profile/data`;
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    swalHandle.onLoading();
    const response = await axios.post(url, {}, { headers });

    if (response.status === 200) {
      swalHandle.onLoadingClose();
      setUserDetails(response.data);
    }
  } catch (error) {
    swalHandle.onLoadingClose();
    swalHandle.onError(error);
  }
};
