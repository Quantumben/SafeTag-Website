import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

import Error from "./Error";

import refresLogin from "../utils/refreshLogin";

import axios from "axios";
import "./css/addDevice.css";
import Footer from "./Footer";
import Footer2 from "./Footer2";

const Plans = (props) => {
  const history = useNavigate();

  const [userEmail, setEmail] = useState("");
  const [stripeId, setStripeId] = useState(true);
  const [buttonStatus, setButtonStats] = useState("Add Payment Button");
  const [but_disabled, setButDis] = useState(true);
  const [hitRoute, setHitRoute] = useState("create-setup-session");
  const [butVal, showBut] = useState(false);
  const [Price_Month, setPriceMonth] = useState("Loading");
  const [Price_year, setPriceYear] = useState("Loading");
  const [tracker_id, setTrackerId] = useState("");
  const [tracker_name, setTrackerName] = useState("");
  const [subVal, setsub] = useState("y");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
const [acceptTerms, setAcceptTerms] = useState(false)
  useEffect(() => {
    if (stripeId != true && stripeId != null) {
      setButtonStats("Update Payment Method");
      setHitRoute("create-portal-session");
    }
  }, [stripeId]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const username = await localStorage.getItem("redtrack-username");
        if (!username) {
          history("/login");
          return;
        }
        if (username) {
          showBut(true);
        }
        if (username.length == 0) {
          history("/login");
        }

        // let response = await axios.get("https://api.safetagtracking.com/users/"+username , {
        //   headers : {
        //     "Authorization" : await localStorage.getItem('redtrack-id_token')
        //   }
        // })
        //
        // if(response.status === 200){
        //   response = response.data
        //   setEmail(response.username)
        //   setStripeId(response.stripe_id)
        //
        //
        //
        //   setButDis(false)
        // }
        //
        // else{
        //   history("/login")
        // }

        let response = await axios.get(
          "https://api.safetagtracking.com/data/prices"
        );
        if (response.status === 200) {
          response = response.data;

          setPriceMonth(response.m01);
          setPriceYear(response.y01);
        } else {
          alert("Unable to get prices, Contact Support");
        }
      } catch (e) {
        console.log(e.response);
        if (e.response.data.message == "jwt expired") {
          history("/login");
        }
      }
    };

    fetchDetails();
  }, []);

  const handleSubmit = async () => {
    console.log("Life Sucks!");
    try {
      // let response = await axios.get("https://tuex4qy1sl.execute-api.eu-west-2.amazonaws.com/prod/"+hitRoute+"/"+userEmail , {
      //   headers : {
      //     "Authorization" : await localStorage.getItem('redtrack-id_token')
      //   }
      //   })
      //
      //   if(response.status === 200){
      //     response = response.data
      //     window.location.href = response.url;
      //     return null;
      //   }

      let payload = {
        imei: tracker_id,
        name: tracker_name,
      };

      if (payload.imei.length > 20) {
        setError(true);
        setErrorMsg("Tracker ID should be 15 Characters Long");
        return;
      }

      if (payload.name.length <= 1) {
        setError(true);
        setErrorMsg("Enter A Valid Tracker Name");
        return;
      }

      setError(false);

      const username = await localStorage.getItem("redtrack-username");

      payload = JSON.stringify(payload);

      console.log(payload);

      var data = JSON.stringify({
        imei: tracker_id,
        name: tracker_name,
      });

      var config = {
        method: "patch",
        url: "https://api.safetagtracking.com/device/" + username,
        headers: {
          Authorization: await localStorage.getItem("redtrack-id_token"),
          "Content-Type": "application/json",
        },
        data: data,
      };

      let response = await axios(config);

      if (response.status === 200) {
        response = await axios.get(
          "https://api.safetagtracking.com/device/subscription/" +
            username +
            "/" +
            tracker_id +
            "/" +
            subVal,
          {
            headers: {
              Authorization: await localStorage.getItem("redtrack-id_token"),
            },
          }
        );

        if (response.status === 200) {
          response = response.data;
          window.location.href = response.url;
          return null;
        }
      }
    } catch (e) {
      console.log(e.response);

      if (
        e.response.data.message == "jwt expired" ||
        e.response.data.message == "jwt malformed"
      ) {
        let respo = await refresLogin();
        if (respo.message != "okay") {
          history("/Login");
          return;
        }

        await localStorage.setItem("redtrack-id_token", respo.token);
        handleSubmit();
      }

      setError(true);
      if (
        e.response.data.message ==
        "Cannot read property 'owner_id' of undefined"
      ) {
        setErrorMsg("This device ID could not be found.");
      } else {
        setErrorMsg(e.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className="plans__container">
        <div className="heading">
          <h2 className=" text-4xl font-semibold">Add Device</h2>
          <div className="flex items-center justify-center">
            <p className=" w-full lg:w-96 text-center text-sm py-2">
              Fill out the below form to add your new tracker to your account.
              You will be redirected to stripe to purchase a subscription and
              activate your tracker.
            </p>
          </div>
        </div>

        {error ? <Error message={errorMsg} /> : <></>}

        <div className="add_device_form_container">
          <div className="form__input">
            <p className=" text-left font-semibold">Tracker ID</p>

            <input
              type="text"
              value={tracker_id}
              name="tracker_id"
              onChange={(e) => setTrackerId(e.target.value)}
            ></input>
          </div>

          <div className="form__input">
            <p className=" text-left font-semibold">Tracker Name</p>

            <input
              type="text"
              value={tracker_name}
              name="tracker_name"
              placeholder=""
              onChange={(e) => setTrackerName(e.target.value)}
            ></input>
          </div>
          <div className=" py-4 w-full grid grid-cols-2 gap-5 mt-2">
            <div
              className=" rounded-xl py-3 flex items-center justify-center flex-col "
              style={{ border: "1px solid #AB4843" }}
            >
              <h3 className=" text-sr text-4xl font-bold py-1">£4.99</h3>
              <p className=" text-xs">Track 1 SafeTag Device</p>
              <p className=" text-xs font-bold">1 Month</p>
              <p style={{ fontSize: "10px" }} className=" text-gray-400">
                Automatically charged Monthly
              </p>
            </div>
            <div
              className=" rounded-xl py-3 flex items-center pt-6 relative justify-center flex-col "
              style={{ border: "1px solid #AB4843" }}
            >
              <div className=" w-full absolute -top-4 left-0 z-10 flex items-center justify-center">
                <div className="  bg-sr rounded-xl w-4/5 text-white py-1 text-xs lg:text-sm">
                  Best Value (10% off)
                </div>
              </div>

              <h3 className=" text-sr text-4xl font-bold py-1">£52.99</h3>

              <p className=" text-xs pt-1">Track 1 SafeTag Device</p>
              <p className=" text-xs font-bold">1 Year</p>
              <p style={{ fontSize: "10px" }} className=" text-gray-400">
                Automatically charged Annually
              </p>
            </div>
          </div>
          <div className="form__input__sub grid grid-cols-2 gap-5 w-full ">
            <div
              id="monthly_sub"
              className=""
              onClick={(e) => {
                setsub("m");
                e.target.classList.add("active");
                document
                  .getElementById("yearly_sub")
                  .classList.remove("active");
              }}
            >
              Monthly
            </div>

            <div
              id="yearly_sub"
              className="active"
              onClick={(e) => {
                setsub("y");
                e.target.classList.add("active");
                document
                  .getElementById("monthly_sub")
                  .classList.remove("active");
              }}
            >
              Yearly
            </div>
          </div>
          <div className=" py-2 w-full flex items-center justify-center gap-2">
            <Link to="/tos">I accept the Terms of service</Link>
            <input onChange={(e)=>setAcceptTerms(e.target.checked)} className=" w-5 h-5" type="checkbox" name="" id="" />
          </div>
          <div className=" w-full flex items-center flex-col gap-3 justify-center">
         {acceptTerms ?   <button
              className="bg-sr py-4 w-full lg:w-3/5 rounded-xl text-white outline-none border-none"
              onClick={handleSubmit}
            >
              Purchase Subscription
            </button> 
            :
            <button
            disabled
            className="bg-sr cursor-not-allowed py-4 w-full lg:w-3/5 rounded-xl text-white outline-none border-none"
         
             
            >
              Purchase Subscription
            </button> 
            }

            <Link to="/my-devices" className=" w-full">
              <button
                style={{ border: "1px solid #979797" }}
                className=" py-3 lg:w-3/5  px-5 rounded-xl text-gray-400 outline-none border-none"
                onClick={handleSubmit}
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Plans;
