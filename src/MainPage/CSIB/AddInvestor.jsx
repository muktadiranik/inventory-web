import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCSIBAction } from "../../redux/actions/customerActions";

const AddInvestor = ({ customerType }) => {
  const dispatch = useDispatch();

  const { company } = useSelector((state) => state.companyReducer);
  const { userPreference } = useSelector((state) => state.userReducer);

  const closeRef = useRef();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");

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
      });
  };

  return (
    <>
      <div id="add_investor" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userPreference && userPreference?.language_name === "EN"
                  ? "Add Investor"
                  : "বিনিয়োগকারী যোগ করুন"}
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        {userPreference &&
                        userPreference?.language_name === "EN"
                          ? "First Name"
                          : "প্রথম নাম"}
                        <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={firstName}
                        name="first_name"
                        required
                        onChange={(event) => {
                          setFirstName(event.target.value);
                        }}
                      />
                      {firstName?.length >= 20 && (
                        <span className="text-danger mt-2 d-inline-block">
                          {userPreference &&
                          userPreference?.language_name === "EN"
                            ? "Maximum 20 characters allowed"
                            : "সর্বোচ্চ ২০ টি অক্ষর অনুমোদিত"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        {userPreference &&
                        userPreference?.language_name === "EN"
                          ? "Last Name"
                          : "শেষ নাম"}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={lastName}
                        name="last_name"
                        onChange={(event) => {
                          setLastName(event.target.value);
                        }}
                      />
                      {lastName?.length >= 20 && (
                        <span className="text-danger mt-2 d-inline-block">
                          {userPreference &&
                          userPreference?.language_name === "EN"
                            ? "Maximum 20 characters allowed"
                            : "সর্বোচ্চ ২০ টি অক্ষর অনুমোদিত"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        {userPreference &&
                        userPreference?.language_name === "EN"
                          ? "Address"
                          : "ঠিকানা"}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={address}
                        name="address"
                        onChange={(event) => {
                          setAddress(event.target.value);
                        }}
                      />
                      {address?.length >= 100 && (
                        <span className="text-danger mt-2 d-inline-block">
                          {userPreference &&
                          userPreference?.language_name === "EN"
                            ? "Maximum 100 characters allowed"
                            : "সর্বোচ্চ ১০০ টি অক্ষর অনুমোদিত"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        {userPreference &&
                        userPreference?.language_name === "EN"
                          ? "Email"
                          : "ইমেইল"}
                        <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        name="email"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        {userPreference &&
                        userPreference?.language_name === "EN"
                          ? "Phone"
                          : "ফোন"}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={phone}
                        name="phone"
                        required
                        onChange={(event) => {
                          setPhone(event.target.value);
                        }}
                      />
                      {phone?.length >= 15 && (
                        <span className="text-danger mt-2 d-inline-block">
                          {userPreference &&
                          userPreference?.language_name === "EN"
                            ? "Maximum 15 characters allowed"
                            : "সর্বোচ্চ ১৫ টি অক্ষর অনুমোদিত"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  {firstName?.length <= 20 &&
                  lastName?.length <= 20 &&
                  address?.length <= 100 &&
                  phone?.length <= 15 &&
                  email?.length <= 50 ? (
                    <button className="btn btn-primary submit-btn">
                      {userPreference && userPreference?.language_name === "EN"
                        ? "Submit"
                        : "সাবমিট"}
                    </button>
                  ) : (
                    <button className="btn btn-primary submit-btn" disabled>
                      {userPreference && userPreference?.language_name === "EN"
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

export default AddInvestor;
