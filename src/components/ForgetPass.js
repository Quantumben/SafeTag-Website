
import React , {useState,useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"


import axios from 'axios';
import './css/registraion.css'
import './css/forgotPass.css'

const ForgetPass = (props) => {

  const history = useNavigate()

  const [username ,setUsername] = useState("")
  const [confirmCode , setConfirmCode] = useState("")
  const [newPass , setNewPass] = useState("")
  const [showBelow , updateShowBelow] = useState(false);



  const updateName = (e)=>{
    setUsername(e.target.value)
  }

  const handleSendCode = async() => {
    try{

    if(username.length === 0 ){
      alert('Please Enter a Username')
    }
    const response = await axios.post("https://api.safetagtracking.com/users/reset/" + username, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    console.log(response);
    if(response.status === 200){
      updateShowBelow(true);
    }
    }
    catch(e){
      console.log(e.response.data.message);
    }

  }


  const updateCode = (e)=>{
    setConfirmCode(e.target.value)
  }

  const updatePass = (e)=>{
    setNewPass(e.target.value)
  }



  const handleSubmit = async()=>{
      try{
        let data = {
          password : newPass
        }

        data = JSON.stringify(data);

        let response = await axios.post("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/users/reset/"+username+"/"+confirmCode ,data, {
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        if(response.status === 200){
          history("/login")
        }
      }

      catch(e){
        console.log(e.response.data.message);
      }
  }

  return (
    <div>
      <Navigation />
      <div className="register__container">
        <div className="heading">
          <h1>
            Forgot Password
          </h1>
        </div>

        <div className="registration__form">
            <input type="text" value = {username}  placeholder="Username" onChange= {updateName} required></input>
              <div className="registration__footer">
                <p>
                 <Link to="login" onClick={(event)=>{event.preventDefault() ; handleSendCode(); }}>Send Confirmation Code</Link>
                </p>
              </div>
              {
                showBelow ?
                <>
                <input type="text" value = {confirmCode}  placeholder="Confirmation Code" onChange= {updateCode} required className="updatePassInput"></input>
                <input type="password" value = {newPass}  placeholder="New Password" onChange= {updatePass} required></input>
                </>
                :
                <div></div>
              }
        </div>
          {
            showBelow ?
            <div className="signin__button__container">
              <button onClick ={handleSubmit} className="sigin__button">
                Update Password
              </button>
            </div>
            :
            <div></div>
          }


      </div>
  </div>
  )
}

export default ForgetPass
