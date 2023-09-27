import React from "react";
import "./css/style.css";
import { CardImage_1 } from "../../Entryfile/imagepath";
const Reports = () => {
  return (
    <div className="business-container">
      <div className="box">
        <h3>Run a report in seconds</h3>
        <p>
          See how your business is doing with a range of popular reports. Or
          customise one to include details that matter to you.
        </p>
      </div>
      <div className="box">
        <img src={CardImage_1} alt="" />
      </div>
    </div>
  );
};

export default Reports;
