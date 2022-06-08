import React , {useState} from 'react'

import {Link , useNavigate} from 'react-router-dom'
import Navigation from "./Navigation"

import "./css/myDevice.css"

const MyDevice = (props) => {
  return (
    <div>
      <Navigation />

    <div className="device__list__container">
      <div className="device__container">
        <div className="left__section">
          <div>
            <p className="device__name">Device Name  <span> <img className="editName" src="./assets/edit.png"></img> </span> </p>
            <p>Device Id</p>
          </div>
        </div>
        <div className="middle__section">
          <div className="status">
            <div className="item">
              <img src="./assets/battery.png"></img>
              <p>Battery Information</p>
            </div>
            <div className="item">
              <img src="./assets/clock.png"></img>
              <p>Speed</p>
            </div>
            <div className="item">
              <img src="./assets/wifi.png"></img>
              <p>Signal Strength</p>
            </div>
            <div className="item">
              <img src="./assets/location.png"></img>
              <p>Location</p>
            </div>
          </div>
        </div>
        <div className="right__section">
          <div className="sub__status">
            <p>Overdue</p>
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
    </div>
    </div>
  )
}

export default MyDevice
