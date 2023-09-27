import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap-v5";
import { addEditorAction } from "../../redux/actions/editorActions";

const AddEditor = ({ groupList }) => {
  const dispatch = useDispatch();

  const { company } = useSelector((state) => state.companyReducer);
  const { userPreference } = useSelector((state) => state.userReducer);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [groups, setGroups] = useState([]);

  const closeRef = useRef();

  const [eye, seteye] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("groups", groups);
    formData.append("is_editor", true);
    formData.append("is_owner", false);
    formData.append("is_active", true);
    formData.append("is_staff", true);
    const promise = new Promise((resolve, reject) => {
      dispatch(addEditorAction(company.id, formData));
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
        setPassword("");
        setPhone("");
        setGroups([]);
      });
  };

  return (
    <>
      <div id="add_editor" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userPreference && userPreference.language_name === "EN" ? (
                  <span>Add Editor</span>
                ) : (
                  <span>এডিটর যোগ করুন</span>
                )}
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
              <form onSubmit={onSubmitHandler}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <Form.Group className="col-md-6">
                        <Form.Label>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>First Name</span>
                          ) : (
                            <span>নামের প্রথম অংশ</span>
                          )}
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={firstName}
                          name="first_name"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                        {firstName.length > 20 && (
                          <span className="text-danger mt-2 d-inline-block">
                            {userPreference &&
                            userPreference.language_name === "EN" ? (
                              <span>Maximum 15 characters allowed</span>
                            ) : (
                              <span>সর্বোচ্চ ১৫ টি অক্ষর অনুমোদিত</span>
                            )}
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group className="col-md-6">
                        <Form.Label>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Last Name</span>
                          ) : (
                            <span>নামের শেষ অংশ</span>
                          )}
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={lastName}
                          name="last_name"
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                        {lastName.length > 20 && (
                          <span className="text-danger mt-2 d-inline-block">
                            {userPreference &&
                            userPreference.language_name === "EN" ? (
                              <span>Maximum 15 characters allowed</span>
                            ) : (
                              <span>সর্বোচ্চ ১৫ টি অক্ষর অনুমোদিত</span>
                            )}
                          </span>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <Form.Group className="col-md-6">
                        <Form.Label>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Email</span>
                          ) : (
                            <span>ইমেইল</span>
                          )}
                        </Form.Label>
                        <Form.Control
                          required
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6">
                        <Form.Label>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Password</span>
                          ) : (
                            <span>পাসওয়ার্ড</span>
                          )}
                        </Form.Label>
                        <div className="pass-group">
                          <Form.Control
                            type={eye ? "password" : "text"}
                            value={password}
                            name="password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <span
                            onClick={onEyeClick}
                            className={`fa toggle-password" ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Form.Group className="col-md-6">
                    <Form.Label>
                      {userPreference &&
                      userPreference.language_name === "EN" ? (
                        <span>Phone</span>
                      ) : (
                        <span>ফোন নম্বর</span>
                      )}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={phone}
                      name="phone"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="col-md-6">
                    <Form.Label>
                      {userPreference &&
                      userPreference.language_name === "EN" ? (
                        <span>Groups</span>
                      ) : (
                        <span>গ্রুপ</span>
                      )}
                    </Form.Label>
                    <Form.Select
                      multiple
                      required
                      type="text"
                      value={groups}
                      onChange={(e) => {
                        setGroups(
                          Array.from(
                            e.target.selectedOptions,
                            (item) => item.value
                          )
                        );
                      }}
                    >
                      {groupList.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="submit-section">
                  {firstName?.length <= 20 &&
                  lastName?.length <= 20 &&
                  phone?.length <= 15 ? (
                    <button className="btn btn-primary submit-btn">
                      {userPreference && userPreference.language_name === "EN"
                        ? "Submit"
                        : "সাবমিট"}
                    </button>
                  ) : (
                    <button className="btn btn-primary submit-btn" disabled>
                      {userPreference && userPreference.language_name === "EN"
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

export default AddEditor;
