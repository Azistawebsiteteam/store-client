import axios from "axios";
import React, { useEffect, useState } from "react";
import Faqs from "./Faqs";
import "./Customer.css";
import ButtonRow from "./ButtonRow";
import ScrollToTop from "../../Utils/ScrollToTop";

const FaqsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [faqTypes, setFaqTypes] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const faqsContent = async () => {
      const faqUrl = `${baseUrl}/faqs/customer`;
      const response = await axios.get(faqUrl);
      const { faqTypes, faqs } = response.data;
      setFaqTypes(faqTypes);
      setFaqs(faqs);
    };
    faqsContent();
  }, [baseUrl]);

  return (
    <>
      <ScrollToTop />
      <div className="userPage">
        <div className="faqsPage">
          <p style={{ fontWeight: "600", marginBottom: "0" }}>
            Frequently Asked Questions
          </p>
          <h3 className="text-center faqHeading">
            Common Queries Answered for <br />
            Your Convenience
          </h3>
          <ButtonRow items={faqTypes} />
        </div>
        <div className="faqsInfo">
          {faqs.map((each, i) => (
            <div
              className="faqsSpacing"
              key={i}
              style={{ backgroundColor: i % 2 === 0 ? "#F9F9FC" : "#fff" }}
            >
              <div className="faqInnerSec">
                <div className="ctn">
                  <span id={each.azst_faq_type}>&nbsp;</span>
                </div>
                <h4 className="text-center">{each.azst_faq_type}</h4>
                <div className="mt-2">
                  <Faqs faqsList={each.type_faqs} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqsPage;
