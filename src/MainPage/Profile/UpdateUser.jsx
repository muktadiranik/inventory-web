import React, { useEffect, useState, useRef } from "react";
import {
  updateUserDetailsAction,
  updateUserPreferenceAction,
} from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap-v5";
import "./profile.css";
import { API_URL } from "../../redux/actions/API_URL";
import { User } from "../../Entryfile/imagepath";

const UpdateUser = () => {
  const dispatch = useDispatch();

  const { userPreference, userDetails } = useSelector(
    (state) => state.userReducer
  );
  const { languageList } = useSelector((state) => state.languageReducer);
  const { currencyList } = useSelector((state) => state.currencyReducer);
  const { companyList, company, addedCompany } = useSelector(
    (state) => state.companyReducer
  );
  const { addedEditor } = useSelector((state) => state.editorReducer);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [changeCompany, setChangeCompany] = useState("");

  const closeRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);
    formData.append("image", image);
    const preferenceData = new FormData();
    preferenceData.append("currency", currency);
    preferenceData.append("language", language);
    preferenceData.append("company", changeCompany);
    const promise = new Promise((resolve, reject) => {
      dispatch(updateUserDetailsAction(formData));
      resolve();
    });
    promise
      .then(() => {
        dispatch(updateUserPreferenceAction(preferenceData));
      })
      .then(() => {
        closeRef.current.click();
      });
  };

  useEffect(() => {
    setFirstName(userDetails && userDetails.first_name);
    setLastName(userDetails && userDetails.last_name);
    setPhone(userDetails && userDetails.phone);
    setCurrency(userDetails && userPreference.currency);
    setLanguage(userDetails && userPreference.language);
    setChangeCompany(userDetails && userPreference.company);
  }, [company, addedEditor, addedCompany, addedCompany, addedEditor]);

  return (
    <div id='profile_info' className='modal custom-modal fade' role='dialog'>
      <div
        className='modal-dialog modal-dialog-centered modal-lg'
        role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              {userPreference && userPreference.language_name === "EN" ? (
                <span>Update Profile Information</span>
              ) : (
                <span>প্রোফাইল তথ্য আপডেট করুন</span>
              )}
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
            <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='profile-update-img'>
                    {userDetails && userDetails.image ? (
                      <img
                        id='image'
                        src={`${API_URL}${userDetails.image}`}
                        alt='user'
                      />
                    ) : (
                      <img id='image' src={User} alt='user' />
                    )}
                    <div className='file'>
                      <Form.Label>
                        {userPreference &&
                        userPreference.language_name === "EN" ? (
                          <span>Change Photo</span>
                        ) : (
                          <span>ছবি পরিবর্তন করুন</span>
                        )}
                      </Form.Label>
                      <Form.Control
                        type='file'
                        onChange={(event) => {
                          setImage(event.target.files[0]);
                          if (event.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              document.getElementById("image").src =
                                reader.result;
                            };
                            reader.readAsDataURL(event.target.files[0]);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <Form.Group className='col-md-6'>
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
                        type='text'
                        value={firstName}
                        name='first_name'
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      {firstName && firstName?.length >= 20 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Maximum 20 characters allowed</span>
                          ) : (
                            <span>সর্বোচ্চ ২০ টি অক্ষর অনুমোদিত</span>
                          )}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className='col-md-6'>
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
                        type='text'
                        value={lastName}
                        name='last_name'
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                      {lastName && lastName?.length >= 20 && (
                        <span className='text-danger mt-2 d-inline-block'>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Maximum 20 characters allowed</span>
                          ) : (
                            <span>সর্বোচ্চ ২০ টি অক্ষর অনুমোদিত</span>
                          )}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className='row'>
                <Form.Group className='col-md-6'>
                  <Form.Label>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Currency</span>
                    ) : (
                      <span>মুদ্রা</span>
                    )}
                  </Form.Label>
                  <Form.Select
                    required
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                    }}>
                    {currencyList &&
                      currencyList.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='col-md-6'>
                  <Form.Label>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Language</span>
                    ) : (
                      <span>ভাষা</span>
                    )}
                  </Form.Label>
                  <Form.Select
                    required
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}>
                    {languageList &&
                      languageList.map((language) => (
                        <option key={language.id} value={language.id}>
                          {language.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='col-md-6'>
                  <Form.Label>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Company</span>
                    ) : (
                      <span>কোম্পানি</span>
                    )}
                  </Form.Label>
                  <Form.Select
                    value={changeCompany}
                    onChange={(e) => {
                      setChangeCompany(e.target.value);
                    }}>
                    {companyList &&
                      companyList.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.title}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='col-md-6'>
                  <Form.Label>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Phone</span>
                    ) : (
                      <span>ফোন</span>
                    )}
                  </Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={phone}
                    name='phone'
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  {phone && phone?.length >= 15 && (
                    <span className='text-danger mt-2 d-inline-block'>
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
              <div className='submit-section'>
                {firstName?.length <= 20 &&
                lastName?.length <= 20 &&
                phone?.length <= 15 ? (
                  <button className='btn btn-primary submit-btn'>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Submit</span>
                    ) : (
                      <span>জমা দিন</span>
                    )}
                  </button>
                ) : (
                  <button className='btn btn-primary submit-btn' disabled>
                    {userPreference && userPreference.language_name === "EN" ? (
                      <span>Submit</span>
                    ) : (
                      <span>জমা দিন</span>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
