import React from 'react'
import Navigation from "./Navigation"


import "./css/support.css"

const Support = (props) => {

  const handleClick = (e)=>{
    e.target.classList.toggle('active')
  }
  return (
    <div>
      <Navigation />

      <div className="support__section__container">
        <div className="support__heading">
          <h1>
            Commanly Asked Question
          </h1>
        </div>

        <div className="support__content__container">
          <div className="support__content" onClick={handleClick}>
            <div className="heading">
              <h3>
                Getting Started
              </h3>
            </div>
            <div className="content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="support__content" onClick={handleClick}>
            <div className="heading">
              <h3>
                What if I have more than one Device?
              </h3>
            </div>
            <div className="content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="support__content" onClick={handleClick}>
            <div className="heading">
              <h3>
                How do i manage my Subscriptions?
              </h3>
            </div>
            <div className="content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="support__content" onClick={handleClick}>
            <div className="heading">
              <h3>
                What if my tracker doesn't show up on the map?
              </h3>
            </div>
            <div className="content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>

        <div className="support__footer">
          <h1>
          support@safetagtracking.com
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Support
