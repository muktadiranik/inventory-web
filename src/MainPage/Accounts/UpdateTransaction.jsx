import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransactionAction } from "../../redux/actions/transactionActions";
import axios from "axios";
import { API_URL } from "../../redux/actions/API_URL";
import { Form } from "react-bootstrap-v5";

const CreateTransaction = ({ transactionObject }) => {
  const dispatch = useDispatch();

  const { token, userPreference } = useSelector((state) => state.userReducer);
  const { company } = useSelector((state) => state.companyReducer);
  const { csibList } = useSelector((state) => state.CSIBReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { addedTransaction } = useSelector((state) => state.transactionReducer);

  const closeRef = useRef();

  const [buyerSellerType, setBuyerSellerType] = React.useState("");
  const [buyerSeller, setBuyerSeller] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unitPrice, setUnitPrice] = React.useState("");
  const [paidAmount, setPaidAmount] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [productStock, setProductStock] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (accountType === "Invest") {
      formData.append("buyer_seller", buyerSeller);
      formData.append("description", productDescription);
      formData.append("paid_amount", paidAmount);
      formData.append("account_type", accountType);
    } else {
      formData.append("buyer_seller", buyerSeller);
      formData.append("product", product);
      formData.append("description", productDescription);
      if (quantity !== "") {
        formData.append("quantity", quantity);
      } else {
        formData.append("quantity", 0);
      }
      if (unitPrice !== "") {
        formData.append("unit_price", unitPrice);
      } else {
        formData.append("unit_price", 0);
      }
      if (paidAmount !== "") {
        formData.append("paid_amount", paidAmount);
      } else {
        formData.append("paid_amount", 0);
      }
      formData.append("account_type", accountType);
    }
    let promise = new Promise((resolve, reject) => {
      dispatch(
        updateTransactionAction(
          company.id,
          token,
          formData,
          transactionObject.id
        )
      );
      resolve();
    });
    promise
      .then(() => {
        closeRef.current.click();
      })
      .then(() => {
        setBuyerSellerType("");
        setBuyerSeller("");
        setProduct("");
        setProductDescription("");
        setQuantity("");
        setUnitPrice("");
        setPaidAmount("");
        setAccountType("");
        setProductStock("");
      });
  };

  const getProductUnitPrice = (companyId, productId) => {
    axios
      .get(`${API_URL}/api/companies/${companyId}/products/${productId}/`, {
        headers: {
          Authorization: `token ${localStorage.getItem("key")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setUnitPrice(data.price);
        setProductStock(data.stock);
      });
  };

  useEffect(() => {
    setAccountType(transactionObject.account_type);
    if (transactionObject.buyer_seller) {
      setBuyerSellerType(transactionObject.buyer_seller.customer_type_name);
    }
    setBuyerSeller(transactionObject.buyer_seller_id);
    if (transactionObject.product) {
      setProduct(transactionObject.product.id);
    }
    setProductDescription(transactionObject.description);
    setQuantity(transactionObject.quantity);
    setUnitPrice(transactionObject.unit_price);
    setPaidAmount(transactionObject.paid_amount);
  }, [transactionObject]);

  return (
    <>
      <div
        id='update_transaction'
        className='modal custom-modal fade'
        role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              {userPreference && userPreference.language_name === "EN" ? (
                <h5 className='modal-title'>Update Transaction</h5>
              ) : (
                <h5 className='modal-title'>লেনদেন আপডেট করুন</h5>
              )}
              <button
                id='close_create_transaction'
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
                        {userPreference &&
                        userPreference.language_name === "EN" ? (
                          <span>Account Type</span>
                        ) : (
                          <span>অ্যাকাউন্টের ধরন</span>
                        )}
                        <span className='text-danger'></span>
                      </label>
                      <Form.Select
                        className='form-control'
                        type='text'
                        value={accountType ? accountType : ""}
                        name='account_type'
                        onChange={(event) => {
                          setAccountType(event.target.value);
                          if (event.target.value === "") {
                            setBuyerSellerType("");
                          }
                          if (event.target.value === "Invest") {
                            setBuyerSellerType("INVESTOR");
                          }
                          if (event.target.value === "Income") {
                            setBuyerSellerType("CUSTOMER");
                          }
                          if (event.target.value === "Expense") {
                            setBuyerSellerType("SUPPLIER");
                          }
                        }}
                        required>
                        {userPreference &&
                        userPreference.language_name === "EN" ? (
                          <>
                            <option value=''>Select</option>
                            <option value='Income'>Income</option>
                            <option value='Expense'>Expense</option>
                            <option value='Due Pay'>Due Pay</option>
                            <option value='Due Receive'>Due Receive</option>
                            <option value='Invest'>Invest</option>
                          </>
                        ) : (
                          <>
                            <option value=''>নির্বাচন করুন</option>
                            <option value='Income'>আয়</option>
                            <option value='Expense'>ব্যয়</option>
                            <option value='Due Pay'>বাকি পরিশোধ</option>
                            <option value='Due Receive'>বাকি গ্রহণ</option>
                            <option value='Invest'>বিনিয়োগ</option>
                          </>
                        )}
                      </Form.Select>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language === "EN" ? (
                          <span>Buyer/Seller Type</span>
                        ) : (
                          <span>ক্রেতা/বিক্রেতার ধরন</span>
                        )}
                        <span className='text-danger'></span>
                      </label>
                      <Form.Select
                        className='form-control'
                        type='select'
                        value={buyerSellerType ? buyerSellerType : ""}
                        onChange={(event) => {
                          setBuyerSellerType(event.target.value);
                        }}
                        required>
                        {userPreference &&
                        userPreference.language_name === "EN" ? (
                          <>
                            {accountType === "Invest" ? (
                              <option value='INVESTOR'>INVESTOR</option>
                            ) : accountType === "Income" ? (
                              <>
                                <option value=''>Select</option>
                                <option value='CUSTOMER'>CUSTOMER</option>
                                <option value='BORROWER'>BORROWER</option>
                              </>
                            ) : accountType === "Expense" ? (
                              <option value='SUPPLIER'>SUPPLIER</option>
                            ) : (
                              <>
                                <option value=''>Select</option>
                                <option value='CUSTOMER'>CUSTOMER</option>
                                <option value='SUPPLIER'>SUPPLIER</option>
                                <option value='BORROWER'>BORROWER</option>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {accountType === "Invest" ? (
                              <option value='INVESTOR'>বিনিয়োগকারী</option>
                            ) : accountType === "Income" ? (
                              <>
                                <option value=''>নির্বাচন করুন</option>
                                <option value='CUSTOMER'>কাস্টমার</option>
                                <option value='BORROWER'>ঋণগ্রহীতা</option>
                              </>
                            ) : accountType === "Expense" ? (
                              <option value='SUPPLIER'>বিক্রেতা</option>
                            ) : (
                              <>
                                <option value=''>নির্বাচন করুন</option>
                                <option value='CUSTOMER'>কাস্টমার</option>
                                <option value='SUPPLIER'>বিক্রেতা</option>
                                <option value='BORROWER'>ঋণগ্রহীতা</option>
                              </>
                            )}
                          </>
                        )}
                      </Form.Select>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language === "EN" ? (
                          <span>Buyer/Seller</span>
                        ) : (
                          <span>ক্রেতা/বিক্রেতা</span>
                        )}
                        <span className='text-danger'></span>
                      </label>
                      <Form.Select
                        className='form-control'
                        type='select'
                        value={buyerSeller ? buyerSeller : ""}
                        onChange={(event) => {
                          setBuyerSeller(event.target.value);
                        }}
                        required>
                        <option value=''>Select</option>
                        {csibList &&
                          csibList.map((csib) => {
                            if (csib.customer_type_name === buyerSellerType)
                              return (
                                <option key={csib.id} value={csib.id}>
                                  {csib.full_name}
                                </option>
                              );
                          })}
                      </Form.Select>
                    </div>
                  </div>
                  {accountType === "Invest" ||
                  accountType === "Due Pay" ||
                  accountType === "Due Receive" ? (
                    <></>
                  ) : (
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label>
                          {userPreference &&
                          userPreference.language === "EN" ? (
                            <span>Product</span>
                          ) : (
                            <span>পণ্য</span>
                          )}
                          <span className='text-danger'></span>
                        </label>
                        <Form.Select
                          className='form-control'
                          type='select'
                          value={product ? product : ""}
                          onChange={(event) => {
                            setProduct(event.target.value);
                            getProductUnitPrice(company.id, event.target.value);
                          }}
                          required>
                          <option value=''>Select</option>
                          {productList &&
                            productList.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                        </Form.Select>
                      </div>
                    </div>
                  )}
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language === "EN" ? (
                          <span>Description</span>
                        ) : (
                          <span>বিবরণ</span>
                        )}
                        <span className='text-danger'></span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={productDescription ? productDescription : ""}
                        name='description'
                        onChange={(event) => {
                          setProductDescription(event.target.value);
                        }}
                      />
                      {productDescription?.length >= 100 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          Maximum 100 characters allowed
                        </span>
                      )}
                    </div>
                  </div>
                  {accountType === "Invest" ||
                  accountType === "Due Pay" ||
                  accountType === "Due Receive" ? (
                    <></>
                  ) : (
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label>
                          {userPreference &&
                          userPreference.language === "EN" ? (
                            <span>Quantity</span>
                          ) : (
                            <span>পরিমাণ</span>
                          )}
                          <span className='text-danger'></span>
                        </label>
                        <input
                          className='form-control'
                          type='number'
                          value={quantity ? quantity : ""}
                          name='quantity'
                          onChange={(event) => {
                            setQuantity(event.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                  )}
                  {accountType === "Invest" ||
                  accountType === "Due Pay" ||
                  accountType === "Due Receive" ? (
                    <></>
                  ) : (
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label>
                          {userPreference &&
                          userPreference.language === "EN" ? (
                            <span>Unit Price</span>
                          ) : (
                            <span>একক মূল্য</span>
                          )}
                          <span className='text-danger'></span>
                        </label>
                        <input
                          className='form-control'
                          type='number'
                          value={unitPrice ? unitPrice : ""}
                          name='number'
                          onChange={(event) => {
                            setUnitPrice(event.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        {userPreference && userPreference.language === "EN" ? (
                          <span>Paid Amount</span>
                        ) : (
                          <span>পরিশোধিত টাকা</span>
                        )}
                        <span className='text-danger'></span>
                      </label>
                      <input
                        className='form-control'
                        type='number'
                        value={paidAmount ? paidAmount : ""}
                        name='number'
                        onChange={(event) => {
                          setPaidAmount(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  {accountType === "Invest" ||
                  accountType === "Due Pay" ||
                  accountType === "Due Receive" ? (
                    <></>
                  ) : (
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label>
                          {userPreference &&
                          userPreference.language === "EN" ? (
                            <span>Total Price</span>
                          ) : (
                            <span>মোট টাকা</span>
                          )}
                          <span className='text-danger'></span>
                        </label>
                        <input
                          className='form-control'
                          type='number'
                          value={unitPrice * quantity}
                          name='number'
                          disabled
                        />
                      </div>
                    </div>
                  )}
                  {accountType === "Invest" ||
                  accountType === "Due Pay" ||
                  accountType === "Due Receive" ? (
                    <></>
                  ) : (
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label>
                          {userPreference &&
                          userPreference.language === "EN" ? (
                            <span>Stock</span>
                          ) : (
                            <span>স্টক</span>
                          )}
                          <span className='text-danger'></span>
                        </label>
                        <input
                          className='form-control'
                          type='number'
                          value={productStock ? productStock : 0}
                          name='number'
                          disabled
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className='submit-section'>
                  {productDescription?.length <= 100 ? (
                    <button className='btn btn-primary submit-btn'>
                      {userPreference && userPreference.language === "EN" ? (
                        <span>Submit</span>
                      ) : (
                        <span>সাবমিট</span>
                      )}
                    </button>
                  ) : (
                    <button className='btn btn-primary submit-btn' disabled>
                      {userPreference && userPreference.language === "EN" ? (
                        <span>Submit</span>
                      ) : (
                        <span>সাবমিট</span>
                      )}
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

export default CreateTransaction;
