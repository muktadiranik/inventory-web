import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getProductCategoryAction,
  deleteProductCategoryAction,
} from "../../redux/actions/productActions";
import AddProductCategory from "./AddProductCategory";
import UpdateProductCategory from "./UpdateProductCategory";

const ProductCategory = () => {
  const dispatch = useDispatch();

  const {
    productCategoryList,
    addedProductCategory,
    success,
    error,
    updatedProductCategory,
    deleteSuccess,
    deleteError,
  } = useSelector((state) => state.productReducer);
  const { token, userPreference } = useSelector((state) => state.userReducer);
  const { company } = useSelector((state) => state.companyReducer);

  const ref1 = useRef(false);
  const ref2 = useRef(false);
  const ref3 = useRef(false);

  const [productCategoryObject, setProductCategoryObject] = useState({});

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
        dispatch(getProductCategoryAction(company.id, token));
      }
    }
  }, [
    addedProductCategory,
    company,
    success,
    error,
    updatedProductCategory,
    deleteSuccess,
    deleteError,
  ]);

  useEffect(() => {
    if (ref1.current) {
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
      if (success) {
        if (addedProductCategory) {
          if (addedProductCategory.id) toast.success("Product Category Added");
        }
      }
    }
    ref1.current = true;
  }, [addedProductCategory, success, error]);

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
        if (updatedProductCategory) {
          if (updatedProductCategory.id)
            toast.success("Product Category Updated");
        }
      }
    }
    ref2.current = true;
  }, [updatedProductCategory, success, error]);

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
        toast.success("Product Category Deleted");
      }
    }
    ref3.current = true;
  }, [deleteError, deleteSuccess]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      render: (row) => (
        <div className='btn btn-group'>
          <button
            className=' btn action-btn-all'
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this product category?"
              );
              if (confirm) {
                dispatch(
                  deleteProductCategoryAction(company.id, token, row.id)
                );
              }
            }}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_product_category'
            onClick={() => {
              setProductCategoryObject(row);
            }}>
            <i className='fa-regular fa-pen-to-square'></i>
          </a>
        </div>
      ),
    },
  ];

  const columnsBangla = [
    {
      title: "নাম",
      dataIndex: "name",
    },
    {
      title: "অ্যাকশন",
      render: (row) => (
        <div className='btn btn-group'>
          <button
            className=' btn action-btn-all'
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this product category?"
              );
              if (confirm) {
                dispatch(
                  deleteProductCategoryAction(company.id, token, row.id)
                );
              }
            }}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_product_category'
            onClick={() => {
              setProductCategoryObject(row);
            }}>
            <i className='fa-regular fa-pen-to-square'></i>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className='page-wrapper'>
      <ToastContainer />
      <Helmet>
        <title>Product Categories - Tohobil Inventory</title>
        <meta name='description' content='Login page' />
      </Helmet>
      <div className='content container-fluid'>
        <div className='page-header'>
          <div className='row align-items-center'>
            <div className='col'>
              <h3 className='page-title'>
                {userPreference && userPreference.language_name === "EN" ? (
                  <span>Product Category</span>
                ) : (
                  <span>পণ্য ক্যাটাগরি</span>
                )}
              </h3>
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
                <li className='breadcrumb-item active'>
                  {userPreference && userPreference.language_name === "EN" ? (
                    <span>Category</span>
                  ) : (
                    <span>ক্যাটাগরি</span>
                  )}
                </li>
              </ul>
            </div>
            <div className='col-auto float-end ml-auto'>
              <a
                href='#'
                className='btn add-btn'
                data-bs-toggle='modal'
                data-bs-target='#create_product_category'>
                <i className='fa fa-plus' />
                {userPreference && userPreference.language_name === "EN" ? (
                  <span>Add Category</span>
                ) : (
                  <span>ক্যাটাগরি যোগ করুন</span>
                )}
              </a>
            </div>
          </div>
        </div>
        {productCategoryList && <AddProductCategory />}
        {productCategoryObject && (
          <UpdateProductCategory
            productCategoryObject={productCategoryObject}
          />
        )}
        <div className='row'>
          <div className='col-md-12'>
            <div className='table-responsive'>
              {productCategoryList && (
                <Table
                  className='table-striped'
                  pagination={{
                    total: productCategoryList.length,
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
                  dataSource={productCategoryList}
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

export default ProductCategory;
