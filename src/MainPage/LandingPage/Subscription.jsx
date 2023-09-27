import React, { useEffect, useState, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { getPlanListAction } from "../../redux/actions/planActions";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap-v5";
import Accordion from "./Faq";
import "./css/style.css";
import "../../../src/assets/css/bootstrap.min.css";
import Header from "../../initialpage/Sidebar/header";
import { LandingLogo } from "../../Entryfile/imagepath";
import { CardIcon_1 } from "../../Entryfile/imagepath";
import { CardIcon_2 } from "../../Entryfile/imagepath";
import { CardIcon_3 } from "../../Entryfile/imagepath";
import { CardIcon_4 } from "../../Entryfile/imagepath";
import { CardIcon_5 } from "../../Entryfile/imagepath";
import { CardIcon_6 } from "../../Entryfile/imagepath";
import { CardIcon_7 } from "../../Entryfile/imagepath";
import { HomeMainImage } from "../../Entryfile/imagepath";
import { CustomerImage } from "../../Entryfile/imagepath";
import { InvoiceImage } from "../../Entryfile/imagepath";
import { headerlogo } from "../../Entryfile/imagepath";
import { getLanguageListAction } from "../../redux/actions/languageActions";
import { getCurrencyListAction } from "../../redux/actions/currencyActions";
import Business from "./Business";
import axios from "axios";
import { API_URL } from "../../redux/actions/API_URL";

const Subscriptionadmin = () => {
  const dispatch = useDispatch();

  const { planList } = useSelector((state) => state.planReducer);
  const { currencyList } = useSelector((state) => state.currencyReducer);
  const { languageList } = useSelector((state) => state.languageReducer);
  const { token } = useSelector((state) => state.userReducer);

  const history = useHistory();

  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (token && token.length > 0) {
      history.push("/app/main/dashboard");
    }
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
    dispatch(getPlanListAction());
    dispatch(getLanguageListAction());
    dispatch(getCurrencyListAction());
    axios.get(`${API_URL}/api/faqs/`).then((res) => {
      setFaqs(res.data);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("currency", currency);
    localStorage.setItem("language", language);

    for (let i = 0; i < languageList.length; i++) {
      if (languageList[i].id == language) {
        localStorage.setItem("languageName", languageList[i].name);
      }
    }
    setCloseModal(true, window.location.replace("/#price"));
  };

  const [closeModal, setCloseModal] = useState(false);
  const [featureTextShow, setFeatureTextShow] = useState(false);
  const [checkFeatureTitle, setCheckFeatureTitle] = useState("");
  const [faqs, setFaqs] = useState([]);

  const languageId = localStorage.getItem("language");
  const currencyId = localStorage.getItem("currency");
  const languageName = localStorage.getItem("languageName");

  return (
    <div className='landing-page mt-5'>
      <Helmet>
        <title>Tohobil Inventory</title>
        <meta name='description' content='Reactify Blank Page' />
      </Helmet>
      {languageId && currencyId ? (
        ""
      ) : (
        <>
          <div className={`custom-modal ${closeModal && "active"}`}>
            <div className='content'>
              <div
                id='close'
                className='fa-solid fa-xmark'
                onClick={() => setCloseModal(true)}></div>
              <img src={LandingLogo} alt='' />
              <h3>Please choose your language and currency</h3>
              {/* <h3>আপনার ভাষা এবং মুদ্রা নির্বাচন করুন</h3> */}
              <form onSubmit={submitHandler}>
                <div className='user-info landing-modal-info'>
                  <div className='landing-modal'>
                    <Form.Select
                      required
                      onChange={(e) => {
                        setCurrency(e.target.value);
                      }}>
                      <option value=''>Select currency</option>

                      {/* <option value=''>মুদ্রা নির্বাচন করুন</option> */}

                      {currencyList &&
                        currencyList.map((currency) => (
                          <option value={currency.id} key={currency.id}>
                            {currency.name}
                          </option>
                        ))}
                    </Form.Select>
                  </div>

                  <div className='landing-modal-select'>
                    <Form.Select
                      required
                      onChange={(e) => {
                        setLanguage(e.target.value);
                      }}>
                      <option value=''>Select language</option>
                      {/* <option value=''>ভাষা নির্বাচন করুন</option> */}

                      {languageList &&
                        languageList.map((language) => (
                          <option value={language.id} key={language.id}>
                            {language.name}
                          </option>
                        ))}
                    </Form.Select>
                  </div>
                  <button
                    data-bs-target='#PriceSection'
                    data-bs-toggle='price-container'
                    type='submit'>
                    submit
                    {/* সাবমিট */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <Header />

      <main>
        <section className='banner'>
          <div className='banner-container'>
            <div className='box'>
              {languageName == "BD" ? (
                <>
                  <p>অ্যাকাউন্টিং সফটওয়্যার | তহবিল | গ্লোবাল</p>
                  <h2>স্মার্ট কোম্পানির জন্য স্মার্ট অ্যাকাউন্টিং সুবিধা</h2>
                  <p className='text'>
                    ব্যবসার জন্য নিখুঁত এবং নির্ভুল পরিষেবা
                  </p>
                </>
              ) : (
                <>
                  <p>ACCOUNTING SOFTWARE | TOHOBIL | GLOBAL</p>
                  <h1>Smart accounting features for smart companies</h1>
                  <p className='text'>
                    Perfect service, perfect business Superior accuracy for
                    business
                  </p>
                </>
              )}

              <div className='btn-container'>
                {/* <button
                  className='buy-btn'
                  onClick={() =>
                    setCloseModal(true, window.location.replace("/#price"))
                  }>
                  Buy now & save 50%
                </button> */}

                {planList && planList.discount ? (
                  <button
                    className='buy-btn'
                    onClick={() =>
                      setCloseModal(true, window.location.replace("/#price"))
                    }>
                    {languageName === "BD"
                      ? "এখনই ক্রয় করুন এবং ৫০% সংরক্ষণ করুন"
                      : "Buy now & save 50%"}
                  </button>
                ) : (
                  <button
                    className='buy-btn'
                    onClick={() =>
                      setCloseModal(true, window.location.replace("/#price"))
                    }>
                    {languageName === "BD" ? "এখনই ক্রয় করুন" : "Buy now"}
                  </button>
                )}
                <button
                  className='trial-btn'
                  onClick={() =>
                    setCloseModal(true, window.location.replace("/#price"))
                  }>
                  {languageName === "BD"
                    ? "ট্রায়াল শুরু করুন"
                    : "Free 30-day trial"}
                </button>
              </div>
            </div>
            <div className='box'>
              <img src={HomeMainImage} alt='' />
            </div>
          </div>
        </section>
        <section className='tools'>
          <h2 className='title'>
            {languageName === "BD"
              ? "খুব সহজে ছোট এবং মাঝারি ব্যবসা পরিচালনা করার জন্য গুরুত্বপূর্ণ অ্যাকাউন্টিং সফটওয়্যার"
              : "Essential accounting software for managing small and medium businesses with ease"}
          </h2>
          <div className='tools-container'>
            <div className='tool'>
              <img src={CardIcon_1} alt='' />
              {languageName === "BD" ? (
                <>
                  <h3>সিস্টেম সমস্ত কিছু সংরক্ষণ করে </h3>
                  <p>
                    তহবিল অনলাইন সমস্ত কিছু তাদের সঠিক জায়গায় রাখে, তাই আপনি
                    সময়ের সাথে সময়ের সাথে যখন আপনার প্রয়োজন হয় তখন আপনি যা
                    প্রয়োজন তা পাবেন।
                  </p>
                </>
              ) : (
                <>
                  <h3>Shape Everything/Systemize Everything</h3>
                  <p>
                    Tohobil Online keeps everything in its right place, so
                    you’ll always have what you need when you need it.
                  </p>
                </>
              )}
            </div>
            <div className='tool'>
              <img src={CardIcon_4} alt='' />
              {languageName === "BD" ? (
                <>
                  <h3>সময় বাঁচান এবং সময় সংরক্ষণ করুন</h3>
                  <p>
                    হিসাবনিকাশ খুব সহজ। এটি আপনার খুব কম সময় নেবে। তহবিল নিজেই
                    আয় এবং ব্যায় হিসাব করে দেয়।
                  </p>
                </>
              ) : (
                <>
                  <h3>Time saver/Reduce Time</h3>
                  <p>
                    Accounting is made very easy. it will take you very little
                    time. The Tohobil itself calculates income and expenses.
                  </p>
                </>
              )}
            </div>
            <div className='tool'>
              <img src={CardIcon_2} alt='' />
              {languageName === "BD" ? (
                <>
                  <h3>আপডেট ব্যালেন্স এবং ফ্রেশ ব্যালেন্স</h3>
                  <p>
                    গ্রাহক এবং বিক্রেতার প্রতি অবশিষ্ট ব্যালেন্স পরিশোধ এবং
                    গ্রহণ করুন তহবিল এ।
                  </p>
                </>
              ) : (
                <>
                  <h3>Up-to-date balance/Fresh Balance</h3>
                  <p>
                    Pay and receive remaining balances per customer and borrower
                    in Tohobil Inventory.
                  </p>
                </>
              )}
            </div>
            <div className='tool'>
              <img src={CardIcon_3} alt='' />
              {languageName === "BD" ? (
                <>
                  <h3>আনলিমিটেড সাপোর্ট/২৪*৭</h3>
                  <p>
                    তহবিলের বিনামূল্য এবং সীমাহীন গ্রাহক সমর্থন সহ, সহায়তা সব
                    সময় ক্লিক একটি দূরে থাকে।
                  </p>
                </>
              ) : (
                <>
                  <h3>Not Stop Service/24*7 Support</h3>
                  <p>
                    With Tohobil free and unlimited customer support, help is
                    always just a click away.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
        <Business />
        <section className='price' id='price'>
          <h2 className='title'>
            {languageName === "EN"
              ? "Best and affordable accounting services"
              : "সবচেয়ে ভালো এবং সহজ হিসাবনিকাশ সেবা"}
          </h2>
          <div className='price-container' id='PriceSection'>
            {planList &&
              planList.map((plan) => (
                <div className='box' key={plan.id}>
                  <h3>{plan.title}</h3>
                  <div className='line'></div>
                  <p>Start your business</p>
                  <h4 className='price-details'>
                    {languageName === "BD" ? (
                      <span style={{ paddingRight: "2px", fontWeight: "600" }}>
                        ৳
                      </span>
                    ) : (
                      <span style={{ paddingRight: "2px" }}>$ </span>
                    )}
                    <span>{plan.price} </span>
                    <span> / {plan.duration} month</span>
                  </h4>
                  <button
                    className='first-btn'
                    onClick={(event) => {
                      localStorage.setItem("planId", plan.id);
                      history.push("/register");
                    }}>
                    Buy now
                  </button>
                  {plan &&
                    plan.plandetails_set.map((details) => (
                      <p key={details.id}>
                        <i className='fa-solid fa-chevron-down'></i>
                        {details.description}
                      </p>
                    ))}
                </div>
              ))}
          </div>
        </section>
        <section className='features'>
          {languageName === "BD" ? (
            <>
              <h2 className='title'>ব্যবসার জন্য সুবিধাসমূহ</h2>
            </>
          ) : (
            <>
              <h2 className='title'>
                Features that help you run your business
              </h2>
            </>
          )}
          <div className='features-container'>
            <div className='feature'>
              <img src={CardIcon_4} alt='' />
              <h3>{languageName === "BD" ? "ট্রানজেকশন" : "Transactions"}</h3>
              <div>
                {languageName === "BD" ? (
                  <>সমস্ত ট্রানজেকশন এবং ব্যালেন্স পরিশোধ এবং গ্রহণ</>
                ) : (
                  <>
                    All transactions and balances paid and received in Tohobil
                  </>
                )}

                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "Invocing" &&
                    "active"
                  }`}>
                  {languageName === "BD" ? (
                    <>
                      লেনদেন করার সাথে সাথে এর রেকর্ড সংরক্ষণ করা হয় যাতে
                      পরবর্তীতে ব্যবহারকারিকে কোন ঝামেলায় পড়তে না হয়।
                    </>
                  ) : (
                    <>
                      A record of the transaction is saved as soon as it is done
                      so that the user does not have to face any trouble later.
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("Invocing")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_5} alt='' />
              <h3>{languageName === "BD" ? "ইনভেন্টরি" : "Inventory"}</h3>
              <div>
                {languageName === "BD" ? (
                  <>
                    রিয়েল-টাইমে আপনার ইনভেন্টরি পরিচালনা করার সময় আপনার পণ্যের
                    পরিমাণের ম্যানেজ করুন ।
                  </>
                ) : (
                  <>
                    Manage your product quantities while managing your inventory
                    in real-time.
                  </>
                )}
                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "Inventory" &&
                    "active"
                  }`}>
                  {languageName === "BD" ? (
                    <>
                      পণ্য ক্রয় এবং বিক্রয়ের পর প্রতিটি পণ্যের পরিমাণ গণনা করা
                      হয়।
                    </>
                  ) : (
                    <>
                      The quantity of each product is calculated after purchase
                      and sale.
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("Inventory")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_7} alt='' />
              <h3>{languageName === "BD" ? "ইনকাম  " : "Income"}</h3>

              <div>
                {languageName === "BD" ? (
                  <>
                    আপনার ব্যবসার সমস্ত ইনকাম এবং ব্যালেন্স পরিশোধ এবং গ্রহণ
                    করুন।
                  </>
                ) : (
                  <>Pay and receive all your business income and balance.</>
                )}
                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "bankFeeds" &&
                    "active"
                  }`}>
                  {languageName === "BD" ? (
                    <>
                      ব্যবসায় ইনকাম বিক্রয় এবং ধার সব কিছুর হিসেবে শেষে
                      ব্যবসায়ের লাভ নির্ণয় করা হয় ।
                    </>
                  ) : (
                    <>
                      In business income, sales and borrowings are all included
                      in the final determination of business profit.
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("bankFeeds")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_7} alt='' />
              <h3>{languageName === "EN" ? "Expenses" : "এক্সপেন্স"}</h3>
              <div>
                {languageName === "BD" ? (
                  <>
                    ব্যবসায় এক্সপেন্স অথবা ব্যয় এখানে সকল ব্যয় হিসাব নির্নয় করা
                    হয়
                  </>
                ) : (
                  <> Manage all your business expenses here.</>
                )}

                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "mobileApp" &&
                    "active"
                  }`}>
                  {languageName === "BD" ? (
                    <>
                      ব্যবসায় ব্যয় ক্রয়, ইনভেস্ট, পেরোল, এবং ইত্যাদি সব কিছুর
                      হিসেবে শেষে ব্যবসায়ের লাভ নির্ণয় করা হয় ।
                    </>
                  ) : (
                    <>
                      All business expenses such as purchase, investment,
                      payroll, and so on are calculated as the final profit of
                      the business.
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("mobileApp")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_7} alt='' />
              <h3>
                {languageName === "BD"
                  ? "টোটাল ক্যাশ ব্যালেন্স"
                  : "Total at hand cash"}{" "}
              </h3>
              <div>
                {languageName === "BD" ? (
                  <>
                    লেনদেন এর পর ব্যবসায়িক ক্যাশ অর্থাৎ লেনদেন এর পর যে পরিমান
                    নগদ অর্থ ক্যাশ রয়েছে তা নির্ণয় করা হয়.
                  </>
                ) : (
                  <>
                    After the transaction, the amount of cash in business is
                    determined.
                  </>
                )}

                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "Expenses" &&
                    "active"
                  }`}>
                  {languageName === "BD" ? (
                    <>
                      লেনদেন এর পর ব্যবসায়িক ক্যাশ অর্থাৎ লেনদেন এর পর যে
                      পরিমান নগদ অর্থ ক্যাশ রয়েছে তা নির্ণয় করা হয়.
                    </>
                  ) : (
                    <>
                      After the transaction, the amount of cash in business is
                      determined.
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("Expenses")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_7} alt='' />
              <h3>
                {languageName === "BD"
                  ? "কাস্টমার ম্যানেজমেন্ট "
                  : "Customer Management"}
              </h3>

              <div>
                {languageName === "BD" ? (
                  <>
                    আপনার গ্রাহক এবং সরবরাহকারীদের পরিচালনা করুন এবং তাদের
                    যোগাযোগের বিবরণ, ক্রেডিট সীমা এবং আরও অনেক কিছুর উপর নজর
                    রাখুন।
                  </>
                ) : (
                  <>
                    Manage your customers and suppliers, and keep track of their
                    contact details, credit limits, and more.
                  </>
                )}

                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "captureOrganize" &&
                    "active"
                  }`}>
                  {languageName === "BD" ? (
                    <>
                      কাস্টমারের লেনদেনের উপর ভিত্তি করে পরিশোধিত এবং অপরিশোধিত
                      মূল্য হিসব করা হয়
                    </>
                  ) : (
                    <>
                      Based on customer transactions, Paid and unpaid prices are
                      calculated.
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("captureOrganize")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_7} alt='' />
              <h3>
                {languageName === "BD"
                  ? "মাল্টিপল কোম্পানি পরিচালনা "
                  : "Multi Company Management"}
              </h3>
              <div>
                {languageName === "BD" ? (
                  <>
                    একজন কোম্পানির মালিক মাল্টিপল কোম্পানি পরিচালনা করতে পারেন
                    এক্ষেত্রে আলাদা আলাদা ইউজার অথবা ইডিটর তৈরি করতে পারেন
                  </>
                ) : (
                  <>
                    A single company owner can manage multiple companies in this
                    case, you can create separate users or editors.
                  </>
                )}

                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "insightsReports" &&
                    "active"
                  }`}>
                  {languageName === "BD" ? (
                    <>
                      আপনার কোম্পানির সমস্ত তথ্য একটি স্থানে সংরক্ষণ করুন এবং
                      একটি স্থান থেকে সমস্ত তথ্য প্রদর্শন করুন।
                    </>
                  ) : (
                    <>
                      Keep all your company's information in one place and
                      display all information from one place.
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("insightsReports")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_7} alt='' />
              <h3>{languageName === "BD" ? "সেকিউরিটি" : "Security"}</h3>
              <div>
                {languageName === "BD"
                  ? "আপনার তথ্য সম্পূর্ণ সুরক্ষিত এবং সময়সীমার মধ্যে সমন্বয় করুন।"
                  : "Keep your information safe and compliant at all times."}
                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "Security" &&
                    "active"
                  }`}>
                  {languageName === "BD"
                    ? "আপনার মূল্যবান তথ্য খুবই নিরাপত্তার সাথে সংরক্ষণ করা হয় । সে ক্ষেত্রে তথ্য বা ডাটা নিয়ে চিন্তা মুক্ত থাকুন। "
                    : "Keep your valuable information safe with high security. In that case, be free from worry about data or information."}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("Security")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
            <div className='feature'>
              <img src={CardIcon_5} alt='' />
              <h3>
                {languageName === "BD"
                  ? "প্রোডাক্ট ম্যানেজমেন্ট"
                  : "Product Management"}
              </h3>

              <div>
                {languageName === "BD"
                  ? "স্টক ম্যানেজমেন্ট এবং পণ্যের দাম অনুসারে খুবই সুন্দর এবং সহজে পণ্য ক্রয় বিক্রয় হিসেবে নির্ণয় করা হযেছে। "
                  : "Stock management and product pricing is very beautiful and easy to decide as a purchase and sale."}
                <p
                  className={`feature-text-show ${
                    featureTextShow &&
                    checkFeatureTitle == "multiCurrency" &&
                    "active"
                  }`}>
                  {languageName === "BD"
                    ? "ক্যাটাগরি অনুসারে নতুন পণ্য তৈরি এবং পণ্যের বাজারজাত করা, ক্যাটাগরি অনুসারে পণ্য তৈরির ফলে পণ্য সমূহ ফিল্টার করতে সহজ হয়েছে। "
                    : "New product creation and product marketization by category, product creation by category has become easy to filter products."}
                </p>
              </div>
              <button
                onClick={() =>
                  setFeatureTextShow(
                    !featureTextShow,
                    setCheckFeatureTitle("multiCurrency")
                  )
                }>
                {languageName === "BD" ? "আরও জানুন" : "Learn more"}
              </button>
            </div>
          </div>
        </section>
        <section className='faq'>
          {languageName === "BD" ? (
            <h2 className='title'>আপনার জিজ্ঞাসাগুলো</h2>
          ) : (
            <h2 className='title'>Frequently Asked Questions</h2>
          )}
          <ul className='accordion'>
            {faqs &&
              faqs.length > 0 &&
              faqs.map((faq) => <Accordion faq={faq} />)}
          </ul>
        </section>
        <section className='last'>
          <div className='box' style={{ marginBottom: "4rem" }}>
            <img className='inv-image' src={InvoiceImage} alt='' />
            <div className='content'>
              <h2>Send better invoices and get paid faster</h2>
              <p>
                Create custom, professional invoices in a few easy steps and go
                from sent to paid in days.
              </p>
            </div>
          </div>

          <h2 className='title customer-review-title'>
            {languageName === "BD"
              ? "তহবিল ইনভেন্টরি ব্যবহার করে বিশ্বব্যাপী ৪.৫ মিলিয়ন গ্রাহকদের সাথে যোগ দিন"
              : "Join 4.5 million customers worldwide using Tohobil Inventory"}
          </h2>
          <div className='box'>
            <img src={CustomerImage} alt='' />
            <div className='content'>
              <p>
                {languageName === "BD" ? (
                  <>
                    তহবিল ইনভেন্টরির আগে আমি আমার ব্যবসার অ্যাকাউন্টিং দিককে ভয়
                    পেতাম। এখন আমি মিনিটের মধ্যে সবকিছু করতে পারি এবং আমি যা
                    পছন্দ করি তা করতে সময় ব্যয় করতে পারি।
                  </>
                ) : (
                  <>
                    Before Tohobil Inventory I dreaded the accounting side of my
                    business. Now I can get everything done in minutes and spend
                    time doing what I love.
                  </>
                )}
              </p>
              <p className='customer-review-name'>
                Ash Read, Full time self-employed
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className='first'>
          <div className='content'>
            <div className='box'>
              <h3>Small Businesses</h3>
              <a href='#'>Features</a>
              <a href='#'>Plans & Pricing</a>
              <a href='#'>Compare Products</a>
            </div>
            <div className='box'>
              <h3>Features & Benefits</h3>
              <a href='#'>Cloud Accounting</a>
              <a href='#'>Invoicing</a>
              <a href='#'>Accounting Reports</a>
              <a href='#'>Inventory Management</a>
            </div>
            <div className='box'>
              <h3>Accountants & Bookkeepers</h3>
              <a href='#'>Grow Your Practice Online</a>
              <a href='#'>Features</a>
              <a href='#'>Upcoming Events</a>
            </div>
            <div className='box'>
              <h3>Learn & Support</h3>
              <a href='#'>Tohobil Online Support</a>
              <a href='#'>Contact Tohobil Online Support</a>
              <a href='#'>Tohobil Online FAQ</a>
              <a href='#'>Tohobil Accounting Glossary</a>
              <a href='#'>Tohobil Resources</a>
            </div>
          </div>
        </div>
        <div className='second'>
          <div className='content'>
            <div className='box'>
              <div className='second-items'>
                <img src={headerlogo} alt='' />
                <h3>Tohobil</h3>
              </div>
            </div>
            <div className='box'>
              <div className='social-media'>
                <a href=''>
                  <i
                    style={{ background: "#3b5998" }}
                    className='fa-brands fa-facebook-f'></i>
                </a>
                <a href=''>
                  <i
                    style={{ background: "#0866c2" }}
                    className='fa-brands fa-linkedin-in'></i>
                </a>
                <a href=''>
                  <i
                    style={{ background: "#00acee" }}
                    className='fa-brands fa-twitter'></i>
                </a>
                <a href=''>
                  <i
                    style={{ background: "#cd2371" }}
                    className='fa-brands fa-instagram'></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='third'>
          <div className='content'>
            <div className='box'>
              <p className='copy-right-text'>
                &copy; 2022 All rights reserved.
              </p>
              <p>
                Tohobil, are registered trademarks of{" "}
                <a href='https://devxhub.com/'>DevXHub</a> Terms and conditions,
                features, support, pricing, and service options subject to
                change without notice.Inc. Terms and conditions, features,
                support, pricing, and service options subject to change without
                notice.
              </p>
              <p>
                By accessing and using this page you agree to the Terms and
                Conditions.
              </p>
              <a
                className='terms-condition-text'
                href='https://devxhub.com/terms-of-Use'>
                Terms of Services
              </a>
            </div>
            <div className='box'></div>
            <div className='box'>
              <a className='privacy' href='https://devxhub.com/privacy-policy'>
                Privacy & Policy
              </a>
              <span className='footer-gaps'>| |</span>
              <a className='privacy' href='https://devxhub.com/terms-of-Use'>
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Subscriptionadmin;
