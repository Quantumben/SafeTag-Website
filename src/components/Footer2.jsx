import React from 'react'
import { Link } from 'react-router-dom'
const Footer2 = () => {
  return (
    <div style={{borderTop:"1px solid #C9C9C9"}} className=" w-full py-2">
              <div className=" py-2 flex items-center justify-center">
          <img
            src="/assets/Shield.png"
            className=" w-12 object-contain"
            alt=""
          />
        </div>
        <div className=" py-2 flex items-center gap-14 justify-center w-full">
          <Link to="/support" className=" text-sm ">
            Support
          </Link>
          <Link to="/privacy" className=" text-sm ">
            Privacy
          </Link>
          <Link to="/tos" className=" text-sm ">
            Terms
          </Link>
        </div>
        <p className=' pb-2 text-sm text-center px-4'>SafeTag is a company registered in the United Kingdom (no. xxxxxxxxxx)</p>
    </div>
  )
}

export default Footer2