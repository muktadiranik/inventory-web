import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./profile.css";
import Company from "./Company";
import Editor from "./Editor";
import UpdateUser from "./UpdateUser";
import UserInformation from "./UserInformation";

const Profile = () => {
  const { userPreference, userDetails } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  }, []);

  return (
    <div className='page-wrapper'>
      <Helmet>
        <title>Employee Profile - Tohobil Inventory</title>
        <meta name='description' content='Reactify Blank Page' />
      </Helmet>
      <ToastContainer />
      <div className='content container-fluid'>
        <div className='page-header'>
          <div className='row'>
            <div className='col-sm-12'>
              <h3 className='page-title'>
                {userPreference && userPreference.language_name == "EN"
                  ? "Profile"
                  : "প্রোফাইল"}
              </h3>
              <ul className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/app/main/dashboard'>
                    {userPreference && userPreference.language_name == "EN"
                      ? "Dashboard"
                      : "ড্যাশবোর্ড"}
                  </Link>
                </li>
                <li className='breadcrumb-item active'>
                  {userPreference && userPreference.language_name == "EN"
                    ? "Profile"
                    : "প্রোফাইল"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <UserInformation />
      </div>
      {userDetails && userPreference && userDetails.id && <UpdateUser />}
      <div className=' row'>
        {userDetails && userDetails.is_owner && <Editor />}
        {userDetails && userDetails.is_owner && <Company />}
      </div>
    </div>
  );
};
export default Profile;
