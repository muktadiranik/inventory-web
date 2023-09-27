import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../../redux/actions/productActions";
import { Form } from "react-bootstrap-v5";

const AddProduct = ({}) => {
  const dispatch = useDispatch();

  const { productCategoryList } = useSelector((state) => state.productReducer);

  const { token, userPreference } = useSelector((state) => state.userReducer);
  const { company } = useSelector((state) => state.companyReducer);

  const closeRef = useRef();

  const [product, setProduct] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product);
    formData.append("category", category);
    formData.append("description", productDescription);
    formData.append("unit", unit);
    formData.append("price", price);
    formData.append("stock", stock);
    let promise = new Promise((resolve, reject) => {
      dispatch(addProductAction(company.id, token, formData));
      resolve();
    });
    promise
      .then(() => {
        closeRef.current.click();
      })
      .then(() => {
        setProduct("");
        setCategory("");
        setProductDescription("");
        setUnit("");
        setPrice("");
        setStock("");
      });
  };

  return (
    <>
      <div
        id='create_product'
        className='modal custom-modal fade'
        role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                {userPreference && userPreference.language_name == "EN"
                  ? "Add Product"
                  : "পণ্য যোগ করুন"}
              </h5>
              <button
                type='button'
                className='close'
                data-bs-dismiss='modal'
                aria-label='Close'
                ref={closeRef}>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language_name == "EN"
                          ? "Product Name"
                          : "পণ্যের নাম"}
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        name='name'
                        value={product}
                        onChange={(event) => {
                          setProduct(event.target.value);
                        }}
                        required
                      />
                      {product?.length >= 50 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          {userPreference &&
                          userPreference.language_name == "EN"
                            ? "Maximum 50 characters allowed"
                            : "সর্বোচ্চ ৫০ টি অক্ষর অনুমোদিত"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language_name == "EN"
                          ? "Category"
                          : "ক্যাটাগরি"}
                      </label>
                      <Form.Select
                        className='form-control'
                        type='text'
                        value={category}
                        name='name'
                        onChange={(event) => {
                          setCategory(event.target.value);
                        }}
                        defaultValue='default'
                        required>
                        {userPreference &&
                        userPreference.language_name == "EN" ? (
                          <option value=''>Select</option>
                        ) : (
                          <option value=''>নির্বাচন করুন</option>
                        )}
                        {productCategoryList &&
                          productCategoryList.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </Form.Select>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language_name == "EN"
                          ? "Description"
                          : "বিবরণ"}
                        <span className='text-danger'></span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={productDescription}
                        name='description'
                        onChange={(event) => {
                          setProductDescription(event.target.value);
                        }}
                        required
                      />
                      {productDescription?.length >= 100 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          {userPreference &&
                          userPreference.language_name == "EN"
                            ? "Maximum 100 characters allowed"
                            : "সর্বোচ্চ ১০০ টি অক্ষর অনুমোদিত"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language_name == "EN"
                          ? "Unit"
                          : "একক"}
                        <span className='text-danger'></span>
                      </label>
                      <Form.Select
                        className='form-control'
                        type='text'
                        value={unit}
                        name='name'
                        onChange={(event) => {
                          setUnit(event.target.value);
                        }}
                        required>
                        {userPreference &&
                        userPreference.language_name == "EN" ? (
                          <>
                            <option value=''>Select</option>
                            <option value='Piece'>Piece</option>
                            <option value='Kg'>Kg</option>
                            <option value='Gram'>Gram</option>
                            <option value='Litre'>Litre</option>
                            <option value='Box'>Box</option>
                            <option value='Pound'>Pound</option>
                            <option value='Dozen'>Dozen</option>
                            <option value='Other'>Other</option>
                          </>
                        ) : (
                          <>
                            <option value=''>নির্বাচন করুন</option>
                            <option value='Piece'>পিস</option>
                            <option value='Kg'>কেজি</option>
                            <option value='Gram'>গ্রাম</option>
                            <option value='Litre'>লিটার</option>
                            <option value='Box'>বক্স</option>
                            <option value='Pound'>পাউন্ড</option>
                            <option value='Dozen'>ডজন</option>
                            <option value='Other'>অন্যান্য</option>
                          </>
                        )}
                      </Form.Select>
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language_name == "EN"
                          ? "Price"
                          : "দাম"}
                        <span className='text-danger'></span>
                      </label>
                      <input
                        className='form-control'
                        type='number'
                        value={price}
                        name='number'
                        onChange={(event) => {
                          setPrice(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language_name == "EN"
                          ? "Stock"
                          : "স্টক"}
                        <span className='text-danger'></span>
                      </label>
                      <input
                        className='form-control'
                        type='number'
                        value={stock}
                        name='number'
                        onChange={(event) => {
                          setStock(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  {product?.length <= 50 &&
                  productDescription?.length <= 100 ? (
                    <button className='btn btn-primary submit-btn'>
                      {userPreference && userPreference.language_name == "EN"
                        ? "Submit"
                        : "সাবমিট"}
                    </button>
                  ) : (
                    <button className='btn btn-primary submit-btn' disabled>
                      {userPreference && userPreference.language_name == "EN"
                        ? "Submit"
                        : "সাবমিট"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
