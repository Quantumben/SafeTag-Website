import React from 'react'
import PropTypes from 'prop-types'

import "./css/error.css"

const Error = (props) => {
  return (
    <div className="error__container">
      <p>
        {props.message}
      </p>
    </div>
  )
}

export default Error
