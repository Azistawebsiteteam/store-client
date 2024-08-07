import React from "react";
import "./Policy.css";
import ScrollToTop from "../../Utils/ScrollToTop";

const SafteyAndSecurity = () => {
  return (
    <>
      <ScrollToTop />
      <div className="container">
        <div className="policyCont">
          <h3>Safety & Security</h3>
          <p>
            <strong>
              Are credit/debit card transactions on Azistastore.com secure?
            </strong>
          </p>
          <p>
            Azistastore.com offers one of the highest levels of transaction
            security available on the Internet for your online transaction. All
            credit card and debit card payments on Azistastore.com are processed
            through secure and trusted payment gateways managed by leading
            banks. We say this confidently, since Azistastore.com partners with
            a secure and trusted leader in online payment gateways to secure
            your card information and send it securely to the respective banks
            for payment processing. Thanks to technological advancements, banks
            are able to take stricter security measures, such as using 3D Secure
            password verification for online transactions.
          </p>
          <p>
            <strong>
              Does Azistastore.com store my credit/debit card information?
            </strong>
          </p>
          <p>
            When you enter your credit/debit card information on our platform,
            Azistastore.com or its trusted third-party payment gateway partner,
            we may store the first 6 and last 4 digits of your card number in a
            secure and encrypted manner. The first 6 digits (also known as the
            Bank Identification Number) represent the bank name and country
            where your card was issued.
            <br />
            The first 6 and the last 4 digits are together used for fraud
            detection and prevention measures.
          </p>
          <p>
            <strong>
              Does Azistastore.com accept all credit or debit cards?
            </strong>
          </p>
          <p>
            We accept Visa, MasterCard, Maestro, and American Express
            credit/debit cards. Apart from Credit and Debit Cards, payments by
            Internet banking are supported by all major banks in the country.
          </p>
          <p>
            <strong>Still, have questions?</strong>
          </p>
          <p>
            Contact us at any time.
            <br /> Azista Industries Pvt Ltd,
            <br /> Sy No. 83/1, Plot No.16/A/1 & 16/A/2,
            <br /> 19th & 20th Floor Hetero Tower, Commerzone,
            <br /> Silpa Gram Craft Village, Madhapur,
            <br /> Hyderabad, Shaikpet,
            <br /> Telangana, India, 500 081.
            <br />
            Toll-free Number:
            <a
              className="ps-1"
              href="tel:18001020576"
              target="_blank"
              rel="noreferrer"
            >
              1800 102 0576
            </a>
            <br />
            E-mail id:
            <a
              className="ps-1"
              href="mailto:ecommerce@azistaindustries.com"
              target="_blank"
              rel="noreferrer"
            >
              ecommerce@azistaindustries.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SafteyAndSecurity;
