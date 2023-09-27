import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionAction } from "../../../redux/actions/transactionActions";

const CreateTransaction = () => {
  const dispatch = useDispatch();
  const { isLoading, addedTransaction, error } = useSelector(
    (state) => state.addTransactionReducer
  );
  const { key } = useSelector((state) => state.getAuthTokenReducer);
  const { company } = useSelector((state) => state.getCompanyReducer);
  const [buyerSeller, setBuyerSeller] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [unitPrice, setUnitPrice] = React.useState("");
  const [paidAmount, setPaidAmount] = React.useState("");
  const [accountType, setAccountType] = React.useState("INCOME");

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("buyer_seller", buyerSeller);
    formData.append("product_description", productDescription);
    formData.append("quantity", quantity);
    formData.append("unit_price", unitPrice);
    formData.append("paid_amount", paidAmount);
    formData.append("account_type", accountType);
    dispatch(addTransactionAction(company.id, key, formData));
  };

  return (
    <>
      {/* Add User Modal */}
      <div
        id='create_transaction'
        className='modal custom-modal fade'
        role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Create Transaction</h5>
              <h5 className='modal-title'>Create Transaction</h5>
              <button
                type='button'
                className='close'
                data-bs-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        Buyer/Seller <span className='text-danger'>*</span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={buyerSeller}
                        onChange={(event) => {
                          setBuyerSeller(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        Product Description
                        <span className='text-danger'>*</span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={productDescription}
                        onChange={(event) => {
                          setProductDescription(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        Quantity<span className='text-danger'>*</span>
                      </label>
                      <input
                        className='form-control'
                        type='number'
                        value={quantity}
                        onChange={(event) => {
                          setQuantity(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        Unit Price <span className='text-danger'>*</span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={unitPrice}
                        onChange={(event) => {
                          setUnitPrice(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <label>
                      Account Type <span className='text-danger'>*</span>
                    </label>
                    <div className='form-group form-focus select-focus'>
                      <select
                        className='select floating'
                        value={accountType}
                        onChange={(event) => {
                          setAccountType(event.target.value);
                        }}
                        required>
                        <option value='INCOME'>Income</option>
                        <option value='EXPENSE'>Expense</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        Paid Amount <span className='text-danger'>*</span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={paidAmount}
                        onChange={(event) => {
                          setPaidAmount(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add User Modal */}
    </>
  );
};

export default CreateTransaction;
