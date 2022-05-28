import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import CEmail from "./components/CEmail"
import AddDevice from "./components/AddDevice"
import ForgetPass from "./components/ForgetPass"
import Account from "./components/Account"
import Support from "./components/Support"
import Success from "./components/Success"
import MyDevice from "./components/MyDevice"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/confirmEmail" element={<CEmail />} />
        <Route path="/AddDevice" element={<AddDevice />} />
        <Route path="/forgetPass" element={<ForgetPass />} />
        <Route path="/account" element={<Account />} />
        <Route path="/support" element={<Support />} />
        <Route path="/success" element={<Success />} />
        <Route path="/myDevice" element={<MyDevice />} />
      </Routes>
    </Router>
  );
}

export default App;
