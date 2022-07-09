import React, { useState } from "react";
import Navigation from "./Navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./css/support.css";
import Footer2 from "./Footer2";

const Support = (props) => {
  const handleClick = (e) => {
    e.target.classList.toggle("active");
  };
  const [active, setActive] = useState(null);
  const data = [
    {
      title: "Getting Started",
      desc: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      title: "What if I have more than one Device?",
      desc: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      title: "How do i manage my Subscriptions?",
      desc: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      title: "What if my tracker doesn't show up on the map?",
      desc: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];
  return (
    <div>
      <h1 className=" mt-10 text-5xl font-bold w-full text-center">Support</h1>
      <p className=" text-sm text-gray-500 w-full text-center mt-4">
        Please see these frequently asked questions. If you don’t find a <br />{" "}
        solution to your issue, please email us at:
      </p>
      <h4 className=" text-xl text-pr font-bold w-full text-center py-2 mb-10">
        support @safetagtracking.com
      </h4>
      <div className="support__section__container mb-20">
        <div className="support__content__container">
          {data.map((item, ind) => (
            <div
              key={ind}
              className="support__content"
              onClick={
                active === ind ? () => setActive(null) : () => setActive(ind)
              }
            >
              <div className="heading w-full flex items-center  justify-between">
                <h3>{item?.title}</h3>
                {active !== ind ? (
                  <IoIosArrowDown className=" w-7 h-7" />
                ) : (
                  <IoIosArrowUp className=" w-7 h-7" />
                )}
              </div>
              {active === ind && (
                <div className="content">
                  <p className=" text-sm py-2">{item.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-24">
        <Footer2 />
      </div>
    </div>
  );
};

export default Support;
