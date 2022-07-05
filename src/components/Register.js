import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Error from "./Error";
import axios from "axios";
import "./css/registraion.css";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Footer2 from "./Footer2";
const Register = (props) => {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [country, setCountry] = useState("GB");
  const [confirmPass, setConfirmPass] = useState("");

  const countryList = {
    Afghanistan: "AF",
    "Aland Islands": "AX",
    Albania: "AL",
    Algeria: "DZ",
    "American Samoa": "AS",
    Andorra: "AD",
    Angola: "AO",
    Anguilla: "AI",
    Antarctica: "AQ",
    "Antigua and Barbuda": "AG",
    Argentina: "AR",
    Armenia: "AM",
    Aruba: "AW",
    Australia: "AU",
    Austria: "AT",
    Azerbaijan: "AZ",
    Bahamas: "BS",
    Bahrain: "BH",
    Bangladesh: "BD",
    Barbados: "BB",
    Belarus: "BY",
    Belgium: "BE",
    Belize: "BZ",
    Benin: "BJ",
    Bermuda: "BM",
    Bhutan: "BT",
    Bolivia: "BO",
    "Bonaire, Saint Eustatius and Saba": "BQ",
    "Bosnia and Herzegovina": "BA",
    Botswana: "BW",
    "Bouvet Island": "BV",
    Brazil: "BR",
    "British Indian Ocean Territory": "IO",
    "British Virgin Islands": "VG",
    Brunei: "BN",
    Bulgaria: "BG",
    "Burkina Faso": "BF",
    Burundi: "BI",
    Cambodia: "KH",
    Cameroon: "CM",
    Canada: "CA",
    "Cape Verde": "CV",
    "Cayman Islands": "KY",
    "Central African Republic": "CF",
    Chad: "TD",
    Chile: "CL",
    China: "CN",
    "Christmas Island": "CX",
    "Cocos Islands": "CC",
    Colombia: "CO",
    Comoros: "KM",
    "Cook Islands": "CK",
    "Costa Rica": "CR",
    Croatia: "HR",
    Cuba: "CU",
    Curacao: "CW",
    Cyprus: "CY",
    "Czech Republic": "CZ",
    "Democratic Republic of the Congo": "CD",
    Denmark: "DK",
    Djibouti: "DJ",
    Dominica: "DM",
    "Dominican Republic": "DO",
    "East Timor": "TL",
    Ecuador: "EC",
    Egypt: "EG",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    Eritrea: "ER",
    Estonia: "EE",
    Ethiopia: "ET",
    "Falkland Islands": "FK",
    "Faroe Islands": "FO",
    Fiji: "FJ",
    Finland: "FI",
    France: "FR",
    "French Guiana": "GF",
    "French Polynesia": "PF",
    "French Southern Territories": "TF",
    Gabon: "GA",
    Gambia: "GM",
    Georgia: "GE",
    Germany: "DE",
    Ghana: "GH",
    Gibraltar: "GI",
    Greece: "GR",
    Greenland: "GL",
    Grenada: "GD",
    Guadeloupe: "GP",
    Guam: "GU",
    Guatemala: "GT",
    Guernsey: "GG",
    Guinea: "GN",
    "Guinea-Bissau": "GW",
    Guyana: "GY",
    Haiti: "HT",
    "Heard Island and McDonald Islands": "HM",
    Honduras: "HN",
    "Hong Kong": "HK",
    Hungary: "HU",
    Iceland: "IS",
    India: "IN",
    Indonesia: "ID",
    Iran: "IR",
    Iraq: "IQ",
    Ireland: "IE",
    "Isle of Man": "IM",
    Israel: "IL",
    Italy: "IT",
    "Ivory Coast": "CI",
    Jamaica: "JM",
    Japan: "JP",
    Jersey: "JE",
    Jordan: "JO",
    Kazakhstan: "KZ",
    Kenya: "KE",
    Kiribati: "KI",
    Kosovo: "XK",
    Kuwait: "KW",
    Kyrgyzstan: "KG",
    Laos: "LA",
    Latvia: "LV",
    Lebanon: "LB",
    Lesotho: "LS",
    Liberia: "LR",
    Libya: "LY",
    Liechtenstein: "LI",
    Lithuania: "LT",
    Luxembourg: "LU",
    Macao: "MO",
    Macedonia: "MK",
    Madagascar: "MG",
    Malawi: "MW",
    Malaysia: "MY",
    Maldives: "MV",
    Mali: "ML",
    Malta: "MT",
    "Marshall Islands": "MH",
    Martinique: "MQ",
    Mauritania: "MR",
    Mauritius: "MU",
    Mayotte: "YT",
    Mexico: "MX",
    Micronesia: "FM",
    Moldova: "MD",
    Monaco: "MC",
    Mongolia: "MN",
    Montenegro: "ME",
    Montserrat: "MS",
    Morocco: "MA",
    Mozambique: "MZ",
    Myanmar: "MM",
    Namibia: "NA",
    Nauru: "NR",
    Nepal: "NP",
    Netherlands: "NL",
    "New Caledonia": "NC",
    "New Zealand": "NZ",
    Nicaragua: "NI",
    Niger: "NE",
    Nigeria: "NG",
    Niue: "NU",
    "Norfolk Island": "NF",
    "North Korea": "KP",
    "Northern Mariana Islands": "MP",
    Norway: "NO",
    Oman: "OM",
    Pakistan: "PK",
    Palau: "PW",
    "Palestinian Territory": "PS",
    Panama: "PA",
    "Papua New Guinea": "PG",
    Paraguay: "PY",
    Peru: "PE",
    Philippines: "PH",
    Pitcairn: "PN",
    Poland: "PL",
    Portugal: "PT",
    "Puerto Rico": "PR",
    Qatar: "QA",
    "Republic of the Congo": "CG",
    Reunion: "RE",
    Romania: "RO",
    Russia: "RU",
    Rwanda: "RW",
    "Saint Barthelemy": "BL",
    "Saint Helena": "SH",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Martin": "MF",
    "Saint Pierre and Miquelon": "PM",
    "Saint Vincent and the Grenadines": "VC",
    Samoa: "WS",
    "San Marino": "SM",
    "Sao Tome and Principe": "ST",
    "Saudi Arabia": "SA",
    Senegal: "SN",
    Serbia: "RS",
    Seychelles: "SC",
    "Sierra Leone": "SL",
    Singapore: "SG",
    "Sint Maarten": "SX",
    Slovakia: "SK",
    Slovenia: "SI",
    "Solomon Islands": "SB",
    Somalia: "SO",
    "South Africa": "ZA",
    "South Georgia and the South Sandwich Islands": "GS",
    "South Korea": "KR",
    "South Sudan": "SS",
    Spain: "ES",
    "Sri Lanka": "LK",
    Sudan: "SD",
    Suriname: "SR",
    "Svalbard and Jan Mayen": "SJ",
    Swaziland: "SZ",
    Sweden: "SE",
    Switzerland: "CH",
    Syria: "SY",
    Taiwan: "TW",
    Tajikistan: "TJ",
    Tanzania: "TZ",
    Thailand: "TH",
    Togo: "TG",
    Tokelau: "TK",
    Tonga: "TO",
    "Trinidad and Tobago": "TT",
    Tunisia: "TN",
    Turkey: "TR",
    Turkmenistan: "TM",
    "Turks and Caicos Islands": "TC",
    Tuvalu: "TV",
    "U.S. Virgin Islands": "VI",
    Uganda: "UG",
    Ukraine: "UA",
    "United Arab Emirates": "AE",
    "United Kingdom": "GB",
    "United States": "US",
    "United States Minor Outlying Islands": "UM",
    Uruguay: "UY",
    Uzbekistan: "UZ",
    Vanuatu: "VU",
    Vatican: "VA",
    Venezuela: "VE",
    Vietnam: "VN",
    "Wallis and Futuna": "WF",
    "Western Sahara": "EH",
    Yemen: "YE",
    Zambia: "ZM",
    Zimbabwe: "ZW",
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPass(e.target.value);
  };

  const updateCountry = (e) => {
    setCountry(e.target.value);
  };

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    console.log("No one loves me");
    if (name.length === 0 || password.length === 0 || email.length === 0) {
      setError(true);
      setErrorMessage("Fields can't be empty");
      return;
    }

    if (confirmPass != password) {
      setError(false);
      setError(true);
      setErrorMessage("Password and Confirm Password do not match");
      return;
    }
    let data = {
      name: name,
      username: email,
      password: password,
      country: country,
      contact: checked,
    };

    data = JSON.stringify(data);
    try {
      let response = await axios.post(
        "https://api.safetagtracking.com/users",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      await localStorage.setItem("redtrack-username", email);
      if (response.status === 200) {
        history("/confirmEmail/");
      }
    } catch (e) {
      console.log(e.response.data.message);
      setError(true);
      setErrorMessage(e.response.data.message);
    }
  };
  return (
    <div>
    
      {error ? <Error message={errorMessage} /> : <></>}
      <h1 className=" mt-10 text-5xl font-bold w-full text-center">Register</h1>
      <div className="register__container">
        <div className=" w-full flex items-center justify-center pb-4 font-medium text-black">
          <p>
            Already a Member?{" "}
            <Link to="/login" className=" text-black border-b border-black">
              {" "}
              Log In
            </Link>
          </p>
        </div>

        <div className="registration__form">
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={updateName}
            required
            name="name"
          ></input>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={updateEmail}
            required
            name="email"
          ></input>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={updatePassword}
            required
            name="password"
          ></input>
          <input
            type="password"
            value={confirmPass}
            placeholder="Confirm Password"
            onChange={updateConfirmPassword}
            required
            name="confirm_password"
          ></input>
          <select
            class="registraion__select text-black"
            name="country"
            onChange={updateCountry}
            value={country}
          >
            {Object.keys(countryList).map((key) => {
              return (
                <option className=" text-black" value={countryList[key]}>
                  {key}
                </option>
              );
            })}
          </select>
          {
            <div className=" flex tellMe items-center justify-center w-full gap-3 pt-4 text-gray-700 font-medium">
             <label htmlFor="check"> I want to receive SafeTag Updates</label>
              <div className=" flex items-center justify-center pt-5">
              <input type="checkbox" onChange={(e)=>setChecked(e.target.checked)} name="check" id="check" />
              </div>
            </div>
          }
        </div>
        <div className="signin__button__container">
          <button onClick={handleSubmit} className="sigin__button">
            Sign Up
          </button>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Register;
