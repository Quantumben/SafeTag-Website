import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./css/home.css";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
const Home = () => {
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
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  return (
    <div className=" w-full min-h-screen m flex items-center  flex-col overflow-x-hidden">
      {}
      <div className="container ">
        <div className=" w-full grid lg:hidden  grid-cols-1 gap-40 lg:grid-cols-2 heroBg ">
          <div className=" flex items-center mt-10 justify-center flex-col w-full h-full">
            <img
              src="/assets/logo2.png"
              className=" w-44  object-contain"
              alt="SafeTag Logo"
            />
            <h2 className=" text-pr text-lg pt-2">For your peace of mind.</h2>
            <p className=" text-sm text-center w-96 pt-5 px-4">
            Accurate, reliable gps trackers backed up by a powerful, multi-platform, international GPS tracking service.
            </p>
            <p className=" text-sm text-center w-96 pt-5 px-4">
            Built to help people & businesses keep the things they need safe and secure.
            </p>
            {loggedIn ? (
              <div className=" flex items-center justify-center w-full gap-2  py-10">
                <Link
                  to="/add-device"
                  className=" px-4 py-3 border rounded-md bg-pr cursor-pointer text-white text-sm"
                >
                  Add Tracker
                </Link>
                <Link
                  to="/my-devices"
                  className=" px-4 py-3 bg-white rounded-md  cursor-pointer  text-sm"
                >
                  My Tracker
                </Link>
              </div>
            ) : (
              <div className=" flex items-center justify-center gap-4  py-10">
                <Link
                  to="/Login"
                  className=" px-4 py-3 bg-white border rounded-md  cursor-pointer  text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className=" px-4 py-3 rounded-md bg-pr cursor-pointer text-white text-sm"
                >
                  Register
                </Link>
              </div>
            )}
            <div className=" px-5 flex items-center justify-center  gap-5  border-t-2 pt-2">
              <div>
                <h1 className=" font-semibold text-2xl">24/7</h1>
                <p className=" text-sm">Customer Support</p>
              </div>
              <div>
                <h1 className=" font-semibold text-2xl">
                  29 <span className=" text-pr">+</span>
                </h1>
                <p className=" text-sm">Countries</p>
              </div>
              <div>
                <h1 className=" font-semibold text-2xl">3 Months</h1>
                <p className=" text-sm">History storage</p>
              </div>
            </div>
          </div>
          <div className=" relative">
            <img
              src="/assets/bg-right.png"
              className=" w-full object-cover h-80"
              alt=""
            />
            <div className=" absolute -top-20 inset-0 flex items-center justify-center  h-full z-10 ">
              <img
                src="/assets/iphone.png"
                className=" w-full h-96 object-contain"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className=" w-full hidden lg:grid  grid-cols-1 lg:grid-cols-2">
          <div className=" flex items-center justify-center flex-col w-full h-full">
            <img
              src="/assets/logo2.png"
              className=" w-72  object-contain"
              alt=""
            />
            <h2 className=" text-pr text-lg pt-2">For your peace of mind.</h2>
            <p className=" text text-center w-2/3 pt-5">
            Accurate, reliable gps trackers backed up by a powerful, multi-platform, international GPS tracking service.
            </p>
            <p className=" text text-center w-2/3 pt-5">
            Built to help people & businesses keep the things they need safe and secure.
            </p>
            {loggedIn ? (
              <div className=" flex items-center justify-center gap-4  py-10">
                <Link
                  to="/my-devices"
                  className=" px-4 py-3 rounded-md bg-pr cursor-pointer text-white text-sm"
                >
                  View Trackers
                </Link>
                <Link
                  to="/add-device"
                  className=" px-4 py-3 border rounded-md  cursor-pointer  text-sm"
                >
                  Add Tracker
                </Link>
              </div>
            ) : (
              <div className=" flex items-center justify-center gap-4  py-10">
                <Link
                  to="/signup"
                  className=" px-4 py-3 rounded-md bg-pr cursor-pointer text-white text-sm"
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className=" px-4 py-3 border rounded-md  cursor-pointer  text-sm"
                >
                  Login
                </Link>
              </div>
            )}
            <div className=" px-5 flex items-center justify-center  gap-5 mt-8 border-t-2 pt-8">
              <div>
                <h1 className=" font-semibold text-4xl">24/7</h1>
                <p className=" text-sm">Customer Support</p>
              </div>
              <div>
                <h1 className=" font-semibold text-4xl">
                  29 <span className=" text-pr">+</span>
                </h1>
                <p className=" text-sm">Countries</p>
              </div>
              <div>
                <h1 className=" font-semibold text-4xl">3 Months</h1>
                <p className=" text-sm">History storage</p>
              </div>
            </div>
          </div>
          <div className=" relative ">
            <img
              src="/assets/bg-right.png"
              className=" w-full h-full object-cover "
              alt=""
            />
            <div className=" absolute top-0 -left-10 flex items-center justify-center  h-full z-10 ">
              <img
                src="/assets/iphone.png"
                className=" w-full h-4/6 object-contain"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Our products section mobile*/}
        <div className=" bg-pr w-full block lg:hidden py-8  ">
          <h1 className=" text-center text-white text-4xl pb-10 font-semibold">
            Our Products
          </h1>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 21000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="  flex flex-col items-center justify-center gap-2 pb-10">
                <div className=" flex items-center justify-center flex-col w-full ">
                  <div className=" w-96">
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 7000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Autoplay, Pagination]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <img
                          src="/assets/products/mag/top.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/mag/side.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/mag/dimensions.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="px-12">
                  <h1 className="  text-white text-2xl  font-semibold">SafeTag Mag</h1>
                  <h3 className=" text-white text-xl py-2">£29.99</h3>
                  <p className=" text-white text-sm pb-3 w-full lg:w-2/3">
                    A rechargeable, magnetic GPS tracker. Perfect for hiding inside or underneath your vehicle.
                  </p>
                  <ul className=" list-disc pb-10">
                    <li className=" text-white text-sm">30 Day battery life</li>
                    <li className=" text-white text-sm">GPS Accurate within 3 metres</li>
                  </ul>
                  <div className=" flex items-center gap-5">
                    <button className=" bg-white p-2 shadow-md rounded-md">
                      <img
                        src="/assets/amazon.png"
                        className=" h-9 object-contain"
                        alt=""
                      />
                    </button>
                    <button className=" bg-white p-2 shadow-md rounded-md">
                      <img
                        src="/assets/ebay.png"
                        className=" h-9 object-contain"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="  flex flex-col items-center justify-center gap-2 pb-10">
                <div className=" flex items-center justify-center flex-col w-full ">
                  <div className=" w-96">
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 7000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Autoplay, Pagination]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <img
                          src="/assets/products/plug/top.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/plug/bottom.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/plug/dimensions.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="px-12">
                  <h1 className="  text-white text-2xl  font-semibold">SafeTag Plug</h1>
                  <h3 className=" text-white text-xl py-2">£24.99</h3>
                  <p className=" text-white text-sm pb-3 w-full lg:w-2/3">
                    An ODB-2 Port GPS tracker. Perfect for tracking your vehicle and getting insights from it, without having to worry about the battery.
                  </p>
                  <ul className=" list-disc pb-10">
                    <li className=" text-white text-sm">ODB-2 Compatible</li>
                    <li className=" text-white text-sm">GPS Accurate within 3 metres</li>
                    <li className=" text-white text-sm">Get ignition, door & fuel information</li>
                    <li className=" text-white text-sm">Small inbuilt battery for information while your vehicle is off</li>
                  </ul>
                  <div className=" flex items-center gap-5">
                    <button className=" bg-white p-2 shadow-md rounded-md">
                      <img
                        src="/assets/amazon.png"
                        className=" h-9 object-contain"
                        alt=""
                      />
                    </button>
                    <button className=" bg-white p-2 shadow-md rounded-md">
                      <img
                        src="/assets/ebay.png"
                        className=" h-9 object-contain"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="  flex flex-col items-center justify-center gap-2 pb-10">
                <div className=" flex items-center justify-center flex-col w-full ">
                  <div className=" w-96">
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 7000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Autoplay, Pagination]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <img
                          src="/assets/products/charge/top.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/charge/side.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/charge/bottom.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/charge/dimensions.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="px-12">
                  <h1 className="  text-white text-2xl  font-semibold">SafeTag Charge</h1>
                  <h3 className=" text-white text-xl py-2">£24.99</h3>
                  <p className=" text-white text-sm pb-3 w-full lg:w-2/3">
                    A GPS tracker powered by your car battery. Keeps your car secure at all times, set it and forget it.
                  </p>
                  <ul className=" list-disc pb-10">
                    <li className=" text-white text-sm">Universal car compatible</li>
                    <li className=" text-white text-sm">Install kit included</li>
                    <li className=" text-white text-sm">GPS Accurate within 3 metres</li>
                    <li className=" text-white text-sm">No maintenance required</li>
                  </ul>
                  <div className=" flex items-center gap-5">
                    <button className=" bg-white p-2 shadow-md rounded-md">
                      <img
                        src="/assets/amazon.png"
                        className=" h-9 object-contain"
                        alt=""
                      />
                    </button>
                    <button className=" bg-white p-2 shadow-md rounded-md">
                      <img
                        src="/assets/ebay.png"
                        className=" h-9 object-contain"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* Our products section desktop*/}
        <div className=" bg-pr w-full hidden lg:block py-8  ">
          <h1 className=" text-center text-white text-4xl pb-10 font-semibold">
            Our Products
          </h1>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 21000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className=" grid grid-cols-1 lg:grid-cols-4 gap-10 pb-20">
                <div className=" "></div>
                <div className="">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 7000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                        <img
                          src="/assets/products/mag/top.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/mag/side.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/mag/dimensions.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                  </Swiper>
                </div>
                <div className=" lg:col-span-2">
                  <div>
                    <h1 className="  text-white text-2xl  font-semibold">SafeTag Mag</h1>
                    <h3 className=" text-white text-xl pb-2">£29.99</h3>
                    <p className=" text-white text-sm pb-3 w-full lg:w-2/3">
                      A rechargeable, magnetic GPS tracker. Perfect for hiding inside or underneath your vehicle.
                    </p>
                    <ul className=" list-disc pb-10">
                      <li className=" text-white text-sm">30 Day battery life</li>
                      <li className=" text-white text-sm">GPS Accurate within 3 metres</li>
                    </ul>
                    <div className=" flex items-center gap-5">
                      <button className=" bg-white p-2 shadow-md rounded-md">
                        <img
                          src="/assets/amazon.png"
                          className=" h-9 object-contain"
                          alt=""
                        />
                      </button>
                      <button className=" bg-white p-2 shadow-md rounded-md">
                        <img
                          src="/assets/ebay.png"
                          className=" h-9 object-contain"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=" grid grid-cols-1 lg:grid-cols-4 gap-10 pb-20">
                <div className=" "></div>
                <div className="">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 7000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                        <img
                          src="/assets/products/plug/top.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/plug/bottom.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/plug/dimensions.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                  </Swiper>
                </div>
                <div className=" lg:col-span-2">
                  <div>
                    <h1 className="  text-white text-2xl  font-semibold">SafeTag Plug</h1>
                    <h3 className=" text-white text-xl pb-2">£24.99</h3>
                    <p className=" text-white text-sm pb-3 w-full lg:w-2/3">
                      An ODB-2 Port GPS tracker. Perfect for tracking your vehicle and getting insights from it, without having to worry about the battery.
                    </p>
                    <ul className=" list-disc pb-10">
                      <li className=" text-white text-sm">ODB-2 Compatible</li>
                      <li className=" text-white text-sm">GPS Accurate within 3 metres</li>
                      <li className=" text-white text-sm">Get ignition, door & fuel information</li>
                      <li className=" text-white text-sm">Small inbuilt battery for information while your vehicle is off</li>
                    </ul>
                    <div className=" flex items-center gap-5">
                      <button className=" bg-white p-2 shadow-md rounded-md">
                        <img
                          src="/assets/amazon.png"
                          className=" h-9 object-contain"
                          alt=""
                        />
                      </button>
                      <button className=" bg-white p-2 shadow-md rounded-md">
                        <img
                          src="/assets/ebay.png"
                          className=" h-9 object-contain"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=" grid grid-cols-1 lg:grid-cols-4 gap-10 pb-20">
                <div className=" "></div>
                <div className="">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 7000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                        <img
                          src="/assets/products/charge/top.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/charge/side.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/charge/bottom.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src="/assets/products/charge/dimensions.png"
                          className=" h-72 object-contain"
                          alt=""
                        />
                      </SwiperSlide>
                  </Swiper>
                </div>
                <div className=" lg:col-span-2">
                  <div>
                    <h1 className="  text-white text-2xl  font-semibold">SafeTag Charge</h1>
                    <h3 className=" text-white text-xl pb-2">£24.99</h3>
                    <p className=" text-white text-sm pb-3 w-full lg:w-2/3">
                      A GPS tracker powered by your car battery. Keeps your car secure at all times, set it and forget it.
                    </p>
                    <ul className=" list-disc pb-10">
                      <li className=" text-white text-sm">Universal car compatible</li>
                      <li className=" text-white text-sm">Install kit included</li>
                      <li className=" text-white text-sm">GPS Accurate within 3 metres</li>
                      <li className=" text-white text-sm">No maintenance required</li>
                    </ul>
                    <div className=" flex items-center gap-5">
                      <button className=" bg-white p-2 shadow-md rounded-md">
                        <img
                          src="/assets/amazon.png"
                          className=" h-9 object-contain"
                          alt=""
                        />
                      </button>
                      <button className=" bg-white p-2 shadow-md rounded-md">
                        <img
                          src="/assets/ebay.png"
                          className=" h-9 object-contain"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* Selling points section desktop with sample map*/}
        <div className=" my-10 grid lg:hidden px-3 grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h1 className=" text-center text-black text-4xl pb-10 font-semibold">
              Why should you use our platform?
            </h1>
            <div className=" mt-10 grid grid-cols-2 gap-2 lg:gap-x-16">
              <div>
                <div className=" flex items-center gap-2">
                  <img
                    src="/assets/d1.png"
                    className="w-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">
                    Speed & Accuracy
                  </h3>
                </div>
                <p className=" text-xs text-gray-800">
                  Get location readouts with under 200ms delay every minute
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/d2.png"
                    className="w-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">
                    Track anywhere
                  </h3>
                </div>
                <p className=" text-xs text-gray-800">
                  Track across all of Europe - no setup required (excl. CHE)
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/d3.png"
                    className="w-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">24/7 Support</h3>
                </div>
                <p className=" text-xs text-gray-800">
                  At SafeTag we strive for the highest level of customer
                  satisfaction
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/d4.png"
                    className="w-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">Geofencing</h3>
                </div>
                <p className=" text-xs text-gray-800">
                  Set geofences to get alerts and quickly check device status
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/d5.png"
                    clafont-semibold
                    className="w-16 h-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">
                    Location History
                  </h3>
                </div>
                <p className=" text-xs text-gray-800">
                  You can view speed, course, status as well as location.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/d6.png"
                    className="w-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">Low Fees</h3>
                </div>
                <p className=" text-xs text-gray-800">
                  Our subscription is priced as competitely as possible
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/d7.png"
                    className="w-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">Customize</h3>
                </div>
                <p className=" text-xs text-gray-800">
                  Device Lists & Maps can be customized to make it faster &
                  easier to read the information you need
                </p>
              </div>
              <div>
                <div className=" flex items-center gap-2">
                  <img
                    src="/assets/d8.png"
                    className="w-10 h-16 object-contain"
                    alt=""
                  />
                  <h3 className=" font-semibold text-xl py-2">
                    Maps Integration
                  </h3>
                </div>
                <p className=" text-xs text-gray-800">
                  Export past & current tracker locations to Google Maps in 1
                  click
                </p>
              </div>
            </div>
          </div>
          <img
            src="/assets/map2.png"
            className=" w-full h-full object-cover hidden lg:block"
            alt=""
          />
        </div>
        {/* Selling points section mobile*/}
        <div className=" my-10 hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-10">
          <img
            src="/assets/map2.png"
            className=" w-full h-full object-cover"
            alt=""
          />
          <div>
            <h1 className=" text-center text-black text-4xl pb-10 font-semibold">
              Why should you use our platform?
            </h1>
            <div className=" mt-10 grid grid-cols-2 gap-5 lg:gap-x-16">
              <div>
                <img
                  src="/assets/d1.png"
                  className="w-16 object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">
                  Speed & Accuracy
                </h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  Get location readouts with under 200ms delay every minute
                </p>
              </div>
              <div>
                <img
                  src="/assets/d2.png"
                  className="w-16 object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">International</h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  Track across all of Europe - no setup required (excl. CHE)
                </p>
              </div>
              <div>
                <img
                  src="/assets/d3.png"
                  className="w-16 object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">24/7 Support</h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  At SafeTag we strive for the highest level of customer
                  satisfaction
                </p>
              </div>
              <div>
                <img
                  src="/assets/d4.png"
                  className="w-16 object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">Geofencing</h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  Set geofences to get alerts and quickly check device status
                </p>
              </div>
              <div>
                <img
                  src="/assets/d5.png"
                  clafont-semibold
                  className="w-16  object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">
                  Location History
                </h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  You can view speed, course, status as well as location.
                </p>
              </div>
              <div>
                <img
                  src="/assets/d6.png"
                  className="w-16 object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">Low Fees</h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  Our subscription is priced as competitely as possible
                </p>
              </div>
              <div>
                <img
                  src="/assets/d7.png"
                  className="w-16 object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">Customizable</h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  Device Lists & Maps can be customized to make it faster &
                  easier to read the information you need
                </p>
              </div>
              <div>
                <img
                  src="/assets/d8.png"
                  className="w-16 object-contain"
                  alt=""
                />
                <h3 className=" font-semibold text-xl py-2">
                  Maps Integration
                </h3>
                <p className=" text-sm" style={{ color: "#757575" }}>
                  Export past & current tracker locations to Google Maps in 1
                  click
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
