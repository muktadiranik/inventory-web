import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { getTransactionListAction } from "../../../redux/actions/transactionActions";
import { getCompanyAction } from "../../../redux/actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from "./CreateTransaction";

const Transactions = () => {
  const { isLoading, transactionList, error } = useSelector(
    (state) => state.getTransactionListReducer
  );
  const { addedTransaction } = useSelector(
    (state) => state.addTransactionReducer
  );
  const { key } = useSelector((state) => state.getAuthTokenReducer);
  const { company } = useSelector((state) => state.getCompanyReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
    if (!company) {
      dispatch(getCompanyAction());
    } else {
      dispatch(getTransactionListAction(company.id, key));
    }
  }, [addedTransaction, company]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Date",
      dataIndex: "created_at",
    },
    {
      title: "Buyer/Seller",
      dataIndex: "buyer_seller",
      sorter: (a, b) => a.buyer_seller.length - b.buyer_seller.length,
    },
    {
      title: "Product Description",
      dataIndex: "product_description",
      sorter: (a, b) =>
        a.product_description.length - b.product_description.length,
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
      sorter: (a, b) => a.account_type.length - b.account_type.length,
    },
    {
      title: "Income/Expense",
      dataIndex: "income_expense",
      sorter: (a, b) => a.income_expense.length - b.income_expense.length,
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
  ];
  return (
    <div className='page-wrapper'>
      <Helmet>
        <title>Transactions - Tohobil Inventory</title>
        <meta name='description' content='Login page' />
      </Helmet>
      {/* Page Content */}
      <div className='content container-fluid'>
        {/* Page Header */}
        <div className='page-header'>
          <div className='row align-items-center'>
            <div className='col'>
              <h3 className='page-title'>Transactions</h3>
              <ul className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/app/main/dashboard'>Dashboard</Link>
                </li>
                <li className='breadcrumb-item active'>Transactions</li>
              </ul>
            </div>
            <div className='col-auto float-end ml-auto'>
              <a
                href='#'
                className='btn add-btn'
                data-bs-toggle='modal'
                data-bs-target='#create_transaction'>
                <i className='fa fa-plus' /> Create Transaction
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <CreateTransaction />
        {/* Search Filter */}
        <div className='row filter-row'>
          <div className='col-sm-6 col-md-3'>
            <div className='form-group form-focus select-focus'>
              <div>
                <input
                  className='form-control floating datetimepicker'
                  type='date'
                />
              </div>
              <label className='focus-label'>From</label>
            </div>
          </div>
          <div className='col-sm-6 col-md-3'>
            <div className='form-group form-focus select-focus'>
              <div>
                <input
                  className='form-control floating datetimepicker'
                  type='date'
                />
              </div>
              <label className='focus-label'>To</label>
            </div>
          </div>
          <div className='col-sm-6 col-md-3'>
            <div className='form-group form-focus select-focus'>
              <select className='select floating'>
                <option>Select Status</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Partially Paid</option>
              </select>
              <label className='focus-label'>Status</label>
            </div>
          </div>
          <div className='col-sm-6 col-md-3'>
            <a href='#' className='btn btn-success btn-block w-100'>
              {" "}
              Search{" "}
            </a>
          </div>
        </div>
        {/* /Search Filter */}

        <div className='row'>
          <div className='col-md-12'>
            <div className='table-responsive'>
              {transactionList && (
                <Table
                  className='table-striped'
                  pagination={{
                    total: transactionList.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={transactionList}
                  rowKey={(record) => record.id}
                  // onChange={this.handleTableChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default Transactions;
