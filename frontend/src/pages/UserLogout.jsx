import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate()
  const {serverURL} = useContext(UserContext);
  const token = localStorage.getItem('token');
  
  useEffect(()=>{
    const handleLogout = async () => {
       const response = await axios.get(`${serverURL}/api/user/logout`,{withCredentials:true},{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status == 200){
    localStorage.removeItem('token');
    navigate('/login');
  }
    }
    handleLogout();
  },[])

  return (
    <div>UserLogout</div>
  )
}

export default UserLogout