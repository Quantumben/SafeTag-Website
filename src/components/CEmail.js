import React , {useState,useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"


import axios from 'axios';
import './css/registraion.css'

const CEmail = (props) => {

  const history = useNavigate();
  const [username , setUsername] = useState("");
  const [confirmCode , setConfirmCode] = useState("");

  const updateUsername = (e)=>{
    setUsername(e.target.value)
  }

  const updateCode = (e)=>{
    setConfirmCode(e.target.value)
  }

  const handleSubmit = async()=>{
    console.log("Me Sad Alone");
    if(username.length === 0 || confirmCode.length ===0){
      alert("All Input fields are required");
    }

    try{
      let response = await axios.post("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/users/confirm/"+username+"/"+confirmCode,{
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      console.log(response);

      if(response.status == 200){
        history("/login")
      }
    }
    catch(e){
      console.log(e.response.data.message);
    }



  }

  const resendCode = async ()=>{
    console.log("Everyone Hates me");
    try{
      let response = await axios.post("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/users/resend/"+username,{
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      if(response.status == 200){
        alert("Verification Code Resent")
      }
    }
    catch(e){
      console.log(e.response.data.message);
    }
  }


  useEffect(()=>{
    let usName = localStorage.getItem("redtrack-username")
    setUsername(usName)
  },[])


  return (
    <div>
        <Navigation />

      <div className ="register__container">
        <div className="heading">
          <h1>
            Confirm Email
          </h1>
        </div>
        <div className="registration__form">
          <input type="text" value={username} placeholder="Username" onChange ={updateUsername} required>
          </input>

          <input type="text" value = {confirmCode} placeholder="Confirmation Code" onChange ={updateCode} required>
          </input>
          <div className="signin__button__container">
            <button onClick ={handleSubmit} className="sigin__button">
              Confirm Email
            </button>
          </div>

          <div className="registration__footer">
            <p>
              Not Arrived ? <a href="javascript:void(0)" onClick={resendCode}> Resend Code</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CEmail
