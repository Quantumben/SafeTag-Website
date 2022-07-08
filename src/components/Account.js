import React , {useState,useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"


import axios from 'axios';
import './css/account.css'
import Footer2 from './Footer2';
import {AiOutlineCloseCircle} from "react-icons/ai"
import refresLogin from "../utils/refreshLogin"

const Account = (props) => {

  const history = useNavigate()


  const [userCountry , setCountry] = useState("");
  const [userEmail , setEmail] = useState("");
  const [userName , setName] = useState("");
  const [contat , setContact] = useState("");
  const [stripeId , setStripeId] = useState(true);
  const [but_disabled , setButDis] = useState(true);


  const handleSubmit = async ()=>{
    try{
    let response = await axios.get("https://api.safetagtracking.com/create-portal-session/"+userEmail+"/account" , {
      headers : {
        "Authorization" : await localStorage.getItem('redtrack-id_token')
      }
      })

      if(response.status === 200){
        response = response.data
        window.location.href = response.url;
        return null;
      }
    }

    catch(e){
      console.log(e.response.data.message);
    }
  }


  useEffect(()=>{

    const fetchDetails = async ()=>{
      try{
        const username = await localStorage.getItem('redtrack-username');
        setEmail(username);

        let response = await axios.get("https://api.safetagtracking.com/users/"+username , {
          headers : {
            "Authorization" : await localStorage.getItem('redtrack-id_token')
          }
        })
        if(response.status === 200){
          response = response.data
          setContact(response.contact)
          setName(response.name)
          setCountry(response.country)
          setEmail(response.username)
          setStripeId(response.stripe_id)
          setButDis(false)
        }
        else{
          history("/login")
        }
      }
      catch(e){
        console.log(e.response.data.message);
        if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
          let respo = await refresLogin();
          if(respo.message != 'okay'){
            history("/Login");
            return;
          }
          await localStorage.setItem("redtrack-id_token" , respo.token);
          fetchDetails();
          return;
        }
      }
    }
    fetchDetails();
  },[])
  
  return (
    <div>

    <h1 className=' mt-10 text-5xl font-bold w-full text-center'>My Account</h1>
      <div className="account__container px-3 lg:px-0">
        <div className="left__section w-full lg:w-1/3 ">
        <p className=' font-semibold '> Name</p>
          <div className="details">
            <p>
              {userName}
            </p>
          </div>
        <p className=' font-semibold '> Email</p>
          <div className="details">
            <p>
              {userEmail}
            </p>
          </div>
         
     
          <p className=' font-semibold '> Country</p>
          <div className="details">
            <p>
               {userCountry}
            </p>
          </div>
          <p className=' font-semibold  flex items-center gap-2'> Contact   <AiOutlineCloseCircle className=' text-gray-600 cursor-pointer w-6 h-6' /></p>
        
        </div>
        <div className="left__section w-full lg:w-1/3 ">
        <div className="payment_button flex items-center gap-3">
          <p className=' font-semibold'>Billing</p>
            <button className=" px-8  text-white font-semibold bg-pr py-2 rounded-xl" disabled = {but_disabled} onClick= {handleSubmit}>
              Billing Settings
            </button>
          </div>
      </div>
    
      </div>
      <Footer2/>

    </div>
  )
}

export default Account
