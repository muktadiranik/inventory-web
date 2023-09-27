import React from "react";
import "./css/style.css";
import { CardImage_1 } from "../../Entryfile/imagepath";

const Invoicing = () => {
  return (
    <div className="business-container">
      <div className="box">
        <h3>Turn heads and open wallets</h3>
        <p>
          Create and send professional-looking invoices in seconds. Custom
          templates and automated reminders make getting paid even simpler.
        </p>
      </div>
      <div className="box">
        <img src={CardImage_1} alt="" />
      </div>
    </div>
  );
};

export default Invoicing;
