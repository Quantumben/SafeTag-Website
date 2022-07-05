import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

import axios from "axios";
import "./css/registraion.css";
import "./css/forgotPass.css";
import Footer2 from "./Footer2";
import Error from "./Error";

const ForgetPass = (props) => {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showBelow, updateShowBelow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateName = (e) => {
    setUsername(e.target.value);
  };

  const handleSendCode = async () => {
    try {
      if (username.length === 0) {
        alert("Please Enter a Username");
      }
      const response = await axios.post(
        "https://api.safetagtracking.com/users/reset/" + username,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        updateShowBelow(true);
      }
      setError(false);
      setErrorMessage("");
    } catch (e) {
      setError(true);
      setErrorMessage(e.response.data.message);
      console.log(e.response.data.message);
    }
  };

  const updateCode = (e) => {
    setConfirmCode(e.target.value);
  };

  const updatePass = (e) => {
    setNewPass(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      let data = {
        password: newPass,
      };

      data = JSON.stringify(data);

      let response = await axios.post(
        "https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/users/reset/" +
          username +
          "/" +
          confirmCode,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        history("/login");
      }
    } catch (e) {
      setError(true)
      var err_response = e.response.data.message
      console.log(e.response.data.message);
      if(err_response=="Username/client id combination not found."){
        setErrorMessage("Account not found.")
      }else if(err_response=="1 validation error detected: Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$"){
        setErrorMessage("Please enter a valid password")
      }else if (err_response=="Password does not conform to policy: Password must have numeric characters"){
        setErrorMessage("Passwords must contain letters and numbers")
      }else if (err_response=="Invalid verification code provided, please try again"){
        setErrorMessage("Invalid verification code provided, please try again.")
      }else{
        setErrorMessage("Password could not be reset, please contact support")
      }      
    }
  };

  return (
    <div>
      {error ? <Error message={errorMessage} /> : <></>}
        <h1 className=" mt-10 text-5xl font-bold w-full text-center">
        Reset Password
      </h1>
      <div className="register__container mt-10">
        <div className="registration__form">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={updateName}
            required
          ></input>
          
          <button
            onClick={(event) => {
              event.preventDefault();
              handleSendCode();
            }}
            className="sigin__button"
          >
            Send Confirmation Code
          </button>

          {showBelow ? (
            <>
              <input
                type="text"
                value={confirmCode}
                placeholder="Confirmation Code"
                onChange={updateCode}
                required
                className="updatePassInput"
              ></input>
              <input
                type="password"
                value={newPass}
                placeholder="New Password"
                onChange={updatePass}
                required
              ></input>
            </>
          ) : (
            <div></div>
          )}
        </div>
        {showBelow ? (
          <div className="signin__button__container">
            <button onClick={handleSubmit} className="sigin__button">
              Update Password
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className=" mt-72">
        <Footer2 />
      </div>
    </div>
  );
};

export default ForgetPass;
