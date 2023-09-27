import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import AddSupplier from "./AddSupplier";
import { useDispatch, useSelector } from "react-redux";
import {
  getCSIBListAction,
  deleteCSIBAction,
} from "../../redux/actions/customerActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateSupplier from "./updateSupplier";

const Suppliers = () => {
  const dispatch = useDispatch();

  const ref1 = useRef(false);
  const ref2 = useRef(false);
  const ref3 = useRef(false);

  const {
    csibList,
    addedCSIB,
    csibTypeList,
    error,
    success,
    updatedCSIB,
    deleteSuccess,
    deleteError,
  } = useSelector((state) => state.CSIBReducer);
  const { company } = useSelector((state) => state.companyReducer);
  const { userPreference } = useSelector((state) => state.userReducer);

  const [customerType, setCustomerType] = React.useState();
  const [userObject, setUserObject] = React.useState({});

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Total Paid",
      dataIndex: "total_paid",
    },
    {
      title: "Total Due",
      dataIndex: "total_due",
    },
    {
      title: "Action",
      render: (row) => (
        <div className='btn btn-group'>
          <button
            className=' btn action-btn-all'
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this supplier?"
              );
              if (confirm) {
                dispatch(deleteCSIBAction(company.id, row.id));
              }
            }}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_supplier'
            onClick={() => {
              setUserObject(row);
            }}>
            <i className='fa-regular fa-pen-to-square'></i>
          </a>
        </div>
      ),
    },
  ];

  const columnsBangla = [
    {
      title: "পুরো নাম",
      dataIndex: "full_name",
      sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      title: "ঠিকানা",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "ইমেইল",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "ফোন",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "মোট পরিশোধ",
      dataIndex: "total_paid",
    },
    {
      title: "মোট বাকি",
      dataIndex: "total_due",
    },
    {
      title: "অ্যাকশন",
      render: (row) => (
        <div className='btn btn-group'>
          <button
            className=' btn action-btn-all'
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this supplier?"
              );
              if (confirm) {
                dispatch(deleteCSIBAction(company.id, row.id));
              }
            }}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_supplier'
            onClick={() => {
              setUserObject(row);
            }}>
            <i className='fa-regular fa-pen-to-square'></i>
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (company) {
      if (company.id) {
        dispatch(getCSIBListAction(company.id, "SUPPLIER"));
        for (const key in csibTypeList) {
          if (csibTypeList[key].customer_type == "SUPPLIER") {
            setCustomerType(csibTypeList[key].id);
          }
        }
      }
    }
  }, [company, addedCSIB, updatedCSIB, deleteSuccess]);

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
        if (addedCSIB) {
          if (addedCSIB.customer_type) toast.success("Supplier Added");
        }
      }
    }
    ref1.current = true;
  }, [error, success, addedCSIB]);

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
        if (updatedCSIB) {
          if (updatedCSIB.customer_type) toast.success("Supplier Updated");
        }
      }
    }
    ref2.current = true;
  }, [error, success, updatedCSIB]);

  useEffect(() => {
    if (ref3.current) {
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
      if (deleteSuccess) {
        toast.success("Supplier Deleted");
      }
    }
    ref3.current = true;
  }, [deleteError, deleteSuccess]);

  return (
    <div className='page-wrapper'>
      <ToastContainer />
      <div className='content container-fluid'>
        <h2>
          {userPreference && userPreference.language_name === "EN" ? (
            <span>Suppliers</span>
          ) : (
            <span>সরবরাহকারী</span>
          )}
        </h2>
        <div className='page-header'>
          <div className='row align-items-center'>
            <div className='col'>
              <ul className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/app/main/dashboard'>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Dashboard</span>
                    ) : (
                      <span>ড্যাশবোর্ড</span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
            {customerType && (
              <div className='col-auto float-end ml-auto'>
                <a
                  href='#'
                  className='btn add-btn'
                  data-bs-toggle='modal'
                  data-bs-target='#add_supplier'>
                  <i className='fa fa-plus' />
                  {userPreference && userPreference.language_name === "EN" ? (
                    <span>Add Supplier</span>
                  ) : (
                    <span>সরবরাহকারী যোগ করুন</span>
                  )}
                </a>
              </div>
            )}
          </div>
        </div>
        {customerType && <AddSupplier customerType={customerType} />}
        {customerType && <UpdateSupplier userObject={userObject} />}
        <div className='row '>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive'>
                {csibList && (
                  <Table
                    className='table-striped'
                    pagination={{
                      total: csibList.length,
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
                    dataSource={csibList}
                    rowKey={(record) => record.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
