import axios from "axios";
import React, { useEffect, useState } from "react";
import Faqs from "./Faqs";
import "./Customer.css";
import { Button } from "bootstrap";
import ButtonRow from "./ButtonRow";

const FaqsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [faqTypes, setFaqTypes] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const faqsContent = async () => {
      const faqUrl = `${baseUrl}/faqs/customer`;
      const response = await axios.get(faqUrl);
      console.log(response);
      const { faqTypes, faqs } = response.data;
      setFaqTypes(faqTypes);
      setFaqs(faqs);
    };
    faqsContent();
  }, [baseUrl]);

  return (
    <div className="userPage" style={{ margin: "6% 0 0 0" }}>
      <div className="faqsPage">
        <p style={{ fontWeight: "600" }}>Frequently Asked Questions</p>
        <h4 className="text-center">
          Common Queries Answered for <br />
          Your Convenience
        </h4>
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
  );
};

export default FaqsPage;
