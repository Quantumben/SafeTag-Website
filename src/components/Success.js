import React from 'react'
import Navigation from "./Navigation"

import {Link} from 'react-router-dom'


import "./css/success.css"

const Success = (props) => {
  return (
    <div>
      <Navigation />
      <div className="success__container">
        <div className = "left__section dummy">

        </div>
        <div className="right__container">
          <div className="content">
            <p>
                Thank you For signing Up
            </p>

            <p>
              Next, please download our app, and follow the instructions inside
            </p>
          </div>

          <div className ="qr__container">
            <div className="dummy">
            </div>
            <div className="dummy">
            </div>
          </div>

          <div className="download__links">
            <a href="https://www.google.com">
            <img src="https://e7.pngegg.com/pngimages/422/842/png-clipart-apple-store-logo-app-store-android-google-play-get-started-now-button-text-logo.png">
            </img>
            </a>

            <a href="https://wwww.google.com">

            <img src="https://miro.medium.com/max/1200/1*OIIv4FEjJQMqh-zEPhtlYA.png">
            </img>
            </a>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
