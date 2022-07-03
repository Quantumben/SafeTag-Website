import React , {useState , useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"
import axios from 'axios'
import Error from "./Error"
import refresLogin from "../utils/refreshLogin"


import "./css/myDevice.css"
import Footer2 from './Footer2'

const MyDevice = (props) => {

  const history = useNavigate();
  const [error , setError]= useState(false);
  const [errorMsg , setErrorMsg] = useState();
  const[devices , setDevices] = useState([]);
  const [popUpD , setPopupD] = useState(false);
  const [popUpC , setPopupC] = useState(false);
  const [popUpB , setPopupB] = useState(false);
  const [popUpA , setPopupA] = useState(false);
  const [devEditId , setDevEditId] = useState("");
  const [deviceName , setDeviceName] = useState("");
  const [devRemovalId , setRemovalId] = useState("");
  const [devCancelId , setCancelId] = useState("");
  const [noDev , setNoDev] = useState(true);
  const [cancelError , setCancelError] = useState(false);
  const [cancelErrorMsg , setCancelErrorMsg] =  useState("")

  useEffect(()=>{
    const helper = async ()=>{
      try{

      let username = await localStorage.getItem('redtrack-username');

      let response = await axios.get("https://api.safetagtracking.com/device/"+username , {
        headers : {
          "Authorization" : await localStorage.getItem('redtrack-id_token')
        }
      })

      response = response.data;
      if(response == "No devices found"){
        return;
      }
      if(response.length > 0){
        setNoDev(false)
        response.forEach((item, i) => {
          let bat = item.status.battery;
          let say;
          if(bat == 1){
            say ="Extremely Low (0-15%)"
          }
          else if (bat == 2){
            say = "Very Low (16-30%)"
          }
          else if( bat == 3){
            say = "Low (31-45%)"
          }
          else if(bat == 4){
            say = "Medium (46-60%)"
          }
          else if(bat == 5){
            say = "High (61-75%)"
          }
          else if(bat == 6){
            say = "Very High (76-100%)"
          }

          response[i].status.saying = say;
          if(item.subscription.status != "active")
            setPopupD(true);
        });
      }

      await setDevices([...response]);





    }
    catch(e){
      console.log(e);
      console.log(e.response);
      if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          history("/Login");
          return;
        }
        setError(false)
        await localStorage.setItem("redtrack-id_token" , respo.token);
        helper();
        return;

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
    helper();
  },[]);


  const handleUpdateSub = async ()=>{
    try{
      let username = await localStorage.getItem('redtrack-username');
      let response = await axios.get("https://api.safetagtracking.com/create-portal-session/"+username+"/myDevice" , {
        headers : {
          "Authorization" : await localStorage.getItem('redtrack-id_token')
        }
      })

      response = response.data;
      window.location.href = response.url;
      return null;
    }
    catch(e){
      console.log(e.response);
      if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          history("/Login");
          return;
        }
        setError(false)
        await localStorage.setItem("redtrack-id_token" , respo.token);
        handleUpdateSub();
        return;

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


  const handleEditStart = (e) =>{
      setDevEditId(e.target.id);
      setPopupC(true);
  }


  const handleUpdateName = async()=>{
    try{


      let username = await localStorage.getItem('redtrack-username');
      let payload ={
        name : deviceName,
        device_id : devEditId
      }
      setPopupC(false);
      setDeviceName("");
      payload = JSON.stringify(payload);
      let response = await axios.patch("https://api.safetagtracking.com/device/name/"+username, payload ,{
        headers : {
          "Authorization" : await localStorage.getItem('redtrack-id_token'),
          "Content-type" : "application/json"
        }
      })

      response = response.data;

      if(response.acknowledged == true){
        window.location.reload();
      }
    }
    catch(e){
      console.log(e.response);
      if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          history("/Login");
          return;
        }
        setError(false)
        await localStorage.setItem("redtrack-id_token" , respo.token);
        handleUpdateSub();
        return;

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

  const handlePreRemoval = (e)=>{
    setRemovalId(e.target.id);
    setPopupA(true);
  }

  const handleRemoval = async()=>{
    try{

      let username = await localStorage.getItem('redtrack-username');
      let response = await axios.patch("https://api.safetagtracking.com/device/remove/"+username+"?device_id="+devRemovalId ,{}, {
        headers : {
          "Authorization" : await localStorage.getItem('redtrack-id_token')
        }
      })


      response = response.data;
      window.location.reload();
      return null;
    }
    catch(e){
      console.log(e.response);
      if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          history("/Login");
          return;
        }
        setError(false)
        await localStorage.setItem("redtrack-id_token" , respo.token);
        handleRemoval();
        return;

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

  const handleRedirect = ()=>{
    history("/addDevice");
  }

  const handlePreCancel = (e) =>{
    setCancelId(e.target.id);
    setPopupB(true);
  }

  const handleCancel = async ()=>{
    try{
      let username = await localStorage.getItem('redtrack-username');
      let response = await axios.delete("https://api.safetagtracking.com/device/subscription/"+username+"?device_id="+devCancelId , {
        headers : {
          "Authorization" : await localStorage.getItem('redtrack-id_token')
        }
      })

      window.location.reload();
      return;

    }
    catch(e){
      console.log(e.response);
      if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          history("/Login");
          return;
        }
        setError(false)
        await localStorage.setItem("redtrack-id_token" , respo.token);
        handleCancel();
        return;

      }

      setCancelError(true);
      setCancelErrorMsg(e.response.data.message);
      return;
    }
  }


  const handleRenewSub = async (e)=>{
    try{
      let iemi = e.target.id;
      let username = await localStorage.getItem('redtrack-username');
      let response = await axios.get("https://api.safetagtracking.com/device/subscription/"+username+"/"+iemi+"/m" , {
        headers : {
          "Authorization" : await localStorage.getItem('redtrack-id_token')
        }
      })

      if(response.status == 200){
        window.location.href = response.data.url;
        return;
      }
      return;
    }
    catch(e){
      console.log(e.response);
      if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          history("/Login");
          return;
        }
        setError(false)
        await localStorage.setItem("redtrack-id_token" , respo.token);
        handleRenewSub();
        return;

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
        {
          (error)?
          <Error message={errorMsg} />
          :
          <></>
        }
        
    <div className="device__list__container min-h-screen">
     
        <h1 className=' w-full text-center text-4xl font-bold pb-7'>My Trackers</h1>
    
      {
        (noDev)?
        <p style={{textAlign : "center"}}>It looks like you haven’t paired any trackers to your account yet. Please press the add tracker button below to get started.</p>
        :
        devices.map((device) => {
          return (
          <div className="device__container" key={device._id}>
            <div className="left__section ">
              <div className=' flex items-center gap-2'>
              <img className=' w-20 h-20 object-contain' src="./assets/loc.png"></img>
               <div className='hidden lg:block'>
               <p className="device__name clear-left text-xl font-semibold">{device.prefs.name}  <span id={device._id} onClick={handleEditStart}> <img id={device._id} className="editName" src="./assets/edit.png"></img> </span> </p>
                <p className=' text-gray-500'>{device._id}</p>
               </div>
              </div>
            </div>
            <div className="middle__section">
           <div className=' block lg:hidden'>
           <p className="device__name  text-sm font-semibold">{device.prefs.name}   </p>
           </div>
                <div className="item">
                  <img className=' w-4 h-4 object-contain' src="./assets/battery.png"></img>
                  <p className=' text-sm'>{device.status.battery ? device.status.saying : "unavailable"}</p>
                </div>
                <div className="item">
                  <img className=' w-4 h-4 object-contain' src="./assets/clock.png"></img>
                  <p className=' text-sm'>{device.status.speed >= 0? device.status.speed + " km/h" : "unavailable"}</p>
                </div>
                <div className="item">
                  <img className=' w-4 h-4 object-contain' src="./assets/wifi.png"></img>
                  <p className=' text-sm'>{device.status.signal ? device.status.signal + "%": "unavailable"}</p>
                </div>
                <div className="item ">
                  <img className=' w-4 h-4 object-contain' src="./assets/location.png"></img>
                  <p className=' text-sm'>{device.status.location ? <a href={"https://maps.google.com/?q="+device.status.location} target="_blank" rel="noreferrer"> {device.status.location}</a> : "unavailable"}</p>
                </div>
         
            </div>
            <div className="right__section flex items-center flex-col lg:flex-row justify-center ">
              <div className="sub__status">
                <p>{device.subscription.status ? device.subscription.status : "Overdue"}</p>
              </div>
              {
                ( device.subscription.status=='active')?
                <button id={device._id} className="action__button" onClick={handlePreCancel}>
                  Cancel
                </button>
                :
                ( device.subscription.status=='past_due' || device.subscription.status=='incomplete' )?
                <button className="action__button" onClick={handleUpdateSub}>
                  Manage
                </button>
                :
                <button className="action__button" id={device._id} onClick={handleRenewSub}>
                  Renew
                </button>
              }

            </div>

            <div className='close'>
              <p id={device._id} onClick={handlePreRemoval}>
                X
              </p>
            </div>
          </div>
        )
        })

      }
  
    </div>
    {
      (popUpC) ?
      <div className = "popUpD">
        <p>
          Enter Your Device Name
        </p>
        <input type="text" name="device-name" placeholder="Device Name" value={deviceName} onChange = {(e)=>setDeviceName(e.target.value)} />
        <div className="popUp__buttons">
          <button className="portal" onClick={handleUpdateName}>
            Save
          </button>

          <button onClick ={() => {setPopupC(false);setDeviceName("")}}>
            Dismiss
          </button>
        </div>
      </div>
      :
      <></>
    }
    {
      (popUpD) ?
      <div className = "popUpD">
        <p>
          It looks like your tracker subscription payments have failed. Please update your payment method within 7 days, or these trackers will be removed from your account.
        </p>
        <div className="popUp__buttons">
          <button className="portal" onClick={handleUpdateSub}>
            Take me to your portal
          </button>

          <button onClick ={() => setPopupD(false)}>
            Dismiss
          </button>
        </div>
      </div>
      :
      <></>
    }
    {
    (popUpA) ?
    <div className = "popUpD">
      <p>
        Would you like to remove this device? This will cancel the associated subscription and remove all related data from your account.
      </p>
      <div className="popUp__buttons">
        <button className="portal" onClick={handleRemoval}>
          Confirm
        </button>

        <button onClick ={() => setPopupA(false)}>
          Cancel
        </button>
      </div>
    </div>
    :
    <></>
  }
  {
  (popUpB) ?
  <div className = "popUpD">
    <p>
      Would you like to cancel your subscription plan? This will suspend your devices tracking capabilities and remove all associated data from your account.
    </p>
    <div className="popUp__buttons">
      <button className="portal" onClick={handleCancel}>
        Confirm
      </button>

      <button onClick ={() => {setPopupB(false);setCancelError(false)}}>
        Cancel
      </button>
    </div>
    {
      (cancelError)?
      <p style={{textAlign : 'center' , color : 'red' , marginTop : "16px"}}>{cancelErrorMsg}</p>
      :
      <></>
    }
  </div>
  :
  <></>
}

<Footer2/>
    </div>
  )
}

export default MyDevice
