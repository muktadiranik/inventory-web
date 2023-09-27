import React from "react";
import { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { headerlogo, Avatar_21 } from "../../Entryfile/imagepath";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanAuthKeyToken,
  getUserDetailsAction,
  getUserPreferenceAction,
} from "../../redux/actions/authActions";
import {
  getCompanyListAction,
  changeCompanyAction,
  getUserPreferenceCompanyAction,
} from "../../redux/actions/companyActions";
import { getLanguageListAction } from "../../redux/actions/languageActions";
import { getCSIBTypeListAction } from "../../redux/actions/customerActions";
import { getCurrencyListAction } from "../../redux/actions/currencyActions";
import {
  getCSIBLatestBorrowersAction,
  getCSIBLatestCustomersAction,
  getCSIBLatestInvestorsAction,
  getCSIBLatestSuppliersAction,
} from "../../redux/actions/customerActions";
import { getTopTransactionAction } from "../../redux/actions/transactionActions";
import { API_URL } from "../../redux/actions/API_URL";

const Header = (props) => {
  const dispatch = useDispatch();

  const {
    userDetails,
    updatedUserDetails,
    updatedUserPreference,
    token,
    userPreference,
  } = useSelector((state) => state.userReducer);
  const { company, companyList, addedCompany, deleteSuccess } = useSelector(
    (state) => state.companyReducer
  );
  const { languageList } = useSelector((state) => state.languageReducer);
  const { currencyList } = useSelector((state) => state.currencyReducer);

  const ref1 = useRef(false);
  const ref2 = useRef(false);

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const onMenuClik = () => {
    props.onMenuClick();
  };

  const onLogoutClick = () => {
    dispatch(cleanAuthKeyToken());
    props.history.push("/");
  };

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
    } else {
      if (!token) {
        props.history.push("/");
      }
    }
  }, [token]);

  useEffect(() => {
    if (ref1.current) {
      if (token && token.length > 0) {
        dispatch(getUserPreferenceCompanyAction());
        if (userPreference && userPreference.company) {
          dispatch(getUserPreferenceAction());
          return;
        }
        if (updatedUserDetails && updatedUserDetails.id) {
          dispatch(getUserDetailsAction());
          return;
        }
      }
    }
    ref1.current = true;
  }, [updatedUserDetails, updatedUserPreference]);

  useEffect(() => {
    if (token && token.length > 0) {
      dispatch(getCSIBTypeListAction());
      dispatch(getLanguageListAction());
      dispatch(getCurrencyListAction());
      dispatch(getUserPreferenceCompanyAction());
      dispatch(getUserPreferenceAction());
      dispatch(getUserDetailsAction());
    }
  }, []);

  const languageName = localStorage.getItem("languageName");

  useEffect(() => {
    if (ref2.current) {
    }
    if (token && token.length > 0) {
      dispatch(getCompanyListAction());
    }
  }, [addedCompany, deleteSuccess]);

  let pathname = location.pathname;

  return (
    <div className='header' style={{ right: "0px" }}>
      {token && token.length > 0 && (
        <a
          id='toggle_btn'
          href='#'
          style={{
            display: pathname.includes("tasks")
              ? "none"
              : pathname.includes("compose")
              ? "none"
              : "",
          }}
          onClick={handlesidebar}>
          <span className='bar-icon'>
            <span />
            <span />
            <span />
          </span>
        </a>
      )}
      <div className='header-left'>
        {token && token.length > 0 ? (
          <Link to='/app/main/dashboard' className='logo'>
            <img src={headerlogo} width={40} height={40} alt='' />
          </Link>
        ) : (
          <Link to='/' className='logo'>
            <img src={headerlogo} width={40} height={40} alt='' />
          </Link>
        )}
      </div>
      <div className='page-title-box'>
        <Link to='/' className='logo'>
          <h3>Tohobil</h3>
        </Link>
      </div>

      <a
        id='mobile_btn'
        className='mobile_btn'
        href='#'
        onClick={() => onMenuClik()}>
        <i className='fa fa-bars' />
      </a>
      <ul className='nav user-menu'>
        <li className='nav-item dropdown flag-nav'></li>
        {token && token.length > 0 && company && (
          <li className='nav-item dropdown has-arrow flag-nav  nav-idropdown-item-flag'>
            <a
              className='nav-link dropdown-toggle'
              data-bs-toggle='dropdown'
              href='#'
              role='button'>
              <span>{company.title}</span>
            </a>
            <div className='dropdown-menu dropdown-menu-right'>
              {companyList &&
                companyList.map((company) => (
                  <button
                    key={company.id}
                    onMouseUp={() => {
                      dispatch(getTopTransactionAction(company.id, token));
                      dispatch(getCSIBLatestCustomersAction(company.id));
                      dispatch(getCSIBLatestSuppliersAction(company.id));
                      dispatch(getCSIBLatestInvestorsAction(company.id));
                      dispatch(getCSIBLatestBorrowersAction(company.id));
                    }}
                    onClick={() => {
                      dispatch(
                        changeCompanyAction(
                          company.id,
                          userPreference.currency,
                          userPreference.language
                        )
                      );
                    }}
                    className='dropdown-item'>
                    {company.title}
                  </button>
                ))}
            </div>
          </li>
        )}
        {token &&
          token.length > 0 &&
          userPreference &&
          userPreference.language_name && (
            <li className='nav-item dropdown has-arrow flag-nav  nav-idropdown-item-flag'>
              <a
                className='nav-link dropdown-toggle'
                data-bs-toggle='dropdown'
                href='#'
                role='button'>
                <span>{userPreference.language_name}</span>
              </a>
              <div className='dropdown-menu dropdown-menu-right lan-drop'>
                {languageList &&
                  languageList.map((language) => (
                    <button
                      key={language.id}
                      className='dropdown-item'
                      onClick={() => {
                        dispatch(
                          changeCompanyAction(
                            company.id,
                            userPreference.currency,
                            language.id
                          )
                        );
                      }}>
                      {language.name}
                    </button>
                  ))}
              </div>
            </li>
          )}
        {token &&
          token.length > 0 &&
          userPreference &&
          userPreference.currency_name && (
            <li className='nav-item dropdown has-arrow flag-nav  nav-idropdown-item-flag'>
              <a
                className='nav-link dropdown-toggle'
                data-bs-toggle='dropdown'
                href='#'
                role='button'>
                <span>{userPreference.currency_name}</span>
              </a>

              <div className='dropdown-menu dropdown-menu-right'>
                {currencyList &&
                  currencyList.map((currency) => (
                    <button
                      key={currency.id}
                      className='dropdown-item'
                      onClick={() => {
                        dispatch(
                          changeCompanyAction(
                            company.id,
                            currency.id,
                            userPreference.language
                          )
                        );
                      }}>
                      {currency.name}
                    </button>
                  ))}
              </div>
            </li>
          )}
        {token && token.length > 0 ? (
          <li className='nav-item dropdown has-arrow main-drop'>
            <a
              href='#'
              className='dropdown-toggle nav-link'
              data-bs-toggle='dropdown'>
              <span className='user-img me-1'>
                {userDetails && userDetails.image ? (
                  <img src={`${API_URL}${userDetails.image}`} alt='user' />
                ) : (
                  <img src={Avatar_21} alt='' />
                )}

                <span className='status online' />
              </span>
              {userDetails && userDetails.first_name && (
                <span>{userDetails.first_name}</span>
              )}
            </a>
            <div
              className='dropdown-menu profile-dropdown'
              style={{ marginRight: "1rem" }}>
              <Link
                className='dropdown-item '
                style={{ marginBottom: "3px", fontSize: "16px" }}
                to='/app/user/profile'>
                {userPreference && userPreference.language_name === "EN"
                  ? "Profile"
                  : "প্রোফাইল"}
              </Link>
              <button
                className='dropdown-item'
                style={{ marginBottom: "3px", fontSize: "16px" }}
                onClick={onLogoutClick}>
                {userPreference && userPreference.language_name === "EN"
                  ? "Sign Out"
                  : "সাইন আউট"}
              </button>
            </div>
          </li>
        ) : (
          <li className='nav-item dropdown main-drop sign-in'>
            <Link to='/login' className='dropdown-toggle nav-link sign-in-link'>
              {languageName === "BD" ? "সাইন ইন" : "Sign In"}
            </Link>
          </li>
        )}
        <div className='dropdown mobile-user-menu'>
          {token && token.length > 0 ? (
            <div>
              <a
                href='#'
                className='nav-link dropdown-toggle'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <i className='fa fa-ellipsis-v' />
              </a>
              <div className='dropdown-menu dropdown-menu-right'>
                <div>
                  <Link className='dropdown-item' to='/app/user/profile'>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Profile"
                      : "প্রোফাইল"}
                  </Link>
                  <Link className='dropdown-item' to='/login'>
                    <button
                      style={{ marginBottom: "3px", fontSize: "16px" }}
                      onClick={onLogoutClick}>
                      {userPreference && userPreference.language_name === "EN"
                        ? "Logout"
                        : "লগ আউট"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default withRouter(Header);
