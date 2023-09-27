import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import Tour from "reactour";
import { Link, withRouter } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getTopTransactionAction } from "../../../redux/actions/transactionActions.js";
import { getLocalStorageCompanyAction } from "../../../redux/actions/companyActions.js";
import {
  getCSIBLatestBorrowersAction,
  getCSIBLatestCustomersAction,
  getCSIBLatestInvestorsAction,
  getCSIBLatestSuppliersAction,
} from "../../../redux/actions/customerActions";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { topTransaction } = useSelector((state) => state.transactionReducer);
  const { token, userDetails } = useSelector((state) => state.userReducer);
  const { company } = useSelector((state) => state.companyReducer);
  const {
    csibLatestCustomers,
    csibLatestSuppliers,
    csibLatestInvestors,
    csibLatestBorrowers,
  } = useSelector((state) => state.CSIBReducer);
  const { userPreference } = useSelector((state) => state.userReducer);

  const ref = useRef(false);

  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    let firstload = localStorage.getItem("firstload");
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1);
        localStorage.removeItem("firstload");
      }, 1000);
    }
    if (!company) {
      dispatch(getLocalStorageCompanyAction());
    }
    if (company) {
      if (company.id) {
        dispatch(getTopTransactionAction(company.id, token));
        dispatch(getCSIBLatestCustomersAction(company.id));
        dispatch(getCSIBLatestSuppliersAction(company.id));
        dispatch(getCSIBLatestInvestorsAction(company.id));
        dispatch(getCSIBLatestBorrowersAction(company.id));
      }
    }
  }, []);

  const [isTourOpen, setIsTourOpen] = useState(true);

  const steps = [
    {
      selector: "#total_balance",
      content: () => (
        <div>
          <h3>Total Balance</h3>
          <p>Total balance of all accounts</p>
        </div>
      ),
    },
    {
      selector: "#cash_balance",
      content: () => (
        <div>
          <h3>Total Cash</h3>
          <p>Total Cash in hand balance</p>
        </div>
      ),
    },
    {
      selector: "#total_receivable",
      content: () => (
        <div>
          <h3>Receivable Amount</h3>
          <p>Total receivable amount from customers</p>
        </div>
      ),
    },
    {
      selector: "#total_payable",
      content: () => (
        <div>
          <h3>Payable Amount</h3>
          <p>Total payable amount to suppliers</p>
        </div>
      ),
    },
    {
      selector: "#profit_loss",
      content: () => (
        <div>
          <h3>Profit or Loss</h3>
          <p>
            First to last buisness <strong>Profit/Loss</strong>. if balance is
            negative then <strong>loss</strong> and if positive then{" "}
            <strong>profi</strong>
          </p>
        </div>
      ),
    },
    {
      selector: "#customers",
      content: () => (
        <div>
          <h3>Customers</h3>
          <p>
            Latest five customer's list with their <strong>Transctions.</strong>
          </p>
        </div>
      ),
    },
    {
      selector: "#suppliers",
      content: () => (
        <div>
          <h3>Suppliers</h3>
          <p>
            Latest five supplier's list with their <strong>Transctions.</strong>
          </p>
        </div>
      ),
    },
    {
      selector: "#investors",
      content: () => (
        <div>
          <h3>Investors</h3>
          <p>
            Latest five investor's list with their <strong>Transctions.</strong>
          </p>
        </div>
      ),
    },
    {
      selector: "#borrowers",
      content: () => (
        <div>
          <h3>Borrowers</h3>
          <p>
            Latest five borrower's list with their <strong>Transctions.</strong>
          </p>
        </div>
      ),
    },
  ];

  const stepsBangla = [
    {
      selector: "#total_balance",
      content: () => (
        <div>
          <h3>মোট টাকা </h3>
          <p>সকল অ্যাকাউন্টের মোট টাকা</p>
        </div>
      ),
    },
    {
      selector: "#cash_balance",
      content: () => (
        <div>
          <h3>মোট ক্যাশ</h3>
          <p>হাতে মোট ক্যাশ টাকার পরিমাণ</p>
        </div>
      ),
    },
    {
      selector: "#total_receivable",
      content: () => (
        <div>
          <h3>মোট পাওনা</h3>
          <p>গ্রাহক থেকে মোট পাওনা টাকার পরিমাণ</p>
        </div>
      ),
    },
    {
      selector: "#total_payable",
      content: () => (
        <div>
          <h3>মোট দেনা</h3>
          <p>সরবরাহকারীর কাছে মোট দেনার পরিমাণ</p>
        </div>
      ),
    },
    {
      selector: "#profit_loss",
      content: () => (
        <div>
          <h3>লাভ বা ক্ষতি</h3>
          <p>
            লাভ বা ক্ষতি, প্রথম থেকে শেষ ব্যবসার লাভ/ক্ষতি। যদি ক্যাশ “ - ”হয়
            তাহলে ক্ষতি এবং যদি “ + ” হয় তাহলে লাভ
          </p>
        </div>
      ),
    },
    {
      selector: "#customers",
      content: () => (
        <div>
          <h3>কাস্টমার</h3>
          <p>সর্বশেষ পাঁচ জন কাস্টমারের তালিকা এবং তাদের লেনদেন</p>
        </div>
      ),
    },
    {
      selector: "#suppliers",
      content: () => (
        <div>
          <h3>সরবরাহকারী</h3>
          <p>সর্বশেষ পাঁচ জন সরবরাহকারীর তালিকা এবং তাদের লেনদেন</p>
        </div>
      ),
    },
    {
      selector: "#investors",
      content: () => (
        <div>
          <h3>বিনিয়োগকারী</h3>
          <p>সর্বশেষ পাঁচ জন বিনিয়োগকারীর তালিকা এবং তাদের লেনদেন</p>
        </div>
      ),
    },
    {
      selector: "#borrowers",
      content: () => (
        <div>
          <h3>ঋণগ্রহীতা</h3>
          <p>র্বশেষ পাঁচ জন ঋণগ্রহীতার তালিকা এবং তাদের লেনদেন</p>
        </div>
      ),
    },
  ];

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Dashboard - Tohobil Inventory</title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        {userPreference && userPreference.language_name && (
          <IntlProvider
            locale={userPreference && userPreference.language_name}
            defaultLocale="EN"
          >
            <div className="content container-fluid">
              <div className="page-header">
                <div className="row" data-tut="reactour__action">
                  {/* <Tour
                    steps={
                      userPreference && userPreference.language_name === "EN"
                        ? steps
                        : stepsBangla
                    }
                    isOpen={isTourOpen}
                    onRequestClose={() => setIsTourOpen(false)}
                  /> */}

                  <div className="col-sm-12">
                    {userDetails && userDetails.email && (
                      <h3 className="page-title">
                        {userPreference && userPreference.language_name === "EN"
                          ? "Welcome"
                          : "স্বাগতম"}{" "}
                        {userDetails.first_name} {userDetails.last_name}
                      </h3>
                    )}
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item active">
                        {userPreference && userPreference.language_name === "EN"
                          ? "Dashboard"
                          : "ড্যাশবোর্ড"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
                <div className="col">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <span className="dash-widget-icon">
                        <i className="fa fa-cubes" />
                      </span>
                      <div className="dash-widget-info" id="total_balance">
                        {topTransaction && topTransaction[0] ? (
                          <h3>
                            <FormattedNumber
                              value={topTransaction[0].total_balance}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        ) : (
                          <h3>
                            <FormattedNumber
                              value={0}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        )}
                        <span>
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Total Balance"
                            : "মোট টাকা"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <span className="dash-widget-icon">
                        <i className="fa fa-usd" />
                      </span>
                      <div
                        className="dash-widget-info cash_balance"
                        id="cash_balance"
                      >
                        {topTransaction && topTransaction[0] ? (
                          <h3>
                            <FormattedNumber
                              value={topTransaction[0].cash_in_hand}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        ) : (
                          <h3>
                            <FormattedNumber
                              value={0}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        )}
                        <span>
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Cash in Hand"
                            : "হাতে নগদ টাকা"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <span className="dash-widget-icon">
                        <i className="fa fa-diamond" />
                      </span>
                      <div className="dash-widget-info" id="total_receivable">
                        {topTransaction && topTransaction[0] ? (
                          <h3>
                            <FormattedNumber
                              value={topTransaction[0].total_receivable}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        ) : (
                          <h3>
                            <FormattedNumber
                              value={0}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        )}
                        <span>
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Total Receivable"
                            : "মোট পাওনা"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <span className="dash-widget-icon">
                        <i className="fa fa-user" />
                      </span>
                      <div className="dash-widget-info" id="total_payable">
                        {topTransaction && topTransaction[0] ? (
                          <h3>
                            <FormattedNumber
                              value={topTransaction[0].total_payable}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        ) : (
                          <h3>
                            <FormattedNumber
                              value={0}
                              style="currency"
                              currency={
                                userPreference && userPreference.currency_name
                              }
                            />
                          </h3>
                        )}
                        <span>
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Total Payable"
                            : "মোট দেনা"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {topTransaction &&
                topTransaction[0] &&
                topTransaction[0].profit_loss > 0 ? (
                  <div className="col">
                    <div className="card dash-widget">
                      <div className="card-body">
                        <span className="dash-widget-icon">
                          <i className="fa fa-money" />
                        </span>
                        <div className="dash-widget-info" id="profit_loss">
                          {topTransaction && topTransaction[0] ? (
                            <h3>
                              <FormattedNumber
                                value={topTransaction[0].profit_loss}
                                style="currency"
                                currency={
                                  userPreference && userPreference.currency_name
                                }
                              />
                            </h3>
                          ) : (
                            <h3>
                              <FormattedNumber
                                value={0}
                                style="currency"
                                currency={
                                  userPreference && userPreference.currency_name
                                }
                              />
                            </h3>
                          )}
                          <span>
                            {userPreference &&
                            userPreference.language_name === "EN"
                              ? "Profit/ Loss"
                              : "লাভ/ক্ষতি"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col">
                    <div className="card dash-widget">
                      <div className="card-body">
                        <span className="dash-widget-icon">
                          <i className="fa fa-money" />
                        </span>
                        <div className="dash-widget-info" id="profit_loss">
                          {topTransaction && topTransaction[0] ? (
                            <h3>
                              <FormattedNumber
                                value={topTransaction[0].profit_loss}
                                style="currency"
                                currency={
                                  userPreference && userPreference.currency_name
                                }
                              />
                            </h3>
                          ) : (
                            <h3>
                              <FormattedNumber
                                value={0}
                                style="currency"
                                currency={
                                  userPreference && userPreference.currency_name
                                }
                              />
                            </h3>
                          )}
                          <span>
                            {userPreference &&
                            userPreference.language_name === "EN"
                              ? "Profit/ Loss"
                              : "লাভ/ক্ষতি"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card card-table flex-fill">
                    <div className="card-header">
                      <h3 className="card-title mb-0" id="customers">
                        {userPreference && userPreference.language_name === "EN"
                          ? "Customers"
                          : "কাস্টমার"}
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-nowrap custom-table mb-0">
                          <thead>
                            <tr>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Name"
                                  : "নাম"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Phone"
                                  : "ফোন"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Paid"
                                  : "মোট পরিশোধ"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Due"
                                  : "মোট বাকি"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {csibLatestCustomers?.map((customer) => (
                              <tr key={customer?.id}>
                                <td>{customer?.full_name}</td>
                                <td>{customer?.phone}</td>
                                <td>
                                  <FormattedNumber
                                    value={customer?.total_paid}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                                <td>
                                  <FormattedNumber
                                    value={customer?.total_due}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {csibLatestCustomers?.length === 5 && (
                      <div className="card-footer">
                        <Link to="/app/csib/customers">
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "View all customers"
                            : "সকল কাস্টমার দেখুন"}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card card-table flex-fill">
                    <div className="card-header">
                      <h3 className="card-title mb-0" id="suppliers">
                        {userPreference && userPreference.language_name === "EN"
                          ? "Suppliers"
                          : "সরবরাহকারী"}
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-nowrap custom-table mb-0">
                          <thead>
                            <tr>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Name"
                                  : "নাম"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Phone"
                                  : "ফোন"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Paid"
                                  : "মোট পরিশোধ"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Due"
                                  : "মোট বাকি"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {csibLatestSuppliers?.map((supplier) => (
                              <tr key={supplier?.id}>
                                <td>{supplier?.full_name}</td>
                                <td>{supplier?.phone}</td>
                                <td>
                                  <FormattedNumber
                                    value={supplier?.total_paid}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                                <td>
                                  <FormattedNumber
                                    value={supplier?.total_due}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {csibLatestSuppliers?.length === 5 && (
                      <div className="card-footer">
                        <Link to="/app/csib/suppliers">
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "View all suppliers"
                            : "সকল সরবরাহকারী দেখুন"}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card card-table flex-fill">
                    <div className="card-header">
                      <h3 className="card-title mb-0" id="investors">
                        {userPreference && userPreference.language_name === "EN"
                          ? "Investors"
                          : "বিনিয়োগকারী"}
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-nowrap custom-table mb-0">
                          <thead>
                            <tr>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Name"
                                  : "নাম"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Phone"
                                  : "ফোন"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Paid"
                                  : "মোট পরিশোধ"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Due"
                                  : "মোট বাকি"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {csibLatestInvestors?.map((investor) => (
                              <tr key={investor?.id}>
                                <td>{investor?.full_name}</td>
                                <td>{investor?.phone}</td>
                                <td>
                                  <FormattedNumber
                                    value={investor?.total_paid}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                                <td>
                                  <FormattedNumber
                                    value={investor?.total_due}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {csibLatestInvestors?.length === 5 && (
                      <div className="card-footer">
                        <Link to="/app/csib/investors">
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "View all investors"
                            : "সকল বিনিয়োগকারী দেখুন"}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card card-table flex-fill">
                    <div className="card-header">
                      <h3 className="card-title mb-0" id="borrowers">
                        {userPreference && userPreference.language_name === "EN"
                          ? "Borrowers"
                          : "ঋণগ্রহীতা"}
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-nowrap custom-table mb-0">
                          <thead>
                            <tr>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Name"
                                  : "নাম"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Phone"
                                  : "ফোন"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Paid"
                                  : "মোট পরিশোধ"}
                              </th>
                              <th>
                                {userPreference &&
                                userPreference.language_name === "EN"
                                  ? "Total Due"
                                  : "মোট বাকি"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {csibLatestBorrowers?.map((borrower) => (
                              <tr key={borrower?.id}>
                                <td>{borrower?.full_name}</td>
                                <td>{borrower?.phone}</td>
                                <td>
                                  <FormattedNumber
                                    value={borrower?.total_paid}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                                <td>
                                  <FormattedNumber
                                    value={borrower?.total_due}
                                    style="currency"
                                    currency={
                                      userPreference &&
                                      userPreference.currency_name
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {csibLatestBorrowers?.length === 5 && (
                      <div className="card-footer">
                        <Link to="/app/csib/borrowers">
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "View all borrowers"
                            : "সকল ঋণদাতা দেখুন"}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </IntlProvider>
        )}
      </div>
    </div>
  );
};

export default withRouter(AdminDashboard);
