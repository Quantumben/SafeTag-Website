import React , {useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'

import "./css/navigation.css"

const Navigation = (props) => {

  const history = useNavigate()

  const [loggedIn , setLoggedIn] = useState(false)

useEffect(()=>{

  const fetchDetails = async()=>{

    const username = await localStorage.getItem('redtrack-username')

    if(username){
      setLoggedIn(true)
    }

  }


  fetchDetails()
},[])



const handleLogout = async()=>{
  await localStorage.removeItem('redtrack-ref_token')
  await localStorage.removeItem('redtrack-id_token')
  await localStorage.removeItem('redtrack-username')


  history("/login")
}

  return (
      <div className="nav__container">
        <div className ="logo__container">
          <h3>
            REDTRACK
          </h3>
        </div>

        <div className="nav__items__container">
          <div className="items">
            <Link to="/">
              Home
            </Link>
            <Link to="/plans">
              Plans & Pricing
            </Link>
            <Link to="/Support">
              Support
            </Link>

            {
            (loggedIn)?
            <>
            <Link to="/account">
             Account
            </Link>
            <Link to="/" onClick = {(event) => {event.preventDefault() ; handleLogout(); }}>
              Logout
            </Link>
            </>
            :
            <Link to="/Login">
              Login
            </Link>
          }
          </div>
        </div>
      </div>
  )
}

export default Navigation
