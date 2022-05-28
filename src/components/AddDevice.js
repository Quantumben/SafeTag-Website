import React , {useState,useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"

import Error from "./Error"

import refresLogin from "../utils/refreshLogin"

import axios from 'axios';
import "./css/addDevice.css"


const Plans = (props) => {

  const history = useNavigate()



  const [userEmail , setEmail] = useState("");
  const [stripeId , setStripeId] = useState(true);
  const [buttonStatus , setButtonStats] = useState("Add Payment Button")
  const [but_disabled , setButDis] = useState(true);
  const [hitRoute , setHitRoute]= useState("create-setup-session")
  const [butVal , showBut] = useState(false)
  const [Price_Month, setPriceMonth] = useState('Loading');
  const [Price_year , setPriceYear] = useState('Loading');
  const [tracker_id , setTrackerId] = useState("");
  const [tracker_name , setTrackerName] = useState("");
  const [subVal , setsub] = useState("y");
  const [error , setError]= useState(false);
  const [errorMsg , setErrorMsg] = useState();

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
            history("/login")
            return
          }
          if(username){
            showBut(true)
          }
          if(username.length == 0){
            history("/login")
          }

          // let response = await axios.get("https://api.safetagtracking.com/users/"+username , {
          //   headers : {
          //     "Authorization" : await localStorage.getItem('redtrack-id_token')
          //   }
          // })
          //
          // if(response.status === 200){
          //   response = response.data
          //   setEmail(response.username)
          //   setStripeId(response.stripe_id)
          //
          //
          //
          //   setButDis(false)
          // }
          //
          // else{
          //   history("/login")
          // }


          let response = await axios.get("https://api.safetagtracking.com/data/prices");
          if(response.status === 200){
            response = response.data;

            setPriceMonth(response.m01);
            setPriceYear(response.y01);

          }

          else{
            alert('Unable to get prices, Contact Support')
          }

        }
        catch(e){
          console.log(e.response);
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
    // let response = await axios.get("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/"+hitRoute+"/"+userEmail , {
    //   headers : {
    //     "Authorization" : await localStorage.getItem('redtrack-id_token')
    //   }
    //   })
    //
    //   if(response.status === 200){
    //     response = response.data
    //     window.location.href = response.url;
    //     return null;
    //   }

    let payload = {
      imei : tracker_id,
      name : tracker_name
    }



    if(payload.imei.length > 20){
      setError(true);
      setErrorMsg("Tracker ID should be 15 Characters Long");
      return;
    }

    if(payload.name.length <= 1){
      setError(true);
      setErrorMsg("Enter A Valid Tracker Name");
      return;
    }

    setError(false);

    const username = await localStorage.getItem('redtrack-username');

    payload = JSON.stringify(payload);

    console.log(payload);

    let response = await axios.patch("https://api.safetagtracking.com/device/"+username , {data : payload} , {
      headers : {
        "Authorization" : await localStorage.getItem('redtrack-id_token'),
        "Content-type" : "application/json"
      }
    })


    console.log(response);


    }

    catch(e){

      console.log(e.response);

      if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          history("/Login");
          return;
        }

        await localStorage.setItem("redtrack-id_token" , respo.token);
        handleSubmit();

      }

      setError(true);
      if(e.response.data.message == "Cannot read property 'owner_id' of undefined"){
        setErrorMsg("This device ID could not be found.")
      }
      else{
        setErrorMsg(e.response.data.message);
      }

    }
  }
  return (
    <div >
      <Navigation />
      <div className ="plans__container">
        <div className="heading">
          <h2>
            Add A Device
          </h2>
        </div>

        <div className="plans">
          <div className="left__container plan">
            <div className="heading">
              <p>
                SafeTag (1 month)
              </p>
            </div>
            <div className="price__details">
              <p className="price__price">
                £{Price_Month}
              </p>
              <p>
                Every Month
              </p>
            </div>
            <div className="price__footer">
              <p>
                Track 1 SafeTag Device 24/7 for 1 Month
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
                SafeTag (1 Year)
              </p>
            </div>
            <div className="price__details">
              <p className="price__price">
                £{Price_year}
              </p>
              <p>
                Every Year
              </p>
            </div>
            <div className="price__footer">
              <p>
                Track 1 SafeTag Device 24/7 for a year with 10% discount
              </p>
            </div>
          </div>
        </div>

        {
          (error)?
          <Error message={errorMsg} />
          :
          <></>
        }

        <div className="add_device_form_container">
          <div className="form__input">
            <p>
              Please Enter The Tracker's ID
            </p>

            <input type="text" value={tracker_id} name="tracker_id" placeholder="AA-BBBBBB-CCCCCC-D" onChange= {(e)=> setTrackerId(e.target.value)}>
            </input>
          </div>

          <div className="form__input">
            <p>
              Please Choose A Name For Your Tracker
            </p>

            <input type="text" value={tracker_name} name="tracker_name" placeholder="" onChange= {(e)=> setTrackerName(e.target.value)}>
            </input>
          </div>
          <div className="form__input__sub">
            <div id="monthly_sub" className="" onClick={(e)=>{setsub('m') ; e.target.classList.add('active') ; document.getElementById('yearly_sub').classList.remove('active')}}>

                Monthly

            </div>

            <div id="yearly_sub" className="active" onClick={(e)=>{setsub('y') ; e.target.classList.add('active') ; document.getElementById('monthly_sub').classList.remove('active')}}>

                Yearly

            </div>
          </div>

          <div className="form__action__buttons">
            <button className="purchase" onClick={handleSubmit}>
              Purchase Subscription
            </button>

            <Link to="/myDevice">
              Cancel
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Plans
