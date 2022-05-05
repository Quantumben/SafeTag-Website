import React , {useState} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"

import axios from 'axios';
import './css/registraion.css'

const Register = (props) => {

  const history = useNavigate();

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [checked , setChecked] = useState("");
  const [country , setCountry] = useState("")

  const updateName = (e)=>{
    setName(e.target.value)
  }

  const updateEmail = (e)=>{
    setEmail(e.target.value)
  }
  const updatePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handleCheck = (e) =>{
    const checked = e.target.checked

    if(checked){
      setChecked('email')
    }
    else{
      setChecked("")
    }
  }

  const updateCountry = (e)=>{
    setCountry(e.target.value);

  }

  const handleSubmit = async ()=>{
    console.log('No one loves me');
    if(name.length === 0 || password.length === 0 || email.length === 0){
      alert("Fields cannot be empty");
      return;
    }
    let data = {
      name : name ,
      username : email,
      password : password,
      country : country,
      contact : checked
    }

    data = JSON.stringify(data);
    try{
      let response = await axios.post("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/users" , data ,{
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      console.log(response);
      await localStorage.setItem("redtrack-username" , email)
      if(response.status === 200){
        history("/confirmEmail/")
      }
    }

    catch (e){
      console.log(e.response);
    }


  }
  return (
    <div>
      <Navigation />
      <div className="register__container">
        <div className="heading">
          <h1>
            Sign Up
          </h1>
        </div>

        <div className="registration__form">
          <input type="text" value = {name}  placeholder="Name" onChange= {updateName} required></input>
          <input type="email" value = {email}  placeholder="Email" onChange= {updateEmail} required></input>
          <input type="password" value = {password}  placeholder="Password" onChange= {updatePassword} required></input>
          <input type="text" value={country}  placeholder="Country"  onChange={updateCountry}></input>
          <div className="checkbox__container">
          <input type="checkbox" vale="" onClick={handleCheck} className="checkBox">
          </input>
          <span>
            I want to receive RedTrack Updates
          </span>
          </div>

        </div>
        <div className="signin__button__container">
          <button onClick ={handleSubmit} className="sigin__button">
            Sign Up
          </button>
        </div>

        <div className="registration__footer">
          <p>
            Already a Member? <Link to="login"> Log In</Link>
          </p>
        </div>

      </div>
    </div>
  )

}

export default Register
