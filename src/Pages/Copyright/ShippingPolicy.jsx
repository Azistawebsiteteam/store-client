import React from "react";
import "./Policy.css";
import ScrollToTop from "../../Utils/ScrollToTop";

const ShippingPolicy = () => {
  return (
    <>
      <ScrollToTop />
      <div className="container">
        <div className="policyCont">
          <h3 className="policyContTxt">Shipping Policy</h3>
          <p>
            <strong>Your order will arrive soon!</strong>
          </p>
          <p>
            We ship our orders within 24 hours of placing an order and deliver
            within 4-5 working days from the dispatch date. You will be charged
            shipping based on your cart value, products, shipping options, and
            location during checkout. On orders up to Rs.599, the shipping
            charge is Rs.49. On orders over Rs.599, there are no shipping
            charges. The minimum order value is Rs.150.
            <strong>
              You cannot place an order on the portal below Rs.150 in value.
            </strong>
          </p>
          <p>
            <strong>Any terms for Cash on Delivery (COD)?</strong>
          </p>
          <p>
            All orders will be subject to COD charges, which can be viewed at
            the time of payment. The charge shall not be refundable even if the
            order is returned or cancelled after it has been shipped.
          </p>
          <p>
            <strong>
              On orders over and above Rs.10, 000, Cash on Delivery is
              unavailable. Over and above Rs.10, 000, all orders must be paid in
              advance.
            </strong>
          </p>
          <p>
            We will send you an email confirmation for your order shortly after
            the completion of the transaction.
          </p>
          <p>
            <strong>Note</strong>
          </p>
          <p>
            Please check your spam or junk folder before contacting Azista
            Industries Pvt Ltd if you did not receive the email. We will email
            you instant confirmation of your order within 24 hours after placing
            it. If not, please write to us at
            <a
              className="ps-1"
              href="ecommerce@azistaindustries.com"
              target="_blank"
            >
              ecommerce@azistaindustries.com
            </a>
          </p>
          <p>
            You are important to us, especially when it comes to your health.
            Therefore, we will strive to ensure that all the products that you
            receive from us are on time, of the finest quality, and of the best
            condition. We have a Pan India coverage of couriers to expedite the
            delivery process of your order at your address of delivery.
            <br />
            We make every effort to deliver the product within 2-14 working days
            after it dispatches from our warehouse, depending on the location.
            Please note this is not a guarantee of delivery time. Nevertheless,
            certain circumstances delay the delivery of your order.
            <br />
            Azista Industries Pvt Ltd shall not be held responsible for delays
            during the shipping process. Our shipping timeline may vary if you
            access our Services through a partner's website or third party.
          </p>
          <p>
            We welcome any further questions and clarifications regarding our
            refund and return policy at the following email address: 
            <a href="ecommerce@azistaindustries.com" target="_blank">
              ecommerce@azistaindustries.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
