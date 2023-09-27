import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCSIBAction } from "../../redux/actions/customerActions";

const AddCSIB = () => {
  const dispatch = useDispatch();

  const { company } = useSelector((state) => state.companyReducer);
  const { csibTypeList } = useSelector((state) => state.CSIBReducer);

  const closeRef = useRef();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [customerType, setCustomerType] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("customer_type", customerType);
    let promise = new Promise((resolve, reject) => {
      dispatch(addCSIBAction(company.id, formData));
      resolve();
    });
    promise
      .then(() => {
        closeRef.current.click();
      })
      .then(() => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setCustomerType("");
      });
  };

  return (
    <>
      <div id='add_csib' className='modal custom-modal fade' role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                Add New Customer, Supplier, Investor or Borrower
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
                        First Name <span className='text-danger'></span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={firstName}
                        name='first_name'
                        onChange={(event) => {
                          setFirstName(event.target.value);
                        }}
                        required
                      />
                      {firstName?.length >= 50 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          Maximum 20 characters allowed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Last Name</label>
                      <input
                        className='form-control'
                        type='text'
                        value={lastName}
                        name='last_name'
                        onChange={(event) => {
                          setLastName(event.target.value);
                        }}
                      />
                      {lastName?.length >= 50 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          Maximum 20 characters allowed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Address</label>
                      <input
                        className='form-control'
                        type='text'
                        value={address}
                        name='address'
                        onChange={(event) => {
                          setAddress(event.target.value);
                        }}
                      />
                      {address?.length >= 50 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          Maximum 100 characters allowed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        Email <span className='text-danger'></span>
                      </label>
                      <input
                        className='form-control'
                        type='email'
                        value={email}
                        name='email'
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Phone </label>
                      <input
                        className='form-control'
                        type='text'
                        value={phone}
                        name='phone'
                        onChange={(event) => {
                          setPhone(event.target.value);
                        }}
                        required
                      />
                      {phone?.length >= 50 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          Maximum 15 characters allowed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Select Cutomer Type </label>
                      <select
                        className='form-control'
                        type='text'
                        value={customerType}
                        name='customer_type'
                        onChange={(event) => {
                          setCustomerType(event.target.value);
                        }}
                        required>
                        <option value=''>Select Customer Type</option>
                        {csibTypeList &&
                          csibTypeList.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.customer_type}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  {customerType != "" &&
                  firstName?.length <= 20 &&
                  lastName?.length <= 20 &&
                  address?.length <= 100 &&
                  phone?.length <= 15 &&
                  email?.length <= 50 ? (
                    <button className='btn btn-primary submit-btn'>
                      Submit
                    </button>
                  ) : (
                    <button className='btn btn-primary submit-btn' disabled>
                      Submit
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

export default AddCSIB;
