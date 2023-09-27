import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import {
  registerUserWithPlanAndCompanyAction,
  getGroupListAction,
} from "../redux/actions/authActions.js";
import { getCompanyTypeListAction } from "../redux/actions/companyActions.js";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Sidebar/header.jsx";
import { ToastContainer, toast } from "react-toastify";
import { getCurrencyListAction } from "../redux/actions/currencyActions.js";
import { getLanguageListAction } from "../redux/actions/languageActions.js";

const Registrationpage = (props) => {
  const dispatch = useDispatch();

  const { token, success, error } = useSelector((state) => state.userReducer);
  const { companyTypeList } = useSelector((state) => state.companyReducer);
  const { currencyList } = useSelector((state) => state.currencyReducer);
  const { languageList } = useSelector((state) => state.languageReducer);

  const [eye, seteye] = useState(true);
  const [eye2, seteye2] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");

  const onEyeClick = () => {
    seteye(!eye);
  };

  const onEyeClick2 = () => {
    seteye2(!eye2);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      company_title: companyTitle,
      company_type: companyType,
      email: email,
      password1: password,
      password2: confirmPassword,
      is_owner: true,
      is_editor: false,
      is_staff: true,
      language: language,
      currency: currency,
      plan: localStorage.getItem("planId"),
    };
    dispatch(registerUserWithPlanAndCompanyAction(data));
  };

  useEffect(() => {
    if (token && token.length > 0) {
      props.history.push("/app/main/dashboard");
    }
    if (!localStorage.getItem("planId")) {
      props.history.push("/");
    }
  }, [token]);

  useEffect(() => {
    dispatch(getCompanyTypeListAction());
    dispatch(getGroupListAction());
    dispatch(getLanguageListAction());
    dispatch(getCurrencyListAction());
    if (localStorage.getItem("language") && localStorage.getItem("currency")) {
      setLanguage(localStorage.getItem("language"));
      setCurrency(localStorage.getItem("currency"));
    }
  }, []);

  useEffect(() => {
    if (error) {
      if (error.response.data) {
        for (const key in error.response.data) {
          if (error.response.data.hasOwnProperty(key)) {
            const element = error.response.data[key];
            toast.error(`${key}: ${element[0]}`);
            break;
          }
        }
      }
    }
    if (success) toast.success("Logged in successfully");
  }, [error, success]);

  return (
    <>
      <Helmet>
        <title>Register - Tohobil Inventory</title>
        <meta name='description' content='Login page' />
      </Helmet>
      <Header />
      <ToastContainer />
      <div className='account-content mt-5'>
        <div className='container'>
          <div className='account-logo'>
            <Link to='/app/main/dashboard'>
              <img src={Applogo} alt="Dreamguy's Technologies" />
            </Link>
          </div>
          <div className='account-box' style={{ width: "65%" }}>
            <div className='account-wrapper'>
              <h3 className='account-title'>Register</h3>
              <p className='account-subtitle'>Access to our dashboard</p>
              <div>
                <form onSubmit={onSubmit}>
                  <div className='form-row'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <label>First Name</label>
                        <input
                          type='text'
                          className='form-control'
                          name='first_name'
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                        {firstName?.length >= 20 && (
                          <span className='text-danger mt-2 d-inline-block'>
                            Maximum 20 characters allowed
                          </span>
                        )}
                      </div>

                      <div className='col-md-6'>
                        <label>Last Name</label>
                        <input
                          type='text'
                          className='form-control'
                          name='last_name'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                        {lastName?.length >= 20 && (
                          <span className='text-danger mt-2 d-inline-block'>
                            Maximum 20 characters allowed
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <label>Phone</label>
                        <div className='input-group'>
                          <input
                            type='text'
                            className='form-control'
                            name='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                          {/* {phone?.length >= 15 && (
                            <span className='text-danger mt-2 d-inline-block'>
                              Maximum 15 characters allowed
                            </span>
                          )} */}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <label>Email</label>
                        <input
                          type='email'
                          className='form-control'
                          name='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label htmlFor='validationDefault03'>Company Title</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={companyTitle}
                        onChange={(e) => setCompanyTitle(e.target.value)}
                        required
                      />
                      {firstName?.length >= 20 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          Maximum 20 characters allowed
                        </span>
                      )}
                    </div>
                    {companyTypeList && companyTypeList.length > 0 && (
                      <div className='col-md-6'>
                        <label>Company Type</label>
                        <select
                          className='form-select'
                          required
                          onChange={(e) => {
                            setCompanyType(e.target.value);
                          }}>
                          <option value=''>Select</option>
                          {companyTypeList.map((companyType) => (
                            <option key={companyType.id} value={companyType.id}>
                              {companyType.company_type}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className='row'>
                    {languageList && languageList.length > 0 && (
                      <div className='col-md-6'>
                        <label>Language</label>
                        <select
                          required
                          value={language}
                          className='form-select'
                          onChange={(e) => {
                            setLanguage(e.target.value);
                          }}>
                          <option value=''>Select</option>
                          {languageList &&
                            languageList.map((language) => (
                              <option value={language.id} key={language.id}>
                                {language.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                    {currencyList && currencyList.length > 0 && (
                      <div className='col-md-6'>
                        <label>Currency</label>
                        <select
                          required
                          value={currency}
                          className='form-select'
                          onChange={(e) => {
                            setCurrency(e.target.value);
                          }}>
                          <option value=''>Select</option>
                          {currencyList &&
                            currencyList.map((currency) => (
                              <option value={currency.id} key={currency.id}>
                                {currency.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>Password</label>
                      <div className='pass-group'>
                        <input
                          type={eye ? "password" : "text"}
                          className='form-control'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <span
                          onClick={onEyeClick}
                          className={`fa toggle-password" ${
                            eye ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label htmlFor='validationDefault05'>
                        Repeat Password
                      </label>
                      <div className='pass-group'>
                        <input
                          type={eye2 ? "password" : "text"}
                          className='form-control'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <span
                          onClick={onEyeClick2}
                          className={`fa toggle-password" ${
                            eye2 ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  {firstName?.length <= 20 &&
                  lastName?.length <= 20 &&
                  phone?.length <= 15 ? (
                    <button
                      className='btn btn-primary account-btn mt-3'
                      type='submit'>
                      Register
                    </button>
                  ) : (
                    <button
                      className='btn btn-primary account-btn mt-3'
                      type='submit'
                      disabled>
                      Register
                    </button>
                  )}
                </form>
                <div className='account-footer'>
                  <p>
                    Already have an account? <Link to='/login'>Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registrationpage;
