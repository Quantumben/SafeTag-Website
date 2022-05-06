import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import CEmail from "./components/CEmail"
import Plans from "./components/Plans"
import ForgetPass from "./components/ForgetPass"
import Account from "./components/Account"
import Support from "./components/Support"
import Success from "./components/Success"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/confirmEmail" element={<CEmail />} />
        <Route path="/Plans" element={<Plans />} />
        <Route path="/forgetPass" element={<ForgetPass />} />
        <Route path="/account" element={<Account />} />
        <Route path="/support" element={<Support />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
