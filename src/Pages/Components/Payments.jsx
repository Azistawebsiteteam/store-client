import React, { useState } from "react";
import axios from "axios";

const Payments = () => {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);
  console.log(responseState, "responseState");
  // Load Razorpay script
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  // Create Razorpay order
  const createRazorPayOrder = (amount) => {
    const data = JSON.stringify({
      amount: amount * 100, // Convert to paise
      currency: "INR",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://192.168.214.253:5018/api/v1/orders/customer/payment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        console.log("Order created successfully:", res.data);
        handleRazorPayScreen(res.data.amount);
      })
      .catch((err) => {
        console.error("Error creating order:", err);
        alert("Failed to create order. Please try again later.");
      });
  };

  // Display Razorpay payment screen
  const handleRazorPayScreen = async (amount) => {
    console.log("loading screen");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection and try again."
      );
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Ensure this is set in your .env file
      amount: amount,
      currency: "INR",
      name: "Papaya Coders",
      description: "Payment to Papaya Coders",
      image: `${process.env.PUBLIC_URL}/images/logo1.svg`,
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: "Rajendra",
        email: "rajendraCheerneni@gmail.com",
      },
      theme: {
        color: "#FFE03F",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Fetch payment information
  const paymentFetch = async (e) => {
    e.preventDefault();
    const paymentId = e.target.paymentId.value;

    try {
      const response = await axios.get(
        `http://192.168.214.253:5018/api/v1/orders/customer/payment/${paymentId}`
      );
      setResponseState(response.data);
      alert("Payment information fetched successfully." + response.data);
    } catch (err) {
      console.error("Error fetching payment info:", err);
      alert("Failed to fetch payment information. Please try again later.");
    }
  };

  return (
    <div style={{ marginTop: "20%" }}>
      <h2>Payment</h2>
      <button onClick={() => createRazorPayOrder(100)}>Pay ₹100</button>
      <form onSubmit={paymentFetch}>
        <input
          type="text"
          name="paymentId"
          placeholder="Enter Payment ID"
          required
        />
        <button type="submit">Get Info</button>
      </form>
      {responseState && (
        <div>
          <h3>Payment Details</h3>
          <pre>{JSON.stringify(responseState, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Payments;
