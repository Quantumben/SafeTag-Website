import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./css/account.css";
import Footer2 from "./Footer2";
import Error from "./Error";
import refresLogin from "../utils/refreshLogin"


const Account = ({ setLoggedIn }) => {
  const history = useNavigate();
  const [userCountry, setCountry] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userName, setName] = useState("");
  const [contact, setContact] = useState(false);
  const [but_disabled, setButDis] = useState(true);
  const [myname, setMyname] = useState("");
  const [ischeck, setIscheck] = useState(false);
  
  const handleSubmit = async () => {
    try {
      let response = await axios.get("https://api.safetagtracking.com/create-portal-session/"+userEmail+"/account",
        {
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
          },
        }
      );
      if (response.status === 200) {
        response = response.data;
        window.location.href = response.url;
        return null;
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const username = localStorage.getItem("redtrack-username");
        setEmail(username);

        let response = await axios.get(
          "https://api.safetagtracking.com/users/" + username,
          {
            headers: {
              Authorization: localStorage.getItem("redtrack-id_token"),
            },
          }
        );

        if (response.status === 200) {
          response = response.data;
          setIscheck(response.contact);
          setContact(response.contact);
          setMyname(response.name);
          setName(response.name);
          setCountry((response.country).toUpperCase());
          setEmail(response.username);
          setButDis(false);
        } else {
          setLoggedIn(false);
          history("/login");
        }
      } catch (e) {
        console.log(e.response.data.message);
        if(e.response.data.message == 'jwt expired' || e.response.data.message == "jwt malformed"){
          let respo = await refresLogin();
          if(respo.message != 'okay'){
            setLoggedIn(false);
            history("/login");
            return;
          }
          localStorage.setItem("redtrack-id_token", respo.token);
          fetchDetails();
          return;
        }
      }
    };
    fetchDetails();
  }, [history, setLoggedIn]);

  const [errMsg, setErrMsg] = useState("");
  const updateDetails = async () => {
    if (ischeck !== contact) {
      try {
        const username = localStorage.getItem("redtrack-username");
        var config = {
          method: "patch",
          url: `https://api.safetagtracking.com/users/contact/${username}?contact=${contact}`,
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
            "Content-Type": "application/json",
          },
        };
        axios(config)
          .then(function (response) {
            if (errMsg === "") {
              setErrMsg("Update Successfully");
            }
            setTimeout(() => {
              setErrMsg("");
            }, 3000);
            // console.log(response.data);
          })
          .catch(function (e) {
            setErrMsg(e.response.data.message);

            console.log(e);
          });
      } catch (e) {
        console.log(e.response.data.message);
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          setLoggedIn(false);
          history("/login");
        }
        localStorage.setItem("redtrack-id_token", respo.token);
        updateDetails();
      }
    }
    if (myname !== userName) {
      try {
        const username = localStorage.getItem("redtrack-username");
        var config = {
          method: "patch",
          url: `https://api.safetagtracking.com/users/name/${username}?name=${userName}`,
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
            "Content-Type": "application/json",
          },
        };

        axios(config)
          .then(function (response) {
            if (errMsg === "") {
              setErrMsg("Update Successfully");
            }
            setTimeout(() => {
              setErrMsg("");
            }, 3000);
          })
          .catch(function (e) {
            setErrMsg(e.response.data.message);

            console.log(e);
          });
      } catch (e) {
        console.log(e.response.data.message);
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          setLoggedIn(false);
          history("/login");
        }
        localStorage.setItem("redtrack-id_token", respo.token);
        updateDetails();
      }
    }
  }
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [demail, setDemail] = useState("");
  const [dpass, setDpass] = useState("");
  const [dtype, setdtype] = useState("");
  const [phase, setPhase] = useState("");
  const deleteAccount =  async() => {
    if(dtype !== "delete my account"){
      setPhase("Please enter the phrase correctly.")
    }else{
      setPhase("")
      try {
        var data = JSON.stringify({
          username: demail,
          password: dpass
        });
    
        var config = {
          method: "delete",
          url: `https://api.safetagtracking.com/users`,
          headers: {
            Authorization: localStorage.getItem("redtrack-id_token"),
            "Content-Type": "application/json",
          },
          data: data
        };

        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              localStorage.removeItem("redtrack-ref_token");
              localStorage.removeItem("redtrack-id_token");
              localStorage.removeItem("redtrack-username");
              setLoggedIn(false)
              history("/login");
            }
          })
          .catch(function (e) {
            setErrMsg(e.response.data.message);
            window.scrollTo(0,0)
            console.log(e);
          });
      } catch (e) {
        console.log(e.response.data.message);
        let respo = await refresLogin();
        if(respo.message != 'okay'){
          setLoggedIn(false);
          history("/login");
        }
        localStorage.setItem("redtrack-id_token", respo.token);
        deleteAccount();
      }
    }
  };
  return (
    <div>
      <h1 className=" mt-10 text-5xl font-bold w-full text-center">
        My Account
      </h1>
     <div className=" pb-6">
     {errMsg !== "" && <Error message={errMsg} />}
     </div>
      <div className="account__container px-3 lg:px-0 mt-3">
        <div className="left__section w-full lg:w-1/3 ">
          <p className=" font-semibold "> Name</p>
          <div className="details2 bg-white">
            <input
              onChange={(e) => setName(e.target.value)}
              value={userName}
              className=" w-full h-full bg-transparent border-none outline-none"
              type="text"
              name=""
              id=""
            />
          </div>

          <p className=" font-semibold "> Email</p>
          <div className="details">
            <p>{userEmail}</p>
          </div>

          <p className=" font-semibold "> Country</p>
          <div className="details">
            <p>{userCountry}</p>
          </div>
          <p className=" font-semibold  flex items-center gap-2">
            {" "}
            Contact{" "}
            <input
              onChange={(e) => setContact(e.target.checked)}
              checked={contact}
              className=" w-5 h-5"
              type="checkbox"
              name=""
              id=""
            />
          </p>
          <div className=" w-full flex items-center justify-center">
            {ischeck !== contact || myname !== userName ? (
              <button
                onClick={updateDetails}
                className=" px-2  text-white font-semibold bg-pr py-2 rounded-xl"
              >
                Update Details
              </button>
            ) : (
              <button
                className=" px-2  text-white font-semibold bg-gray-500 py-2 rounded-xl"
                disabled={true}
              >
                Update Details
              </button>
            )}
          </div>
        </div>
        <div className="left__section w-full lg:w-1/3 ">
          <div className="payment_button flex items-center gap-3">
            <p className=" font-semibold">Billing</p>
            <button
              className=" px-8  text-white font-semibold bg-pr py-2 rounded-xl"
              disabled={but_disabled}
              onClick={handleSubmit}
            >
              Billing Settings
            </button>
          </div>
        </div>
        <div className="left__section w-full lg:w-1/3 ">
          <div className=" my-2 flex items-center gap-2">
            <h1 className=" font-bold">Account Deletion</h1>{" "}
            {deleteOpen ? (
              <button
                onClick={() => setDeleteOpen(false)}
                className=" border px-5 py-1 rounded-md bg-pr text-white text-sm "
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setDeleteOpen(true)}
                className=" border px-5 py-1 rounded-md bg-gray-100 text-sm text-pr"
              >
                Delete
              </button>
            )}
          </div>

          {deleteOpen && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                deleteAccount()
              }}
            >
              <p className=" text-center text-red-500 py-2 text-sm">{phase}</p>
              <div className="details2 bg-white">
                <input
                  onChange={(e) => setDemail(e.target.value)}
                  required
                  className=" w-full h-full bg-transparent border-none outline-none"
                  type="email"
                  placeholder="Email"
                  name=""
                  id=""
                  autoComplete="off"
                />
              </div>
              <div className="details2 bg-white">
                <input
                  onChange={(e) => setDpass(e.target.value)}
                  required
                  className=" w-full h-full bg-transparent border-none outline-none"
                  type="password"
                  placeholder="Password"
                  name=""
                  id=""
                  autoComplete="off"
                />
              </div>
              <h1 className=" w-full text-center font-bold">
                Please type “delete my account”:
              </h1>
              <div className="details2 bg-white">
                <input
                  onChange={(e) => setdtype(e.target.value)}
                  required
                  className=" w-full h-full bg-transparent border-none outline-none"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <p style={{ fontSize: "13px" }} className=" text-sm pt-2">
                Deleting your account will remove your login credentials and
                user data from our systems. This action will also unpair your
                trackers from your account, cancel associated subscriptions and
                delete associated data.
                <br />
                <b>This action is irreversable.</b>
              </p>
              <div className=" pt-2 flex items-center justify-center">
                <button
                  type="submit"
                  className=" border px-5 py-1 rounded-md bg-gray-100  text-pr"
                >
                  Delete
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="mt-28">
        <Footer2 />
      </div>
    </div>
  );
};

export default Account;
