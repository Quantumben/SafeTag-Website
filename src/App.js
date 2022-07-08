import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CEmail from "./components/CEmail";
import AddDevice from "./components/AddDevice";
import ForgetPass from "./components/ForgetPass";
import Account from "./components/Account";
import Support from "./components/Support";
import Success from "./components/Success";
import MyDevice from "./components/MyDevice";
import Privacy from "./components/Privacy";
import Tos from "./components/Tos";
import Track from "./components/Track";
import History from "./components/History";
import Redirect from "./components/Redirect";
import Navigation from "./components/Navigation";

function App() {
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

  return (
    <Router>
      <Navigation setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
        
        {loggedIn ? (
          <>
            <Route path="/add-device" element={<AddDevice />} />
            <Route path="/account" element={<Account />} />
            <Route path="/track" element={<Track />} />
            <Route path="/history" element={<History />} />
            <Route path="/my-devices" element={<MyDevice />} />
            <Route path="/success" element={<Success />} />
            {/* ------------------- */}
            <Route path="/login" element={<Redirect />} />
            <Route path="/signup" element={<Redirect />} />
            <Route path="/confirmEmail" element={<Redirect />} />
            <Route path="/forgetPass" element={<Redirect  />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
            <Route path="/signup" element={<Register />} />
            <Route path="/confirmEmail" element={<CEmail />} />
            <Route path="/forgetPass" element={<ForgetPass />} />
            {/* ------------------ */}
            <Route path="/add-device" element={<Redirect  />} />
            <Route path="/account" element={<Redirect />} />
            <Route path="/track" element={<Redirect />} />
            <Route path="/history" element={<Redirect />} />
            <Route path="/my-devices" element={<Redirect />} />
            <Route path="/success" element={<Redirect />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;