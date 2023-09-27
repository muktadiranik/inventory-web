import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { emailrgx } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { getAuthKeyAction } from "../redux/actions/authActions.js";
import Header from "./Sidebar/header.jsx";
import { ToastContainer, toast } from "react-toastify";

const schema = yup.object({
  email: yup
    .string()
    .matches(emailrgx, "Email is required")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(5)
    .max(100)
    .required("Password is required")
    .trim(),
});

const Loginpage = (props) => {
  const dispatch = useDispatch();
  const { token, success, error } = useSelector((state) => state.userReducer);
  const [eye, seteye] = useState(true);

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(getAuthKeyAction(data));
  };

  useEffect(() => {
    if (token && token.length > 0) {
      props.history.push("/app/main/dashboard");
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      if (error.response.data) {
        for (const key in error.response.data) {
          if (error.response.data.hasOwnProperty(key)) {
            const element = error.response.data[key];
            toast.error(`${key}: ${element[0]}`);
            break;
          }
        }
      }
    }
    if (success) toast.success("Logged in successfully");
  }, [error, success]);

  const onEyeClick = () => {
    seteye(!eye);
  };
  return (
    <>
      <Helmet>
        <title>Login -Tohobil Inventory</title>
        <meta name='description' content='Login page' />
      </Helmet>
      <Header />
      <ToastContainer />
      <div className='account-content mt-5'>
        <div className='container'>
          <div className='account-logo'>
            <Link to='/app/main/dashboard'>
              <img src={Applogo} alt="Dreamguy's Technologies" />
            </Link>
          </div>
          <div className='account-box'>
            <div className='account-wrapper'>
              <h3 className='account-title'>Login</h3>
              <p className='account-subtitle'>Access to our dashboard</p>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='form-group'>
                    <label>Email Address</label>
                    <Controller
                      name='email'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          className={`form-control  ${
                            errors?.email ? "error-input" : ""
                          }`}
                          type='text'
                          value={value}
                          onChange={onChange}
                          autoComplete='false'
                        />
                      )}
                    />
                    <small>{errors?.email?.message}</small>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col'>
                        <label>Password</label>
                      </div>
                      <div className='col-auto'>
                        <Link className='text-muted' to='/forgotpassword'>
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Controller
                      name='password'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className='pass-group'>
                          <input
                            type={eye ? "password" : "text"}
                            className={`form-control  ${
                              errors?.password ? "error-input" : ""
                            }`}
                            value={value}
                            onChange={onChange}
                            autoComplete='false'
                          />
                          <span
                            onClick={onEyeClick}
                            className={`fa toggle-password" ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          />
                        </div>
                      )}
                    />
                    <small>{errors?.password?.message}</small>
                  </div>
                  <div className='form-group text-center'>
                    <button
                      className='btn btn-primary account-btn'
                      type='submit'>
                      Login
                    </button>
                  </div>
                </form>
                <div className='account-footer'>
                  <p>
                    Don't have an account yet?{" "}
                    <Link to='/register'>Register</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
