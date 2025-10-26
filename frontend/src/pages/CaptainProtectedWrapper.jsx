import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider';
import axios from 'axios';
import { CaptainContext } from '../context/CaptainProvider';


const CaptainProtectedWrapper = ({children}) => {
  const navigate = useNavigate();
  const {serverURL} = useContext(UserContext);
  const {setCaptain} = useContext(CaptainContext);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(!token){
      navigate('/c-login');
    }
  },[token])

    axios.get(`${serverURL}/api/captain/profile`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if(response.status === 200){
      setIsLoading(false);
    setCaptain(response.data.captain)}
  })
  .catch((error) => {
    setIsLoading(false);
    localStorage.removeItem('token');
    navigate('/c-login');
  })

  if(isLoading){
    return <div>Loading...</div>
  }
   


  return (
    <div>{children}</div>
  )
}

export default CaptainProtectedWrapper