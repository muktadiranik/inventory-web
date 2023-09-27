import React, { useState } from "react";
import "./css/style.css";

const Accordion = ({ faq }) => {
  const [isActive, setIsActive] = useState(false);

  const languageName = localStorage.getItem("languageName");

  return (
    <li className='accordion-item' key={faq.id}>
      <div className='accordion-toggle' onClick={() => setIsActive(!isActive)}>
        {languageName === "EN" ? (
          <p>{faq.translations.en.question}</p>
        ) : (
          <p>{faq.translations.bn.question}</p>
        )}
        <span>{isActive ? "-" : "+"}</span>
      </div>

      {isActive && (
        <div className='accordion-content'>
          {languageName === "EN" ? (
            <p>{faq.translations.en.answer}</p>
          ) : (
            <p>{faq.translations.bn.answer}</p>
          )}
        </div>
      )}
    </li>
  );
};

export default Accordion;
