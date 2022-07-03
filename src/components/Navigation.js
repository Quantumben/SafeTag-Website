import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./css/navigation.css";

const Navigation = (props) => {
  const [state, setState] = useState(false);

  const history = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const username = await localStorage.getItem("redtrack-username");

      if (username) {
        setLoggedIn(true);
      }
    };

    fetchDetails();
  }, []);

  const handleLogout = async () => {
    await localStorage.removeItem("redtrack-ref_token");
    await localStorage.removeItem("redtrack-id_token");
    await localStorage.removeItem("redtrack-username");

    history("/login");
  };

  const [hactive, setHactive] = useState(false);
  const [mactive, setMactive] = useState(false);
  const [authhActive, setAuthhActive] = useState(false);
  const [authhActive2, setAuthhActive2] = useState(false);
  // const showheader = useRef()
  useEffect(() => {
    // let header = React.findDOMNode(showheader);
    // console.log("header", header);
    // let myEvent = document.getElementById("header_box");
    // myEvent.addEventListener("mouseover", () => {
    //   header.style.display = "block";
    // });
    // document.getElementById("showheader").onmouseover = function callheader() {
    //   header.style.display = "flex";
    // };
    // document.getElementById("showheader").onmouseout = function callheader() {
    //   header.style.display = "none";
    // };
    // document.getElementById("header_box").onmouseout = function callheader() {
    //   header.style.display = "none";
    // };
  }, []);

  return (
    <div className=" bg-white w-full flex items-center justify-center shadow-md">
      {/* <ScriptTag isHydrating={true} type="text/javascript" src="../script/dropdown.js"/> */}
      <div className="container">
        <div className="  flex items-center justify-between py-4  px-5 bg-white">
          <div className="flex items-center justify-center gap-3 lg:justify-start w-full">
            <Link to="/" className="flex items-center gap-3">
              <img
                className=" object-contain h-10"
                src="/assets/shield.png"
              ></img>
              <img className=" object-contain h-8" src="/assets/name.png"></img>
            </Link>
            <div className=" block relative lg:hidden">
              {mactive ? (
                <IoIosArrowDown
                  onClick={() => setMactive(false)}
                  className=" w-8 text-gray-500 h-8  cursor-pointer"
                />
              ) : (
                <IoIosArrowUp
                  onClick={() => setMactive(true)}
                  className=" w-8 text-gray-500 h-8  cursor-pointer"
                />
              )}
              {mactive && (
                <>
                  {loggedIn === false ? (
                    <div className=" absolute w-28 top-9 -left-10 z-30  bg-white border rounded-md p-2 flex flex-col gap-2">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-pr" : "text-black hover:text-pr"
                        }
                        to="/Support"
                      >
                        Support
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-pr" : "text-black hover:text-pr"
                        }
                        to="/Login"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-white  bg-pr px-3 py-2 rounded-md"
                            : "text-white  bg-pr px-3 py-2 rounded-md"
                        }
                        to="/signup"
                      >
                        Register
                      </NavLink>
                    </div>
                  ) : (
                    <div className=" absolute w-32 top-9 -left-12 z-30  bg-white border rounded-md p-2 flex flex-col gap-2">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-pr" : "text-black hover:text-pr"
                        }
                        to="/my-devices"
                      >
                        My Trackers
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-pr" : "text-black hover:text-pr"
                        }
                        to="/add-device"
                      >
                        Add Trackers
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-pr" : "text-black hover:text-pr"
                        }
                        to="/Support"
                      >
                        Support
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-pr" : "text-black hover:text-pr"
                        }
                        to="/account"
                      >
                        Account
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className=" border py-1 rounded-3xl flex items-center justify-center w-full "
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="  items-center gap-4 hidden lg:flex">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-pr" : "text-black hover:text-pr"
              }
              to="/"
            >
              Home
            </NavLink>
            {loggedIn === false && (
              <div
                onMouseOver={() => setHactive(true)}
                onMouseOut={() => setHactive(false)}
                className=" cursor-pointer flex items-center py-2 gap-1 relative "
              >
                <a
                  target="_blank"
                  href="https://shop.safetagtracking.com"
                  className="text-black hover:text-pr "
                >
                  Shop
                </a>{" "}
                {hactive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                <div
                  onMouseOver={() => setHactive(true)}
                  onMouseOut={() => setHactive(false)}
                  style={hactive ? { display: "flex" } : { display: "none" }}
                  className=" absolute top-9 z-20 bg-white rounded-md flex items-start border flex-col w-28 p-3 left-0"
                >
                  <a
                    target="_blank"
                    className="text-black hover:text-pr"
                    href="https://amazon.co.uk"
                  >
                    Amazon
                  </a>
                  <a
                    target="_blank"
                    className="text-black hover:text-pr"
                    href="https://ebay.co.uk"
                  >
                    Ebay
                  </a>
                </div>
              </div>
            )}
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-pr" : "text-black hover:text-pr"
              }
              to="/Support"
            >
              Support
            </NavLink>

            {loggedIn === true && (
              <div className=" relative">
                <div
                  onMouseOver={() => setAuthhActive(true)}
                  onMouseOut={() => setAuthhActive(false)}
                  id="header_box"
                  className=" cursor-pointer flex items-center gap-1 py-2"
                >
                  <Link
                    to="/my-devices"
                    className="text-black hover:text-pr w-24"
                  >
                    My Trackers
                  </Link>
                  {authhActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </div>

                <div
                  onMouseOver={() => setAuthhActive(true)}
                  onMouseOut={() => setAuthhActive(false)}
                  style={
                    authhActive ? { display: "flex" } : { display: "none" }
                  }
                  className=" absolute top-8 hidden z-20 bg-white rounded-md  items-start border flex-col w-32 p-3 left-0"
                >
                  <Link to="/add-device" className="text-black hover:text-pr">
                    Add Tracker
                  </Link>
                </div>
              </div>
            )}
            {loggedIn ? (
              <>
                <div className=" relative">
                  <div
                    onMouseOver={() => setAuthhActive2(true)}
                    onMouseOut={() => setAuthhActive2(false)}
                    id="header_box"
                    className=" cursor-pointer flex items-center gap-1 py-2"
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-pr" : "text-black hover:text-pr"
                      }
                      to="/account"
                    >
                      Account
                    </NavLink>
                    {authhActive2 ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>

                  <div
                    onMouseOver={() => setAuthhActive2(true)}
                    onMouseOut={() => setAuthhActive2(false)}
                    style={
                      authhActive2 ? { display: "flex" } : { display: "none" }
                    }
                    className=" absolute top-8 hidden z-20 bg-white rounded-md  items-start border flex-col w-20 p-3 left-0"
                  >
                    <p
                      onClick={handleLogout}
                      className="text-black cursor-pointer hover:text-pr"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className=" flex items-center gap-3">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-pr" : "text-black hover:text-pr"
                  }
                  to="/Login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-white  bg-pr px-3 py-2 rounded-md"
                      : "text-white  bg-pr px-3 py-2 rounded-md"
                  }
                  to="/signup"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
