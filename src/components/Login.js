import React , {useState} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"
import Error from "./Error"

import axios from 'axios';

import "./css/login.css"
const Login = (props) => {

  const history = useNavigate()
  const [email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const [disabled , setDisabled] = useState(false);
  const [butval , setButVal] = useState('Log In');
  const [error , setError] = useState(false);
  const[errorMessage , setErrorMessage] = useState("");

  const onEmailInput = (e)=>{
    setEmail(e.target.value);
  }

  const onPasswordInput = (e)=>{
    setPassword(e.target.value);
  }

  const handleSubmit = async()=>{
    setButVal('Logging In');
    setDisabled(true);

    let data = {
      username : email,
      password : password
    }

    data = JSON.stringify(data);
    try{

    let response = await axios.post("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/login" ,
    data,
    {
      headers :{
        'Content-Type': 'application/json'
      },

    }
    )

    if(response.status == 200){
      response = response.data;
      await localStorage.setItem("redtrack-id_token" , response.IdToken)
      await localStorage.setItem("redtrack-ref_token" , response.RefreshToken)
      await localStorage.setItem("redtrack-username" , email)
      history("/account");
      return null;
    }
    }
    catch(e){
      console.log(e.response.data.message);
      setError(true);
      setErrorMessage(e.response.data.message);
    }

    setButVal('Log In');
    setDisabled(false);

  }


  return (
    <div>
    <Navigation />
    {
      (error)?
      <Error message={errorMessage} />
      :
      <></>
    }
    <div className="login__container">
      <div className="heading">
      <h1>
        Log In
      </h1>
      <p>
        New to this site? <Link to="/signup">Sign Up</Link>
      </p>
    </div>

    <div className="login__form">
      <p>Email*</p>
      <input type="text" value={email} placeholder="Email" onChange={onEmailInput}></input>
      <p>Password*</p>
      <input type="password" value={password} placeholder="Password" onChange={onPasswordInput}></input>
      <Link to="/forgetPass">Forget Password?</Link>
    </div>
    <div className="login__button__container">
      <button className="login__button" onClick={handleSubmit} disabled ={disabled}>
        {butval}
      </button>
    </div>
    </div>
    </div>
  )
}

export default Login
