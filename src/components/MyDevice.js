import React , {useState , useEffect} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"
import axios from 'axios'
import Error from "./Error"
import refresLogin from "../utils/refreshLogin"


import "./css/myDevice.css"

const MyDevice = (props) => {

  const history = useNavigate();
  const [error , setError]= useState(false);
  const [errorMsg , setErrorMsg] = useState();
  const[devices , setDevices] = useState([]);
  const [popUpD , setPopupD] = useState(false);
  const [devEditId , setDevEditId] = useState("");
  const [popUpC , setPopupC] = useState(false);
  const [deviceName , setDeviceName] = useState("");

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
      response.forEach((item, i) => {
        console.log(item);
        if(item.subscription.status != "active")
          setPopupD(true);
      });
      await setDevices([...response]);





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

  return (
    <div>
      <Navigation />
        {
          (error)?
          <Error message={errorMsg} />
          :
          <></>
        }
    <div className="device__list__container">
      {
        devices.map((device) => {
          return (
          <div className="device__container" key={device._id}>
            <div className="left__section">
              <div>
                <p className="device__name">{device.prefs.name}  <span id={device._id} onClick={handleEditStart}> <img id={device._id} className="editName" src="./assets/edit.png"></img> </span> </p>
                <p>{device._id}</p>
              </div>
            </div>
            <div className="middle__section">
              <div className="status">
                <div className="item">
                  <img src="./assets/battery.png"></img>
                  <p>{device.status.battery ? device.status.battery + "%" : "unavailabale"}</p>
                </div>
                <div className="item">
                  <img src="./assets/clock.png"></img>
                  <p>{device.status.speed ? device.status.speed + " km/h" : "unavailabale"}</p>
                </div>
                <div className="item">
                  <img src="./assets/wifi.png"></img>
                  <p>{device.status.signal ? device.status.signal + "%": "unavailabale"}</p>
                </div>
                <div className="item">
                  <img src="./assets/location.png"></img>
                <p>{device.status.location ? device.status.location : "unavailable"}</p>
                </div>
              </div>
            </div>
            <div className="right__section">
              <div className="sub__status">
                <p>{device.subscription.status ? device.subscription.status : "Overdue"}</p>
              </div>
              <button className="action__button">
                Renew
              </button>
            </div>

            <div className='close'>
              <p>
                X
              </p>
            </div>
          </div>
        )
        })

      }
      <div className="renew__button">
        <button className="action__button">
          Add Tracker
        </button>
      </div>
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


    </div>
  )
}

export default MyDevice
