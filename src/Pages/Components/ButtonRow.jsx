import React, { useState } from "react";

const ButtonRow = ({ items, handleChange, defaultItem }) => {
  const [selectedFaq, setSelectedFaq] = useState(defaultItem);

  const onChangeHandle = (each) => {
    if (handleChange) {
      handleChange(each);
    }
    setSelectedFaq(each);
  };
  return (
    <div className="faqBtnCont">
      {items.map((each, i) => (
        <a
          key={i}
          href={`#${each}`}
          className={`faqBtn linkBtn ${selectedFaq === each && "activeFaq"}`}
          onClick={() => onChangeHandle(each)}
        >
          {each}
        </a>
      ))}
    </div>
  );
};

export default ButtonRow;
