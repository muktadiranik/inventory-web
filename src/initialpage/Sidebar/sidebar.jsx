import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const Sidebar = (props) => {
  const { userPreference } = useSelector((state) => state.userReducer);
  return (
    <div className='sidebar' id='sidebar'>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax='95vh'
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul>
              <li className='submenu'>
                <Link to='/app/main/dashboard'>
                  <i className='la la-dashboard' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Dashboard"
                      : "ড্যাশবোর্ড"}
                  </span>
                </Link>
              </li>
              <li className='menu-title'>
                <span>
                  {userPreference && userPreference.language_name === "EN"
                    ? "Accounting"
                    : "হিসাব রক্ষণাবেক্ষণ"}
                </span>
              </li>
              <li className='submenu'>
                <Link to='/app/accounts/transactions'>
                  <i className='la la-money' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Transactions"
                      : "লেনদেন"}
                  </span>
                </Link>
              </li>
              <li className='submenu'>
                <Link to='/app/accounts/products'>
                  <i className='la la-box' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Products"
                      : "পণ্য"}
                  </span>
                </Link>
              </li>
              <li className='submenu'>
                <Link to='/app/accounts/product-category'>
                  <i className='la la-boxes' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Product Category"
                      : "পণ্য ক্যাটাগরি"}
                  </span>
                </Link>
              </li>
              <li className='menu-title'>
                <span>
                  {userPreference && userPreference.language_name === "EN"
                    ? "Settings"
                    : "সেটিংস"}
                </span>
              </li>
              <li>
                <Link to='/app/csib/customers'>
                  <i className='la la-users' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Customers"
                      : "কাস্টমার"}
                  </span>
                </Link>
                <Link to='/app/csib/suppliers'>
                  <i className='la la-rocket' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Suppliers"
                      : "সরবরাহকারী"}
                  </span>
                </Link>
                <Link to='/app/csib/investors'>
                  <i className='la la-user' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Investors"
                      : "বিনিয়োগকারী"}
                  </span>
                </Link>
                <Link to='/app/csib/borrowers'>
                  <i className='la la-ticket' />{" "}
                  <span>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Borrowers"
                      : "ঋণগ্রহণকারী"}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default withRouter(Sidebar);
