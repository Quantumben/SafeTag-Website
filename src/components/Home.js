import React from 'react'
import {Link} from 'react-router-dom'
import Navigation from "./Navigation"

import "./css/home.css"

const Home = () => {
  return (
    <div>
    <Navigation />
    <div className="heroSection">
      <div className="left__section">
      </div>
      <div className="right__section">
        <img src="/assets/name.png"></img>
        <p>For your peace of mind</p>
        <div className="buttons">
          <Link to="/signup" className="signup">Get Started</Link>
          <Link to="/login" className="login">Login</Link>
        </div>
      </div>
    </div>
    <div className="products">
      <div className="heading">
        <h1>Products</h1>
      </div>
      <div className="product">

      </div>
    </div>
    </div>
  )
}

export default Home
