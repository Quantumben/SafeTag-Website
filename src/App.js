import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/confirmEmail" element={<CEmail />} />
        <Route path="/add-device" element={<AddDevice />} />
        <Route path="/forgetPass" element={<ForgetPass />} />
        <Route path="/account" element={<Account />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/success" element={<Success />} />
        <Route path="/my-devices" element={<MyDevice />} />
      </Routes>
    </Router>
  );
}

export default App;
