import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductListAction } from "../../redux/actions/productActions";
import AddProduct from "./AddProduct";
import {
  getProductCategoryAction,
  deleteProductAction,
} from "../../redux/actions/productActions";
import UpdateProduct from "./UpdateProduct";
import AddProductCategory from "./AddProductCategory";

const Products = () => {
  const {
    productList,
    addedProduct,
    success,
    error,
    updatedProduct,
    deleteError,
    deleteSuccess,
  } = useSelector((state) => state.productReducer);
  const { productCategoryList } = useSelector((state) => state.productReducer);
  const { company } = useSelector((state) => state.companyReducer);
  const { token, userPreference } = useSelector((state) => state.userReducer);

  const ref1 = useRef(false);
  const ref2 = useRef(false);
  const ref3 = useRef(false);

  const [productObject, setProductObject] = React.useState({});

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
    }
    if (company) {
      if (company.id) {
        dispatch(getProductListAction(company.id, token));
        dispatch(getProductCategoryAction(company.id, token));
      }
    }
  }, [
    company,
    addedProduct,
    success,
    error,
    updatedProduct,
    deleteError,
    deleteSuccess,
  ]);

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
        if (addedProduct) {
          if (addedProduct.id) toast.success("Product added successfully");
        }
      }
    }
    ref1.current = true;
  }, [error, success, addedProduct]);

  useEffect(() => {
    if (ref2.current) {
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
        if (updatedProduct) {
          if (updatedProduct.id) toast.success("Product updated successfully");
        }
      }
    }
    ref2.current = true;
  }, [error, success, updatedProduct]);

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
        toast.success("Product deleted successfully");
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
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Category",
      dataIndex: "category_name",
      sorter: (a, b) => a.category_name.length - b.category_name.length,
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Action",
      render: (row) => (
        <div className='btn btn-group'>
          <button
            className=' btn action-btn-all'
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this product?"
              );
              if (confirm) {
                dispatch(deleteProductAction(company.id, token, row.id));
              }
            }}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_transaction'
            onClick={() => {
              setProductObject(row);
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
      title: "বর্ণনা",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "ক্যাটাগরি",
      dataIndex: "category_name",
      sorter: (a, b) => a.category_name.length - b.category_name.length,
    },
    {
      title: "ইউনিট",
      dataIndex: "unit",
    },
    {
      title: "দাম",
      dataIndex: "price",
    },
    {
      title: "স্টক",
      dataIndex: "stock",
    },
    {
      title: "অ্যাকশন",
      render: (row) => (
        <div className='btn btn-group'>
          <button
            className=' btn action-btn-all'
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this product?"
              );
              if (confirm) {
                dispatch(deleteProductAction(company.id, token, row.id));
              }
            }}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <a
            href='#'
            className=' btn action-btn-all'
            role='button'
            data-bs-toggle='modal'
            data-bs-target='#update_transaction'
            onClick={() => {
              setProductObject(row);
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
        <title>Products - Tohobil Inventory</title>
        <meta name='description' content='Login page' />
      </Helmet>
      <div className='content container-fluid'>
        <div className='page-header'>
          <div className='row align-items-center'>
            <div className='col'>
              <h3 className='page-title'>
                {userPreference && userPreference.language_name === "EN"
                  ? "Products"
                  : "পণ্য"}
              </h3>
              <ul className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/app/main/dashboard'>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Dashboard"
                      : "ড্যাশবোর্ড"}
                  </Link>
                </li>
                <li className='breadcrumb-item active'>
                  {userPreference && userPreference.language_name === "EN"
                    ? "Products"
                    : "পণ্য"}
                </li>
              </ul>
            </div>
            <div className='col-auto float-end ml-auto'>
              {productCategoryList && productCategoryList.length > 0 ? (
                <a
                  href='#'
                  className='btn add-btn'
                  data-bs-toggle='modal'
                  data-bs-target='#create_product'>
                  <i className='fa fa-plus' />
                  {userPreference && userPreference.language_name === "EN"
                    ? "Add Product"
                    : "পণ্য যোগ করুন"}
                </a>
              ) : (
                <span className='text-danger mt-2 col'>
                  {userPreference && userPreference.language_name === "EN"
                    ? "Minimum one "
                    : "দয়া করে একটি "}
                  <a
                    href='#'
                    data-bs-toggle='modal'
                    data-bs-target='#create_product_category'>
                    {" "}
                    {userPreference && userPreference.language_name === "EN"
                      ? "product category"
                      : "পণ্য ক্যাটাগরি"}
                  </a>{" "}
                  {userPreference && userPreference.language_name === "EN"
                    ? "is required"
                    : "তৈরি করুন"}
                </span>
              )}
            </div>
          </div>
        </div>
        {productList && <AddProduct />}
        {productObject && <UpdateProduct productObject={productObject} />}
        <AddProductCategory />
        <div className='row'>
          <div className='col-md-12'>
            <div className='table-responsive'>
              {productList && (
                <Table
                  className='table-striped'
                  pagination={{
                    total: productList.length,
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
                  dataSource={productList}
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

export default Products;
