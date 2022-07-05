import React from 'react'
import Navigation from './Navigation'

const History = () => {
  return (
    <div>
      
        <div className=" w-full grid md:hidden  grid-cols-1 gap-40 lg:grid-cols-2  ">
      <div className=" flex items-start px-10 pt-20 flex-col w-full h-full">
       
          <h2 className="  text-xl font-semibold pt-2 text-center w-full">
          Sorry, tracker location history is not available on mobile web.
          </h2>
          <h2 className="  text-xl text-pr font-semibold text-center w-full pt-4">
          Please download the SafeTag App
          </h2>

    
          <div className=" flex items-center justify-center flex-col w-full gap-4  pt-5">
          <button className=" px-4 py-3 w-full justify-center text-base font-bold rounded-md bg-pr text-white gap-2 flex items-center  cursor-pointer  te">
                <img src="/assets/apple_logo.png" className=" h-5" alt="" />
                Download for iOS
              </button>
            <button className=" px-4 py-3 w-full justify-center text-base font-bold rounded-md bg-pr text-white gap-2 flex items-center  cursor-pointer  te">
                <img src="/assets/android_logo.png" className=" h-5" alt="" />
                Download for Android
              </button>
          </div>
        </div>
        <div className=" relative">
          <img
            src="/assets/bg-right.png"
            className=" w-full object-cover h-96"
            alt=""
          />
          <div className=" absolute -top-32 left-1/4 flex items-center justify-center  h-full z-10 ">
            <img
              src="/assets/iphone.png"
              className=" w-full h-5/6 object-contain relative z-30"
              alt=""
            />
            <img
               src="/assets/apple.png"
              className=" w-full h-5/6 object-contain transform rotate-6 top-10 relative -left-16"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default History