import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" bg-black w-full flex items-center justify-center mt-20">
      <div className="container hidden lg:block  overflow-y-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 px-3 w-full">
          <div className=" pl-8">
            <h1 className=" text-4xl font-semibold text-white">
              Get started today!
            </h1>
            <div className=" py-8">
              <p className=" text-white">1. Purchase your tracker</p>
              <p className=" text-white">2. Register Online</p>
              <p className=" text-white">
                3. Add your tracker to your account and purchase a SafeTag
                subscription
              </p>
              <p className=" text-white">4. Download the app and Login</p>
            </div>
            <div className=" flex items-center gap-5">
              <img
                src="/assets/android.png"
                className=" h-12 cursor-pointer object-contain"
                alt=""
              />
              <img
                src="/assets/ios.png"
                className=" h-12 cursor-pointer object-contain"
                alt=""
              />
            </div>
          </div>
          <div className=" relative">
            <img
              src="/assets/iphone.png"
              className=" w-72 object-contain -mt-32 transform -rotate-12"
              alt=""
            />
            <img
              src="/assets/apple.png"
              className=" w-96 object-contain absolute -top-36 z-10 left-32  transform rotate-12"
              alt=""
            />
          </div>
        </div>
        <div className=" py-2 flex items-center justify-center">
          <img
            src="/assets/shield_white.png"
            className=" w-20 object-contain"
            alt=""
          />
        </div>
        <div className=" py-2 flex items-center gap-14 justify-center w-full">
          <Link to="/support" className=" text-sm text-white">
            Support
          </Link>
          <Link to="/privacy" className=" text-sm text-white">
            Privacy
          </Link>
          <Link to="/tos" className=" text-sm text-white">
            Terms
          </Link>
        </div>
        <p className=" text-sm py-2 text-center w-full text-white">SafeTag is a company registered in the United Kingdom (no. xxxxxxxxxx)</p>
      </div>
      <div className="container block lg:hidden overflow-y-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 px-3 w-full">
        <div className=" flex items-center justify-center w-full">
        <div className=" relative flex items-center">
            <img
              src="/assets/iphone.png"
              className=" w-40 object-contain h-80 ml-5 -mt-32 transform -rotate-12"
              alt=""
            />
            <img
              src="/assets/apple.png"
              className=" w-52 object-cover h-80 -ml-10 -mt-32 transform rotate-12"
              alt=""
            />
          </div>
        </div>
          <div className=" pl-8">
            <h1 className=" text-4xl font-semibold text-white">
              Get started today!
            </h1>
            <div className=" py-8">
              <p className=" text-white">1. Purchase your tracker</p>
              <p className=" text-white">2. Register Online</p>
              <p className=" text-white">
                3. Add your tracker to your account and purchase a SafeTag
                subscription
              </p>
              <p className=" text-white">4. Download the app and Login</p>
            </div>
          
          </div>
          <div className=" flex items-center gap-5 flex-wrap justify-center">
              <img
                src="/assets/android.png"
                className=" h-12  cursor-pointer object-contain"
                alt=""
              />
              <img
                src="/assets/ios.png"
                className=" h-12  cursor-pointer object-contain"
                alt=""
              />
            </div>
        </div>
        <div className=" py-2 flex items-center justify-center">
          <img
            src="/assets/shield_white.png"
            className=" w-20 object-contain"
            alt=""
          />
        </div>
        <div className=" py-2 flex items-center gap-14 justify-center w-full">
          <Link to="/support" className=" text-sm text-white">
            Support
          </Link>
          <Link to="/privacy" className=" text-sm text-white">
            Privacy
          </Link>
          <Link to="/tos" className=" text-sm text-white">
            Terms
          </Link>
        </div>
        <p className=" text-sm py-2 text-center w-full text-white">DownRiver is a company registered in the United Kingdom (no. 14028429)</p>
      </div>
    </div>
  );
};

export default Footer;
