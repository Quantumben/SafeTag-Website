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
  const[devices , setDevices] = useState([])

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
      console.log(response);
      await setDevices([...response])

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
        helper()

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
  },[])
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
                <p className="device__name">{device.prefs.name}  <span> <img className="editName" src="./assets/edit.png"></img> </span> </p>
                <p>{device._id}</p>
              </div>
            </div>
            <div className="middle__section">
              <div className="status">
                <div className="item">
                  <img src="./assets/battery.png"></img>
                  <p>{device.status.battery ? device.status.battery : "unavailabale"}</p>
                </div>
                <div className="item">
                  <img src="./assets/clock.png"></img>
                  <p>{device.status.speed ? device.status.speed : "unavailabale"}</p>
                </div>
                <div className="item">
                  <img src="./assets/wifi.png"></img>
                  <p>{device.status.signal ? device.status.signal : "unavailabale"}</p>
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

    </div>
    </div>
  )
}

export default MyDevice
