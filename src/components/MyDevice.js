import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import refresLogin from "../utils/refreshLogin";

import "./css/myDevice.css";
import Footer2 from "./Footer2";

const MyDevice = (props) => {
  const history = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [devices, setDevices] = useState([]);
  const [popUpD, setPopupD] = useState(false);
  const [popUpC, setPopupC] = useState(false);
  const [popUpB, setPopupB] = useState(false);
  const [popUpA, setPopupA] = useState(false);
  const [devEditId, setDevEditId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [devRemovalId, setRemovalId] = useState("");
  const [devCancelId, setCancelId] = useState("");
  const [noDev, setNoDev] = useState(true);
  const [cancelError, setCancelError] = useState(false);
  const [cancelErrorMsg, setCancelErrorMsg] = useState("");

  useEffect(() => {
    const helper = async () => {
      try {
        let username = localStorage.getItem("redtrack-username");

        let response = await axios.get(
          "https://api.safetagtracking.com/device/" + username,
          {
            headers: {
              Authorization: localStorage.getItem("redtrack-id_token"),
            },
          }
        );

        response = response.data;
        if (response === "No devices found") {
          return;
        }
        if (response.length > 0) {
          setNoDev(false);
          response.forEach((item, i) => {
            let bat = item.status.battery;
            let say;
            if (bat === 1) {
              say = "Extremely Low (0-15%)";
            } else if (bat === 2) {
              say = "Very Low (16-30%)";
            } else if (bat === 3) {
              say = "Low (31-45%)";
            } else if (bat === 4) {
              say = "Medium (46-60%)";
            } else if (bat === 5) {
              say = "High (61-75%)";
            } else if (bat === 6) {
              say = "Very High (76-100%)";
            }

            response[i].status.saying = say;
            if (item.subscription.status !== "active") setPopupD(true);
          });
        }

        setDevices([...response]);
      } catch (e) {
        console.log(e);
        console.log(e.response);
        if (
          e.response.data.message === "jwt expired" ||
          e.response.data.message === "jwt malformed"
        ) {
          let respo = await refresLogin();
          if (respo.message !== "okay") {
            history("/Login");
            return;
          }
          setError(false);
          localStorage.setItem("redtrack-id_token", respo.token);
          helper();
          return;
        }

        setError(true);
        if (e.response.data.message ==="Cannot read property 'owner_id' of undefined"
        ) {
          setErrorMsg("This device ID could not be found.");
        } else {
          setErrorMsg(e.response.data.message);
        }
      }
    };
    helper();
  }, [history]);

  const handleUpdateSub = async () => {
    try {
      let username = localStorage.getItem("redtrack-username");
      let response = await axios.get(
        "https://api.safetagtracking.com/create-portal-session/"+username+"/my-devices",
        {
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
          },
        }
      );

      response = response.data;
      window.location.href = response.url;
      return null;
    } catch (e) {
      console.log(e.response);
      if (
        e.response.data.message === "jwt expired" ||
        e.response.data.message === "jwt malformed"
      ) {
        let respo = await refresLogin();
        if (respo.message !== "okay") {
          history("/Login");
          return;
        }
        setError(false);
        localStorage.setItem("redtrack-id_token", respo.token);
        handleUpdateSub();
        return;
      }

      setError(true);
      if (
        e.response.data.message === "Cannot read property 'owner_id' of undefined") {
        setErrorMsg("This device ID could not be found.");
      } else {
        setErrorMsg(e.response.data.message);
      }
    }
  };

  const handleEditStart = (e) => {
    setDevEditId(e.target.id);
    setPopupC(true);
  };

  const handleUpdateName = async () => {
    try {
      let username = localStorage.getItem("redtrack-username");
      let payload = {
        name: deviceName,
        device_id: devEditId,
      };
      setPopupC(false);
      setDeviceName("");
      payload = JSON.stringify(payload);
      let response = await axios.patch(
        "https://api.safetagtracking.com/device/name/" + username,
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
            "Content-type": "application/json",
          },
        }
      );

      response = response.data;

      if (response.acknowledged === true) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e.response);
      if (
        e.response.data.message === "jwt expired" ||
        e.response.data.message === "jwt malformed"
      ) {
        let respo = await refresLogin();
        if (respo.message !== "okay") {
          history("/Login");
          return;
        }
        setError(false);
        localStorage.setItem("redtrack-id_token", respo.token);
        handleUpdateSub();
        return;
      }

      setError(true);
      if (
        e.response.data.message ===
        "Cannot read property 'owner_id' of undefined"
      ) {
        setErrorMsg("This device ID could not be found.");
      } else {
        setErrorMsg(e.response.data.message);
      }
    }
  };

  const handlePreRemoval = (e) => {
    setRemovalId(e.target.id);
    setPopupA(true);
  };

  const handleRemoval = async () => {
    try {
      let username = localStorage.getItem("redtrack-username");
      await axios.patch(
        "https://api.safetagtracking.com/device/remove/" +
          username +
          "?device_id=" +
          devRemovalId,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
          },
        }
      );
      window.location.reload();
      return null;
    } catch (e) {
      console.log(e.response);
      if (
        e.response.data.message === "jwt expired" ||
        e.response.data.message === "jwt malformed"
      ) {
        let respo = await refresLogin();
        if (respo.message !== "okay") {
          history("/Login");
          return;
        }
        setError(false);
        localStorage.setItem("redtrack-id_token", respo.token);
        handleRemoval();
        return;
      }

      setError(true);
      if (
        e.response.data.message === "Cannot read property 'owner_id' of undefined") {
        setErrorMsg("This device ID could not be found.");
      } else {
        setErrorMsg(e.response.data.message);
      }
    }
  };

  const handlePreCancel = (e) => {
    setCancelId(e.target.id);
    setPopupB(true);
  };

  const handleCancel = async () => {
    try {
      let username = localStorage.getItem("redtrack-username");
      await axios.delete(
        "https://api.safetagtracking.com/device/subscription/" +username +"?device_id=" +devCancelId,
        {
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
          },
        }
      );
      window.location.reload();
      return;
    } catch (e) {
      console.log(e.response);
      if (e.response.data.message === "jwt expired" ||e.response.data.message === "jwt malformed") {
        let respo = await refresLogin();
        if (respo.message !== "okay") {
          history("/Login");
          return;
        }
        setError(false);
        localStorage.setItem("redtrack-id_token", respo.token);
        handleCancel();
        return;
      }

      setCancelError(true);
      setCancelErrorMsg(e.response.data.message);
      return;
    }
  };

  const handleRenewSub = async (e) => {
    try {
      let device_id = e.target.id;
      let username = localStorage.getItem("redtrack-username");
      let response = await axios.get(
        "https://api.safetagtracking.com/device/subscription/"+username+"/"+device_id+"/m/my-devices",
        {
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
          },
        }
      );

      if (response.status === 200) {
        window.location.href = response.data.url;
        return;
      }
      return;
    } catch (e) {
      console.log(e.response);
      if (e.response.data.message === "jwt expired" || e.response.data.message === "jwt malformed") {
        let respo = await refresLogin();
        if (respo.message !== "okay") {
          history("/Login");
          return;
        }
        setError(false);
        localStorage.setItem("redtrack-id_token", respo.token);
        handleRenewSub();
        return;
      }

      setError(true);
      if (e.response.data.message === "Cannot read property 'owner_id' of undefined"
      ) {
        setErrorMsg("This device ID could not be found.");
      } else {
        setErrorMsg(e.response.data.message);
      }
    }
  };

  return (
    <div>
      {error ? <Error message={errorMsg} /> : <></>}

      <div className="device__list__container">
        <h1 className=" w-full text-center text-4xl font-bold pb-7">
          My Trackers
        </h1>

        {noDev ? (
        <>
          <p style={{ textAlign: "center" }}>
            It looks like you haven’t paired any trackers to your account yet.
            Please press the add tracker button below to get started.
          </p>
             <div className=" flex items-center justify-center w-full mt-4 ">
             <button onClick={()=>history("/add-device")} className="  px-10 bg-sr py-2 text-white rounded-md text-sm">
               Add a Tracker
             </button>
           </div>
        </>
        ) : (
          <>
            {devices.map((device) => {
              return (
                <div className="device__container" key={device._id}>
                  <div className="left__section ">
                    <div className=" flex items-center gap-2">
                      <img
                        className=" w-20 h-20 object-contain"
                        src="./assets/loc.png"
                        alt="Tracker Logo"
                      ></img>
                      <div className="hidden lg:block">
                        <p className="device__name clear-left text-xl font-semibold">
                          {device.prefs.name}{" "}
                          <span id={device._id} onClick={handleEditStart}>
                            {" "}
                            <img
                              id={device._id}
                              className="editName"
                              src="./assets/edit.png"
                              alt="edit logo"
                            ></img>{" "}
                          </span>{" "}
                        </p>
                        <p className=" text-gray-500">{device._id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="middle__section">
                    <div className=" block lg:hidden">
                      <p className="device__name  text-sm font-semibold">
                        {device.prefs.name}{" "}
                      </p>
                    </div>
                    <div className="item">
                      <img
                        className=" w-4 h-4 object-contain"
                        src="./assets/battery.png"
                        alt="battery logo"
                      ></img>
                      <p className="text-sm whitespace-nowrap">
                        {device.status.battery
                          ? device.status.saying
                          : "unavailable"}
                      </p>
                    </div>
                    <div className="item">
                      <img
                        className=" w-4 h-4 object-contain"
                        src="./assets/clock.png"
                        alt="speed logo"
                      ></img>
                      <p className=" text-sm">
                        {device.status.speed >= 0
                          ? device.status.speed + " km/h"
                          : "unavailable"}
                      </p>
                    </div>
                    <div className="item">
                      <img
                        className=" w-4 h-4 object-contain"
                        src="./assets/wifi.png"
                        alt="Signal Logo"
                      ></img>
                      <p className=" text-sm">
                        {device.status.signal
                          ? device.status.signal + "%"
                          : "unavailable"}
                      </p>
                    </div>
                    <div className="item ">
                      <img
                        className=" w-4 h-4 object-contain"
                        src="./assets/location.png"
                        alt="location logo"
                      ></img>
                      <p className=" text-sm">
                        {device.status.location ? (
                          <a
                            href={
                              "https://maps.google.com/?q=" +
                              device.status.location
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            {device.status.location}
                          </a>
                        ) : (
                          "unavailable"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="right__section flex items-center flex-col lg:flex-row justify-center ">
                    <div className="sub__status">
                      <p>{device.subscription.status ? device.subscription.status : "registered"}</p>
                    </div>
                    {
                      ( device.subscription.status==='active')?
                      <button id={device._id} className="action__button" onClick={handlePreCancel}>
                        Cancel
                      </button>
                      :
                      ( device.subscription.status==='past_due' || device.subscription.status==='incomplete' )?
                      <button className="action__button" onClick={handleUpdateSub}>
                        Manage
                      </button>
                      :
                      ( device.subscription.status==='' || device.subscription.status==='cancelled'|| device.subscription.status==='canceled' )?
                      <button className="action__button" onClick={handleRenewSub}>
                        Activate
                      </button>
                      :
                      <button className="action__button" id={device._id} onClick={handleRenewSub}>
                        Reactivate
                      </button>
                    }
                  </div>

                  <div className="close">
                    <p id={device._id} onClick={handlePreRemoval}>
                      X
                    </p>
                  </div>
                </div>
              );
            })}
            <div className=" flex items-center justify-center w-full mt-4 ">
              <button onClick={()=>history("/add-device")} className="  px-10 bg-sr py-2 text-white rounded-md text-sm">
                Add a Tracker
              </button>
            </div>
          </>
        )}
      </div>
      {popUpC ? (
        <div className="popUpD">
          <p>Enter Your Device Name</p>
          <input
            type="text"
            name="device-name"
            placeholder="Device Name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <div className="popUp__buttons">
            <button className="portal" onClick={handleUpdateName}>
              Save
            </button>

            <button
              onClick={() => {
                setPopupC(false);
                setDeviceName("");
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {popUpD ? (
        <div className="popUpD">
          <p>
            It looks like your subscription payments have failed. Please update
            your payment method to continue using your tracker.
          </p>
          <div className="popUp__buttons">
            <button className="portal" onClick={handleUpdateSub}>
              Take me to your portal
            </button>

            <button onClick={() => setPopupD(false)}>Dismiss</button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {popUpA ? (
        <div className="popUpD">
          <p>
            Would you like to remove this device? This will cancel the
            associated subscription and remove all related data from your
            account.
          </p>
          <div className="popUp__buttons">
            <button className="portal" onClick={handleRemoval}>
              Confirm
            </button>

            <button onClick={() => setPopupA(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {popUpB ? (
        <div className="popUpD">
          <p>
            Would you like to cancel your subscription plan? This will suspend
            your devices tracking capabilities and remove all associated data
            from your account.
          </p>
          <div className="popUp__buttons">
            <button className="portal" onClick={handleCancel}>
              Confirm
            </button>

            <button
              onClick={() => {
                setPopupB(false);
                setCancelError(false);
              }}
            >
              Cancel
            </button>
          </div>
          {cancelError ? (
            <p style={{ textAlign: "center", color: "red", marginTop: "16px" }}>
              {cancelErrorMsg}
            </p>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      {devices.length === 0 && (
        <div className=" mt-96 pt-20">
          <Footer2 />
        </div>
      )}
      {devices.length === 1 && (
        <div className=" mt-80 pt-10">
          <Footer2 />
        </div>
      )}
      {devices.length === 2 && (
        <div className=" mt-40 pt-10">
          <Footer2 />
        </div>
      )}
      {devices.length === 3 && (
        <div className=" mt-20 pt-5">
          <Footer2 />
        </div>
      )}
    </div>
  );
};

export default MyDevice;
