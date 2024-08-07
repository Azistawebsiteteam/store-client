/* eslint-disable import/no-anonymous-default-export */
import Swal from "sweetalert2";

const onLoading = () => {
  return Swal.fire({
    title: "Loading",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

const onLoadingClose = () => Swal.close();

const onSuccess = (message) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    text: "Your work has been saved",
    showConfirmButton: false,
    timer: 2000,
  });
};

const onError = (error) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.response ? error.response.data.message : error.message,
  });
};

export default { onError, onSuccess, onLoading, onLoadingClose };
