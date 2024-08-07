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

// {
//   faqsList.map((faq, i) => (
//     <div className="accordion" id="accordionExample">
//       <div className="accordion-item">
//         <h2 className="accordion-header" id={i}>
//           <button
//             className="accordion-button"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target={`#${i}`}
//             aria-expanded="true"
//             aria-controls="collapseOne"
//           >
//             {faq.azst_faq_question}
//           </button>
//         </h2>
//         <div
//           id={i}
//           className="accordion-collapse collapse show"
//           aria-labelledby="headingOne"
//           data-bs-parent="#accordionExample"
//         >
//           <div className="accordion-body">{faq.azst_faq_ans}</div>
//         </div>
//       </div>
//     </div>
//   ));
// }
