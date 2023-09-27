import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap-v5";
import { getCompanyTypeListAction } from "../../redux/actions/companyActions";
import { updateCompanyAction } from "../../redux/actions/companyActions";

const UpdateCompany = ({ companyObject }) => {
  const dispatch = useDispatch();

  const { companyTypeList } = useSelector((state) => state.companyReducer);
  const { userPreference } = useSelector((state) => state.userReducer);

  const [companyTitle, setCompanyTitle] = useState("");
  const [companyType, setCompanyType] = useState("");

  const closeRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", companyTitle);
    formData.append("company_type", companyType);
    const promise = new Promise((resolve, reject) => {
      dispatch(updateCompanyAction(formData, companyObject.id));
      resolve();
    });
    promise.then(() => {
      closeRef.current.click();
    });
  };

  useEffect(() => {
    dispatch(getCompanyTypeListAction());
    if (companyTypeList) {
      if (companyTypeList.length > 0) {
        setCompanyType(companyTypeList[0].id);
      }
    }
    setCompanyTitle(companyObject.title);
    setCompanyType(companyObject.company_type);
  }, [companyObject]);

  return (
    <>
      <div
        id='update_company'
        className='modal custom-modal fade'
        role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                {userPreference && userPreference.language_name === "EN" ? (
                  <span>Update Company</span>
                ) : (
                  <span>কোম্পানি আপডেট করুন</span>
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
              <form onSubmit={onSubmitHandler}>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='row'>
                      <Form.Group className='col-md-6'>
                        <Form.Label>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Company Title</span>
                          ) : (
                            <span>কোম্পানির শিরোনাম</span>
                          )}
                        </Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter company title'
                          value={companyTitle}
                          name='title'
                          onChange={(e) => {
                            setCompanyTitle(e.target.value);
                          }}
                          required
                        />
                        {companyTitle && companyTitle?.length >= 100 && (
                          <span className='text-danger mt-2 d-inline-block'>
                            {userPreference &&
                            userPreference.language_name === "EN" ? (
                              <span>Maximum 100 characters</span>
                            ) : (
                              <span>সর্বোচ্চ ১০০ অক্ষর</span>
                            )}
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group className='col-md-6'>
                        <Form.Label>
                          {userPreference &&
                          userPreference.language_name === "EN" ? (
                            <span>Company Type</span>
                          ) : (
                            <span>কোম্পানির ধরন</span>
                          )}
                        </Form.Label>
                        <Form.Select
                          required
                          value={companyType}
                          onChange={(e) => {
                            setCompanyType(e.target.value);
                            e.target.value;
                          }}>
                          <option value=''>Select</option>
                          {companyTypeList &&
                            companyTypeList.map((company) => (
                              <option key={company.id} value={company.id}>
                                {company.company_type}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  {companyTitle?.length <= 100 && companyType != "" ? (
                    <button className='btn btn-primary submit-btn'>
                      {userPreference &&
                      userPreference.language_name === "EN" ? (
                        <span>Submit</span>
                      ) : (
                        <span>জমা দিন</span>
                      )}
                    </button>
                  ) : (
                    <button className='btn btn-primary submit-btn' disabled>
                      {userPreference &&
                      userPreference.language_name === "EN" ? (
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
    </>
  );
};

export default UpdateCompany;
