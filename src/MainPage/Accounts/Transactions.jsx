import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { getTransactionListAction } from "../../redux/actions/transactionActions";
import { getCustomerListAction } from "../../redux/actions/customerActions";
import {
  getProductListAction,
  getProductCategoryAction,
} from "../../redux/actions/productActions";
import { getCSIBTypeListAction } from "../../redux/actions/customerActions";
import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from "./CreateTransaction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProductCategory from "./AddProductCategory";
import AddProduct from "./AddProduct";
import AddInvestor from "../CSIB/AddInvestor";
import { deleteTransactionAction } from "../../redux/actions/transactionActions";
import UpdateTransaction from "./UpdateTransaction";
import AddCSIB from "../CSIB/AddCSIB";

const Transactions = () => {
  const {
    transactionList,
    addedTransaction,
    updatedTransaction,
    success,
    error,
    deleteSuccess,
    deleteError,
  } = useSelector((state) => state.transactionReducer);
  const { token, userPreference } = useSelector((state) => state.userReducer);
  const { company } = useSelector((state) => state.companyReducer);
  const { csibList, csibTypeList, addedCSIB } = useSelector(
    (state) => state.CSIBReducer
  );
  const {
    productList,
    productCategoryList,
    addedProduct,
    addedProductCategory,
  } = useSelector((state) => state.productReducer);

  const [customerType, setCustomerType] = React.useState();

  const dispatch = useDispatch();

  const ref1 = useRef(false);
  const ref2 = useRef(false);
  const ref3 = useRef(false);
  const openAddCSIBRef = useRef();
  const openAddProductRef = useRef();
  const openRef = useRef();

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
    if (!company) {
      dispatch(getCompanyAction());
    }
    if (company) {
      if (company.id) {
        dispatch(getCustomerListAction(company.id, token));
        dispatch(getProductListAction(company.id, token));
        dispatch(getProductCategoryAction(company.id, token));
        dispatch(getCSIBTypeListAction());
      }
    }
  }, [token, company, addedProduct, addedProductCategory, addedCSIB]);

  useEffect(() => {
    if (ref1.current) {
      if (error) {
        if (error.response.data) {
          for (const key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              const element = error.response.data[key];
              toast.error(`${key}: ${element[0]}`);
            }
          }
        }
        return;
      }
      if (success) {
        if (addedTransaction) {
          if (addedTransaction.id) toast.success("Transaction Added");
        }
      }
    }
    ref1.current = true;
  }, [addedTransaction, success, error]);

  useEffect(() => {
    if (ref2.current) {
      if (error) {
        if (error.response.data) {
          for (const key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              const element = error.response.data[key];
              toast.error(`${key}: ${element[0]}`);
            }
          }
        }
        return;
      }
      if (success) {
        if (updatedTransaction) {
          if (updatedTransaction.id) toast.success("Transaction Updated");
        }
      }
    }
    ref2.current = true;
  }, [updatedTransaction, success, error]);

  useEffect(() => {
    if (ref3.current) {
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
        return;
      }
      if (deleteSuccess) {
        toast.success("Transaction Deleted");
      }
    }
    ref3.current = true;
  }, [deleteSuccess, deleteError]);

  useEffect(() => {
    if (company) {
      if (company.id) {
        dispatch(getTransactionListAction(company.id, token));
        for (const key in csibTypeList) {
          if (csibTypeList[key].customer_type == "INVESTOR") {
            setCustomerType(csibTypeList[key].id);
          }
        }
      }
    }
  }, [
    addedTransaction,
    updatedTransaction,
    company,
    success,
    error,
    deleteSuccess,
    deleteError,
  ]);

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
    },
    {
      title: "Buyer/Seller",
      dataIndex: "buyer_seller_name",
    },
    {
      title: "Product",
      dataIndex: "product_name",
    },
    {
      title: "Description",
      dataIndex: "custom_description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
    },
    {
      title: "Account Type",
      dataIndex: "account_type",
    },
    {
      title: "Income/Expense",
      dataIndex: "income_expense",
    },
    {
      title: "Paid Amount",
      dataIndex: "paid_amount",
    },
    {
      title: "Due",
      dataIndex: "due",
    },
    {
      title: "Total Balance",
      dataIndex: "total_balance",
    },
    {
      title: "Cash In Hand",
      dataIndex: "cash_in_hand",
    },
    {
      title: "Total Receivable",
      dataIndex: "total_receivable",
    },
    {
      title: "Total Payable",
      dataIndex: "total_payable",
    },
    {
      title: "Profit / Loss",
      dataIndex: "profit_loss",
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          {transactionList[0].id == row.id && (
            <div className="btn btn-group">
              <button
                className=" btn action-btn-all"
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Do you really want to delete this Borrower?"
                  );
                  if (confirmBox == true) {
                    dispatch(
                      deleteTransactionAction(company.id, token, row.id)
                    );
                  }
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <a
                href="#"
                className=" btn action-btn-all"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#update_transaction"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </a>
            </div>
          )}
        </div>
      ),
    },
  ];

  const columnsBangla = [
    {
      title: "তারিখ",
      dataIndex: "created_at",
    },
    {
      title: "ক্রেতা / বিক্রেতা",
      dataIndex: "buyer_seller_name",
    },
    {
      title: "পণ্য",
      dataIndex: "product_name",
    },
    {
      title: "বিবরণ",
      dataIndex: "custom_description",
    },
    {
      title: "পরিমাণ",
      dataIndex: "quantity",
    },
    {
      title: "একক মূল্য",
      dataIndex: "unit_price",
    },
    {
      title: "অ্যাকাউন্ট টাইপ",
      dataIndex: "account_type",
    },
    {
      title: "আয় / ব্যয়",
      dataIndex: "income_expense",
    },
    {
      title: "পরিশোধিত পরিমাণ",
      dataIndex: "paid_amount",
    },
    {
      title: "বাকি",
      dataIndex: "due",
    },
    {
      title: "মোট ব্যালেন্স",
      dataIndex: "total_balance",
    },
    {
      title: "ক্যাশ ইন হ্যান্ড",
      dataIndex: "cash_in_hand",
    },
    {
      title: "মোট পাওনা",
      dataIndex: "total_receivable",
    },
    {
      title: "মোট পরিশোধ",
      dataIndex: "total_payable",
    },
    {
      title: "লাভ / ক্ষতি",
      dataIndex: "profit_loss",
    },
    {
      title: "অ্যাকশন",
      render: (row) => (
        <div>
          {transactionList[0].id == row.id && (
            <div className="btn btn-group">
              <button
                className=" btn action-btn-all"
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Do you really want to delete this Borrower?"
                  );
                  if (confirmBox == true) {
                    dispatch(
                      deleteTransactionAction(company.id, token, row.id)
                    );
                  }
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <a
                href="#"
                className=" btn action-btn-all"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#update_transaction"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </a>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <ToastContainer />
      <Helmet>
        <title>Transactions - Tohobil Inventory</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">
                {userPreference && userPreference.language_name === "EN" ? (
                  <span>Transactions</span>
                ) : (
                  <span>লেনদেন</span>
                )}
              </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Dashboard</span>
                    ) : (
                      <span>ড্যাশবোর্ড</span>
                    )}
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  {userPreference && userPreference.language_name === "EN" ? (
                    <span>Transactions</span>
                  ) : (
                    <span>লেনদেন</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              {csibList &&
              productList &&
              csibList.length > 0 &&
              productList.length > 0 ? (
                <a
                  href="#"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#create_transaction"
                  ref={openRef}
                >
                  <i className="fa fa-plus" />
                  {userPreference && userPreference.language_name === "EN" ? (
                    <span>Create Transaction</span>
                  ) : (
                    <span>লেনদেন তৈরি করুন</span>
                  )}
                </a>
              ) : (
                <span className="text-danger mt-2 d-inline-block">
                  {userPreference && userPreference.language_name === "EN" ? (
                    <span>Minimum </span>
                  ) : (
                    <span>সর্বনিম্ন </span>
                  )}
                  {csibList && csibList.length == 0 && (
                    <span>
                      {userPreference &&
                      userPreference.language_name === "EN" ? (
                        <span> one </span>
                      ) : (
                        <span> একটি </span>
                      )}
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add_investor"
                      >
                        {" "}
                        {userPreference &&
                        userPreference.language_name === "EN" ? (
                          <span>Investor</span>
                        ) : (
                          <span>বিনিয়োগকারী</span>
                        )}
                      </a>
                      ,
                    </span>
                  )}{" "}
                  {productCategoryList && productCategoryList.length == 0 && (
                    <span>
                      {userPreference &&
                      userPreference.language_name === "EN" ? (
                        <span> one </span>
                      ) : (
                        <span> একটি </span>
                      )}
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#create_product_category"
                      >
                        {userPreference &&
                        userPreference.language_name === "EN" ? (
                          <span>Product Category</span>
                        ) : (
                          <span>পণ্যের ক্যাটাগরি</span>
                        )}
                      </a>
                    </span>
                  )}{" "}
                  {productCategoryList &&
                    productCategoryList.length > 0 &&
                    productList &&
                    productList.length == 0 && (
                      <span>
                        {userPreference &&
                        userPreference.language_name === "EN" ? (
                          <span> one </span>
                        ) : (
                          <span> একটি </span>
                        )}
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#create_product"
                        >
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Product</span>
                          ) : (
                            <span>পণ্য</span>
                          )}
                        </a>{" "}
                      </span>
                    )}{" "}
                  {userPreference && userPreference.language_name === "EN" ? (
                    <span> is required to create a transaction</span>
                  ) : (
                    <span> লেনদেন তৈরি করার জন্য প্রয়োজনীয়</span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        <a
          ref={openAddCSIBRef}
          hidden
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#add_csib"
        ></a>
        <AddCSIB />
        {csibList &&
          productList &&
          csibList.length > 0 &&
          productList.length > 0 && <CreateTransaction />}
        {transactionList && transactionList.length > 0 && (
          <UpdateTransaction transactionObject={transactionList[0]} />
        )}
        <a
          ref={openAddProductRef}
          hidden
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#create_product"
        ></a>
        {productCategoryList && productCategoryList.length > 0 && (
          <AddProduct />
        )}
        {csibTypeList && csibTypeList.length > 0 && (
          <AddInvestor customerType={customerType} />
        )}
        <AddProductCategory />
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              {transactionList && (
                <Table
                  className="table-striped"
                  pagination={{
                    total: transactionList.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={
                    userPreference && userPreference.language_name === "EN"
                      ? columns
                      : columnsBangla
                  }
                  dataSource={transactionList}
                  rowKey={(record) => record.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
