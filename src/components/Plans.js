import React , {useState,useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"


import axios from 'axios';
import "./css/plans.css"


const Plans = (props) => {

  const history = useNavigate()



  const [userEmail , setEmail] = useState("");
  const [stripeId , setStripeId] = useState(true);
  const [buttonStatus , setButtonStats] = useState("Add Payment Button")
  const [but_disabled , setButDis] = useState(true);
  const [hitRoute , setHitRoute]= useState("create-setup-session")
  const [butVal , showBut] = useState(false)

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
          if(!username){
            return
          }
          if(username){
            showBut(true)
          }
          if(username.length == 0){
            history("/login")
          }

          let response = await axios.get("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/users/"+username , {
            headers : {
              "Authorization" : await localStorage.getItem('redtrack-id_token')
            }
          })

          if(response.status === 200){
            response = response.data
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

  const handleSubmit= async ()=>{
    console.log("Life Sucks!");
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
  return (
    <div >
      <Navigation />
      <div className ="plans__container">
        <div className="heading">
          <h2>
            View Subscription Plans
          </h2>
        </div>

        <div className="plans">
          <div className="left__container plan">
            <div className="heading">
              <p>
                Red Track (1 month)
              </p>
            </div>
            <div className="price__details">
              <p className="price__price">
                £4.99
              </p>
              <p>
                Every Month
              </p>
            </div>
            <div className="price__footer">
              <p>
                Track 1 RedTrack Device 24/7 for 1 Month
              </p>
            </div>
          </div>
          <div className="right__container plan">
            <div className="best__plan">
              <p>
                Best Plan
              </p>
            </div>
            <div className="heading">
              <p>
                Red Track (1 Year)
              </p>
            </div>
            <div className="price__details">
              <p className="price__price">
                £53.99
              </p>
              <p>
                Every Year
              </p>
            </div>
            <div className="price__footer">
              <p>
                Track 1 RedTrack Device 24/7 for a year with 10% discount
              </p>
            </div>
          </div>
        </div>

        <div className="plans__button__container">
          {
            (butVal)?
          <button onClick ={handleSubmit} className="plans__button" disabled = {but_disabled}>
            {
              buttonStatus
            }
          </button>
          :
          <></>
        }
        </div>

      </div>
    </div>
  )
}

export default Plans
