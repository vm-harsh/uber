import React, { useContext, useEffect } from 'react'
import { CaptainContext } from '../context/CaptainProvider';
import { UserContext } from '../context/UserProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CaptainLogout = () => {
  const navigate = useNavigate()
  const {serverURL} = useContext(UserContext);
  const {setCaptain} = useContext(CaptainContext);
  const token = localStorage.getItem('token');

  useEffect(()=>{
   const handleLogout = async () => {
     const response =  await axios.get(`${serverURL}/api/captain/logout`,{withCredentials:true},{
    headers:{
      Authorization:`Bearer ${token}`
    }
    })

    if(response.status === 200){
      localStorage.removeItem('token');
      setCaptain(null);
      navigate('/c-login');
    }
   }
   handleLogout();
  },[])


  
  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout