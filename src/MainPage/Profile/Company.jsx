import React, { useEffect, useState, useRef } from "react";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AddCompany from "./AddCompany";
import { toast } from "react-toastify";
import { deleteCompanyAction } from "../../redux/actions/companyActions";
import UpdateCompany from "./UpdateCompany";

const Company = () => {
  const dispatch = useDispatch();

  const {
    companyList,
    addedCompany,
    success: companySuccess,
    error: companyError,
  } = useSelector((state) => state.companyReducer);
  const { userPreference } = useSelector((state) => state.userReducer);

  const [companyObject, setCompanyObject] = useState({});

  const ref1 = useRef(false);

  useEffect(() => {
    if (ref1.current) {
      if (companyError && !companySuccess) {
        if (companyError.response.data) {
          for (const key in companyError.response.data) {
            if (companyError.response.data.hasOwnProperty(key)) {
              const element = companyError.response.data[key];
              toast.error(`${key}: ${element[0]}`);
            }
          }
        }
        return;
      }
      if (companySuccess) {
        if (addedCompany) {
          if (addedCompany.id) toast.success("Company added successfully");
        }
      }
    }
    ref1.current = true;
  }, [addedCompany, companySuccess, companyError]);

  const columns = [
    {
      title: "Company Title",
      dataIndex: "title",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Company Type",
      dataIndex: "company_type_name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      render: (row) => (
        <div className='btn btn-group'>
          {userPreference.company !== row.id && (
            <button
              className=' btn action-btn-all'
              onClick={() => {
                const confirm = window.confirm(
                  "Are you sure you want to delete this company?"
                );
                if (confirm) {
                  dispatch(deleteCompanyAction(row.id));
                }
              }}>
              <i className='fa-solid fa-trash-can'></i>
            </button>
          )}
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_company'
            onClick={() => {
              setCompanyObject(row);
            }}>
            <i className='fa-regular fa-pen-to-square'></i>
          </a>
        </div>
      ),
    },
  ];

  const columnsBangla = [
    {
      title: "কোম্পানির নাম",
      dataIndex: "title",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "কোম্পানির ধরণ",
      dataIndex: "company_type_name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "অ্যাকশন",
      render: (row) => (
        <div className='btn btn-group'>
          {userPreference.company !== row.id && (
            <button
              className=' btn action-btn-all'
              onClick={() => {
                const confirm = window.confirm(
                  "Are you sure you want to delete this company?"
                );
                if (confirm) {
                  dispatch(deleteCompanyAction(row.id));
                }
              }}>
              <i className='fa-solid fa-trash-can'></i>
            </button>
          )}
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_company'
            onClick={() => {
              setCompanyObject(row);
            }}>
            <i className='fa-regular fa-pen-to-square'></i>
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className=' col-md-6'>
        <div className='container-fluid'>
          <div className='page-header'>
            <div className='row align-items-center mt-2'>
              <div className='col'>
                <ul className='breadcrumb'>
                  <h3>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Company</span>
                    ) : (
                      <span>কোম্পানি</span>
                    )}
                  </h3>
                </ul>
              </div>
              <div className='col-auto float-end ml-auto'>
                <a
                  href='#'
                  className='btn add-btn'
                  data-bs-toggle='modal'
                  data-bs-target='#add_company'>
                  <i className='fa fa-plus' />
                  {userPreference && userPreference.language_name === "EN" ? (
                    <span>Add Company</span>
                  ) : (
                    <span>কোম্পানি যোগ করুন</span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
        {companyList && <AddCompany />}
        {companyList && <UpdateCompany companyObject={companyObject} />}
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='table-responsive'>
                {companyList && (
                  <Table
                    className='table-striped'
                    pagination={{
                      total: companyList.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={
                      userPreference.language_name === "EN"
                        ? columns
                        : columnsBangla
                    }
                    dataSource={companyList}
                    rowKey={(record) => record.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
