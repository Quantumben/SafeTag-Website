import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
const navigate = useNavigate()
    useEffect(() => {
      const fetchDetails =  () => {
        const username = localStorage.getItem("redtrack-username");
  
        if (username) {
      //  navigate("/")
        }
        else{
          navigate("/login")
        }
       
      };
  
      fetchDetails();
    }, []);
  return (
    <div>
        
    </div>
  )
}

export default Redirect