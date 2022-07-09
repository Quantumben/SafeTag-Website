import React from "react";
import Navigation from "./Navigation";

import { Link } from "react-router-dom";

import "./css/success.css";
import Footer2 from "./Footer2";

const Success = (props) => {
  return (
    <div>
     
      <div className=" w-full grid lg:hidden  grid-cols-1 gap-40 lg:grid-cols-2  ">
      <div className=" flex items-start px-10 pt-20 flex-col w-full h-full">
       
          <h2 className="  text-2xl font-semibold pt-2 text-center w-full">
            Thank you for your payment.
          </h2>
          <h2 className="  text-xl text-pr font-semibold text-center w-full ">
            Your tracker is  now live.
          </h2>

          <p className=" pt-2 text-gray-500 text-lg text-center">
            Next, please download our app <br /> and follow the instructions to
            get started.
          </p>
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
      <div className=" w-full hidden lg:grid  grid-cols-1 lg:grid-cols-2">
        <div className=" flex items-start p-10 pt-20 flex-col w-full h-full">
          <img className=" object-contain h-8" src="/assets/name.png" />
          <h2 className="  text-5xl font-semibold py-6">
            Thank you for <br /> your payment.
          </h2>
          <h2 className="  text-5xl text-pr font-semibold ">
            Your tracker is <br /> now live.
          </h2>

          <p className=" pt-2 text-gray-500 text-lg">
            Next, please download our app <br /> and follow the instructions to
            get started.
          </p>
          <div className=" flex items-center justify-center gap-4  pt-5">
            <div className=" flex flex-col items-center gap-3">
              <button className=" px-4 py-3 rounded-md bg-pr text-white gap-2 flex items-center  cursor-pointer  text-sm">
                <img src="/assets/apple_logo.png" className=" h-5" alt="" />
                Download for iOS
              </button>
              <img src="/assets/ios_scan.png" className=" w-36" alt="" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <button className=" px-4 py-3 rounded-md bg-pr text-white gap-2 flex items-center  cursor-pointer  text-sm">
                <img src="/assets/android_logo.png" className=" h-5" alt="" />
                Download for Android
              </button>
              <img src="/assets/android_scan.png" className=" w-36" alt="" />
            </div>
          </div>
        </div>
        <div className=" relative">
          <img
            src="/assets/bg-right.png"
            className=" w-full h-full object-cover"
            alt=""
          />
          <div className=" absolute top-0 -left-10 flex items-center justify-center  h-full z-20 ">
            <img
              src="/assets/iphone.png"
              className=" w-full h-4/6 object-contain"
              alt=""
            />
          </div>
          <div className=" absolute top-20 left-20 flex items-center justify-center transform  rotate-6  h-full z-10 ">
            <img
              src="/assets/apple.png"
              className=" w-full h-4/6 object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Success;
