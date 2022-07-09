import React from "react";
import { useNavigate } from "react-router-dom";

import Footer2 from "./Footer2";

const FourZeroFour = () => {
    const navigate = useNavigate()
  return (
    <>
      <div
        style={{ height: "75vh" }}
        className="  relative w-full flex items-center justify-center"
      >
        <img
          src="/assets/fourzfour.png"
          className=" absolute top-0 left-0 z-10 w-full object-cover"
          style={{ height: "75vh" }}
          alt=""
        />
        <div
          style={{ background: "rgba(255, 255, 255, 0.75)" }}
          className=" relative z-20 w-72  lg:w-72 p-5"
        >
          <h1 className=" font-bold w-full text-center pb-2"> 404 Error. </h1>

          <p className=" text-sm font-semibold text-center">
            Sorry about that, we can't locate the page you're looking for.
            Please head back to the home page or use the Navigation Bar at the
            top of the page to find your destination.
          </p>
         <div className=" flex items-center justify-center w-full mt-2">
         <button onClick={()=>navigate("/")} className=" px-8 bg-sr py-1  text-sm text-white rounded-md">
Home
          </button>
         </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
};

export default FourZeroFour;
