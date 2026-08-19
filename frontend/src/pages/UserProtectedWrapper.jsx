import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({children}) => {
  const token = localStorage.getItem('token');
  const {serverURL,setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/login');
      return;
    }

    axios.get(`${serverURL}/api/user/profile`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if(response.status === 200){
        setUser(response.data);
      }
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      localStorage.removeItem('token');
      navigate('/login');
    })
  },[token, serverURL, setUser, navigate])

  if(isLoading){
    return <div>Loading...</div>
  }




  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectedWrapper