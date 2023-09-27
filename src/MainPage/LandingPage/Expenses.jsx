import React from "react";
import "./css/style.css";
import { CardImage_1 } from "../../Entryfile/imagepath";

const Expenses = () => {
  const languageName = localStorage.getItem("languageName");
  return (
    <div className='business-container'>
      <div className='box'>
        {languageName === "BD" ? (
          <>
            <h3> সব রিপোর্ট এক সাথে পান এখানে থেকে</h3>
            <p>
              একসাথে স্বয়ংক্রিয়ভাবে আপনার মোট নগদ ব্যালেন্স দেখতে পাবে, যার
              মধ্যে আয় এবং খরচ এবং প্রদেয় এবং প্রাপ্য একসাথে রয়েছে।
            </p>
          </>
        ) : (
          <>
            <h3>Get all reports at once here</h3>
            <p>
              Get All Together will automatically see your total cash balance,
              including income and expenses and payables and receivables,
              together.
            </p>
          </>
        )}
      </div>
      <div className='box'>
        <img src={CardImage_1} alt='' />
      </div>
    </div>
  );
};

export default Expenses;
