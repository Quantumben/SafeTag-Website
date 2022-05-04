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
        <h1>REDTRACK</h1>
        <p>For your peace of Mind</p>
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
