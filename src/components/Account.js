import React , {useState,useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"


import axios from 'axios';
import './css/account.css'

const Account = (props) => {

  const history = useNavigate()


  const [userCountry , setCountry] = useState("");
  const [userEmail , setEmail] = useState("");
  const [userName , setName] = useState("");
  const [contat , setContact] = useState("");
  const [stripeId , setStripeId] = useState(true);
  const [buttonStatus , setButtonStats] = useState("Add Payment Button")
  const [but_disabled , setButDis] = useState(true);
  const [hitRoute , setHitRoute]= useState("create-setup-session")


  const handleSubmit = async ()=>{
    try{
    let response = await axios.get("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/"+hitRoute+"/"+userEmail , {
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
    if(stripeId != true && stripeId != null){
      setButtonStats("Update Payment Method")
      setHitRoute("create-portal-session")
    }
  },[stripeId])


  useEffect(()=>{

    const fetchDetails = async ()=>{
      try{
        const username = await localStorage.getItem('redtrack-username');
        setEmail(username);

        let response = await axios.get("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/users/"+username , {
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
        if(e.response.data.message == 'jwt expired'){
            history("/login")
        }
      }
    }


    fetchDetails();
  },[])
  return (
    <div>
    <Navigation />

      <div className="account__container">
        <div className="left__section">
          <div className="heading">
            <h1>
                Your Details
            </h1>
          </div>
          <div className="details">
            <p>
              Email : {userEmail}
            </p>
          </div>
          <div className="details">
            <p>
              Name : {userName}
            </p>
          </div>
          <div className="details">
            <p>
              Contact Method : Email
            </p>
          </div>
          <div className="details">
            <p>
              Country : {userCountry}
            </p>
          </div>
        </div>
        <div className="right__container">
          <div className="heading">
            <h1>
              Billing Details
            </h1>
          </div>

          <div className="payment_button">
            <button className="details p_but" disabled = {but_disabled} onClick= {handleSubmit}>
              {
                buttonStatus
              }
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Account
