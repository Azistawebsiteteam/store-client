import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import SideBar from "../UserProfile/SideBar";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import DropdownComponent from "../../Components/DropdownComponent";
import "../index.css";
import ScrollToTop from "../../../Utils/ScrollToTop";
import moment from "moment";
import ErrorHandler from "../../Components/ErrorHandler";

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cancelOrderReason, setCancelOrderReason] = useState("0");
  const [otherReason, setOtherReason] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [cancellationReason, setCancellationReason] = useState("");

  const debounceRef = useRef(null);
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = Cookies.get(process.env.REACT_APP_JWT_TOKEN);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const url = `${baseUrl}/orders/customer/all`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });
        if (searchTerm === "") {
          setOrders(response.data);
          return;
        }
      } catch (error) {
        ErrorHandler.onError(error);
      }
    };
    getOrderDetails();
  }, [baseUrl, token, searchTerm]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current); // Clear previous timer
    }

    debounceRef.current = setTimeout(() => {
      const filtered = orders
        .map((order) => ({
          ...order,
          products_details: order?.products_details.filter((each) =>
            each.product_title.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((order) => order.products_details.length > 0); // Only include orders with matching products

      setFilteredOrders(filtered);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, orders]);

  const orderStatusValue = (val, del) => {
    switch (val) {
      case 0:
        return "Order Placed";
      case 1:
        return orderShipmentStatus(del);
      case 2:
        return "Rejected";
      default:
        return null;
    }
  };

  const orderShipmentStatus = (val) => {
    switch (val) {
      case 0:
        return "Order Shipped";
      case 1:
        return "Out for Delivery";
      case 2:
        return "Delivered";
      default:
        return null;
    }
  };

  const closeModal = () => {
    const btn = document.getElementById("modalCloseBtn");
    btn.click();
  };

  const handleSearchOrder = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const submitCancelOrder = async (e, orderId) => {
    if (cancelOrderReason === "0") {
      setCancellationReason("Please select a reason for cancelling the order.");
      return;
    }
    try {
      const url = `${baseUrl}/orders/customer/cancel-order`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = {
        orderId,
        reason: cancelOrderReason === "7" ? otherReason : cancelOrderReason,
      };
      ErrorHandler.onLoading();
      const response = await axios.post(url, data, { headers });
      if (response.status === 200) {
        const updatedOrders = filteredOrders.map((each) => {
          if (each.azst_order_id === orderId) {
            return { ...each, azst_orders_status: 0 };
          }
          return each;
        });
        ErrorHandler.onLoadingClose();
        setCancelOrderReason("0");
        setOtherReason("");
        closeModal();
        setFilteredOrders(updatedOrders);
      }
    } catch (error) {
      ErrorHandler.onLoadingClose();
      ErrorHandler.onError(error);
    }
  };

  const handleCancelOrderReason = (e) => {
    setCancelOrderReason(e.target.value);
  };

  const handleOtherReason = (e) => {
    setOtherReason(e.target.value);
  };

  return (
    <>
      <ScrollToTop />
      <div className="userProfileSec">
        <div className="d-flex">
          <SideBar />
          <div className="ordersCont">
            <h5 style={{ fontFamily: "outFit" }}>Orders</h5>
            <div
              className="d-flex justify-content-md-between align-items-center"
              style={{ borderBottom: "1px solid #D6D6D6", paddingBottom: "1%" }}
            >
              <div className="">
                <small>View by</small>
                <DropdownComponent />
              </div>
              <div style={{ position: "relative", borderRadius: "4px" }}>
                <input
                  type="search"
                  placeholder="Search your orders here"
                  className="orderPgSearchBox"
                  style={{
                    width: "100%",
                    padding: "6px 40px 6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    outline: "transparent",
                  }}
                  onChange={handleSearchOrder}
                />
                <div
                  className="orderPgSearchIcon"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                  }}
                >
                  <IoSearchOutline size={20} />
                </div>
              </div>
            </div>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, i) => (
                <div key={i} className="orderDetails">
                  <div className="orderDetailsTopSec d-flex flex-wrap justify-content-md-between">
                    <div className="detailHeading col-8 col-md-3">
                      <span className="d-block" style={{ color: "#858585" }}>
                        Order Placed on
                      </span>
                      <span className="value">
                        {moment(order.azst_orders_created_on).format(
                          "DD MMM, YYYY"
                        )}
                      </span>
                    </div>
                    <div className="detailHeading col-4 col-md-3">
                      <span className="d-block" style={{ color: "#858585" }}>
                        Status
                      </span>
                      <span className="value">
                        {order.azst_orders_status === 0
                          ? "Cancelled"
                          : orderStatusValue(
                              order.azst_orders_confirm_status,
                              order.azst_orders_delivery_status
                            )}
                      </span>
                    </div>
                    <div className="detailHeading col-8 col-md-3">
                      <span className="d-block" style={{ color: "#858585" }}>
                        Order ID
                      </span>
                      <span className="value">{order.azst_order_id}</span>
                    </div>
                    <div className="detailHeading col-4 col-md-3">
                      <span className="d-block" style={{ color: "#858585" }}>
                        Order Value
                      </span>
                      <span className="value">
                        Rs.{order.azst_orders_total}
                      </span>
                    </div>
                  </div>
                  <div className="orderDetailsBotSec">
                    <div className="orderedProducts">
                      {order.products_details.map((each, i) => (
                        <div
                          className="d-flex align-items-md-center mb-3"
                          key={i}
                        >
                          <img
                            src={each.product_image}
                            alt="orderImage"
                            className="orderedProductImg"
                          />
                          <div className="ms-2 orderedProductInfo">
                            <span className="d-block">
                              {each.product_title}
                            </span>
                            {each.option1 !== 0 && (
                              <span style={{ color: "#858585" }}>
                                {each.option1}
                              </span>
                            )}
                            {each.option2 && (
                              <span style={{ color: "#858585" }}>
                                {each.option2}
                              </span>
                            )}
                            {each.option3 && (
                              <span style={{ color: "#858585" }}>
                                {each.option3}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex flex-column orderedProductBtns">
                      <Link
                        to={`/order-details/${order.azst_order_id}`}
                        className="orderedProductBtn"
                      >
                        Order Details
                      </Link>
                      {order.azst_orders_delivery_status === 2 && (
                        <Link className="orderedProductBtn">
                          Write a Review
                        </Link>
                      )}
                      {order.azst_orders_delivery_status === 2 ? (
                        <button className="orderedProductBtn">Reorder</button>
                      ) : (
                        order.azst_orders_status !== 0 && (
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#cancelOrder${order.azst_order_id}`}
                            className={
                              order.azst_orders_status !== 0
                                ? "orderedProductBtn"
                                : "cancelledBtn"
                            }
                          >
                            {order.azst_orders_status !== 0
                              ? "Cancel order"
                              : "Order Cancelled"}
                          </button>
                        )
                      )}
                      {order.azst_orders_delivery_status === 2 && (
                        <Link
                          to="/azst/orders/return"
                          state={{ orderId: order.azst_order_id }}
                          className="orderedProductBtn"
                        >
                          Return
                        </Link>
                      )}
                    </div>
                    <div
                      className="modal fade"
                      id={`cancelOrder${order.azst_order_id}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content reviewModalContent">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Request cancellation
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={handleCancelOrderReason}
                              value={cancelOrderReason}
                            >
                              <option value="0">Cancellation reason</option>
                              <option value="1">
                                Order Created by Mistake
                              </option>
                              <option value="2">
                                Item(s) Would Not Arrive on Time
                              </option>
                              <option value="3">Shipping Cost Too High</option>
                              <option value="4">
                                Found Cheaper Somewhere Else
                              </option>
                              <option value="4">
                                Need to Change Shipping Address
                              </option>
                              <option value="5">
                                Need to Change Billing Address
                              </option>
                              <option value="6">
                                Need to Change Payment Method
                              </option>
                              <option value="7">Other Reason</option>
                            </select>
                            {cancelOrderReason === "7" ? (
                              <textarea
                                className="form-control  mt-2"
                                id="otherReason"
                                rows="3"
                                onChange={handleOtherReason}
                                value={otherReason}
                                placeholder="Enter your reason..."
                              ></textarea>
                            ) : null}
                            <small>{cancellationReason}</small>
                          </div>
                          <div className="modal-footer">
                            <button
                              id="modalCloseBtn"
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              onClick={(e) =>
                                submitCancelOrder(e, order.azst_order_id)
                              }
                              className="btn btn-danger"
                            >
                              Proceed
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center h-75">
                <h6>No orders found</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
