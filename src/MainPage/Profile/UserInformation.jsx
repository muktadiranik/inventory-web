import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./profile.css";
import { API_URL } from "../../redux/actions/API_URL";
import { User } from "../../Entryfile/imagepath";

const UserInformation = () => {
  const {
    userPreference,
    userDetails,
    updatedUserDetails,
    success: userSuccess,
    error: userError,
  } = useSelector((state) => state.userReducer);

  const ref1 = useRef(false);

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  }, []);

  useEffect(() => {
    if (ref1.current) {
      if (userError) {
        if (userError.response.data) {
          for (const key in userError.response.data) {
            if (userError.response.data.hasOwnProperty(key)) {
              const element = userError.response.data[key];
              toast.error(`${key}: ${element[0]}`);
            }
          }
          return;
        }
      }
      if (userSuccess) {
        if (updatedUserDetails) {
          if (updatedUserDetails.id) toast.success("User updated successfully");
        }
      }
    }
    ref1.current = true;
  }, [updatedUserDetails, userSuccess, userError]);

  return (
    <div className='card mb-0'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='pro-edit'>
              <a
                data-bs-target='#profile_info'
                data-bs-toggle='modal'
                className='edit-icon'
                href='#'>
                <i className='fa fa-pencil' />
              </a>
            </div>
            <div className='profile-view-user'>
              <div className='profile-basic-user'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div
                      className='profile-info-left user-profile-avater'
                      style={{ textAlign: "center" }}>
                      {userDetails && userDetails.image ? (
                        <img
                          src={`${API_URL}${userDetails.image}`}
                          alt='user'
                        />
                      ) : (
                        <img src={User} alt='user' />
                      )}
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='profile-info-left'>
                      <ul className='personal-info'>
                        <li>
                          <div className='title'>
                            {userPreference &&
                            userPreference.language_name === "EN"
                              ? "First Name:"
                              : "নামের প্রথম অংশ:"}
                          </div>
                          <div className='text'>
                            <p>
                              {userDetails && userDetails.first_name
                                ? userDetails.first_name
                                : "N/A"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className='title'>
                            {userPreference &&
                            userPreference.language_name === "EN"
                              ? "Last Name:"
                              : "নামের শেষ অংশ:"}
                          </div>
                          <div className='text'>
                            <p>
                              {userDetails && userDetails.last_name
                                ? userDetails.last_name
                                : "N/A"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className='title'>
                            {userPreference &&
                            userPreference.language_name === "EN"
                              ? "Phone:"
                              : "ফোন:"}
                          </div>
                          <div className='text'>
                            <p>
                              {userDetails && userDetails.phone
                                ? userDetails.phone
                                : "N/A"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className='title'>
                            {userPreference &&
                            userPreference.language_name === "EN"
                              ? "Email:"
                              : "ইমেইল:"}
                          </div>
                          <div className='text'>
                            <p>{userDetails && userDetails.email}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <ul className='personal-info'>
                      <li>
                        <div className='title'>
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Company:"
                            : "কোম্পানি:"}
                        </div>
                        <div className='text'>
                          <p>{userPreference && userPreference.company_name}</p>
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Currency:"
                            : "মুদ্রা:"}
                        </div>
                        <div className='text'>
                          <p>
                            {userPreference && userPreference.currency_name}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Language:"
                            : "ভাষা:"}
                        </div>
                        <div className='text'>
                          <p>
                            {userPreference && userPreference.language_name}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
