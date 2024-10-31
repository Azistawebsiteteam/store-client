import React from "react";
import Accordion from "react-bootstrap/Accordion";

const Faqs = ({ faqsList }) => {
  return (
    <>
      {faqsList?.map((faq, i) => (
        <Accordion key={faq.azst_faq_id} defaultActiveKey="0" flush>
          <Accordion.Item eventKey={i}>
            <Accordion.Header>
              <strong style={{ color: "black" }}>
                {faq.azst_faq_question}?
              </strong>
            </Accordion.Header>
            <Accordion.Body>{faq.azst_faq_ans}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
};

export default Faqs;
