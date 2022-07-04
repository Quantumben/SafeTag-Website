import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Error from "./Error";

import axios from "axios";

import "./css/login.css";
import Footer2 from "./Footer2";
const Login = (props) => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [butval, setButVal] = useState("Log In");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password.length === 0 || email.length === 0) {
      setError(true);
      setErrorMessage("Fields can't be empty");
      return;
    }
    
    setButVal("Logging In");
    setDisabled(true);

    let data = {
      username: email,
      password: password,
    };

    data = JSON.stringify(data);
    try {
      let response = await axios.post(
        "https://api.safetagtracking.com/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        response = response.data;
        await localStorage.setItem("redtrack-id_token", response.IdToken);
        await localStorage.setItem("redtrack-ref_token", response.RefreshToken);
        await localStorage.setItem("redtrack-username", email);
        history("/my-devices");
        return null;
      }
    } catch (e) {
      console.log(e.response.data.message);
      setError(true);
      setErrorMessage(e.response.data.message);
    }

    setButVal("Log In");
    setDisabled(false);
  };

  return (
    <div>
      <Navigation />
      {error ? <Error message={errorMessage} /> : <></>}
      <h1 className=" mt-10 text-5xl font-bold w-full text-center">Login</h1>
      <div className="login__container ">
        <div className="heading">
          <p className=" font-semibold ">
            New to this site?{" "}
            <Link to="/signup" className=" border-b border-black">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="login__form">
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={onEmailInput}
          ></input>

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={onPasswordInput}
          ></input>
          <Link
            to="/forgetPass"
            className=" text-gray-600 text-sm font-semibold"
          >
            Forget Password?
          </Link>
        </div>
        <div className="login__button__container">
          <button
            className="login__button"
            onClick={handleSubmit}
            disabled={disabled}
          >
            {butval}
          </button>
        </div>
      </div>
   <div className=" mt-40">
   <Footer2 />
   </div>
    </div>
  );
};

export default Login;
