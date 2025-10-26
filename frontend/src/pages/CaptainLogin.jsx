import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import { CaptainContext } from '../context/CaptainProvider'

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [apiError , setApiError] = useState(null);
  const {serverURL} = useContext(UserContext);
  const {setCaptain} = useContext(CaptainContext);
  const [formData, setFormData] = useState({
      email:'',
      password:''
    })
  
    const handleChange = (e) => {
      const {value,name} = e.target;
      setFormData({
        ...formData,[name]:value
      })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${serverURL}/api/captain/login`,{
          email:formData.email,
          password:formData.password
        },{withCredentials:true})
        if(response.status === 200){
          setApiError(null);
          setCaptain(response.data.captain);   
          localStorage.setItem('token',response.data.token); 
          navigate('/captain-home');
        }
      } catch (error) {
        setApiError(error.response.data.message);
        console.log('login error : ',error);
      }
      
    }
  return (
    <div>
      <div className='w-full h-screen p-7 flex flex-col justify-between '>
        <div>
          <img src='https://imgs.search.brave.com/TprvZh85fAahrBWHZleW93P4YzpNwOLKh9lmIiXpOtk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9iWFZFb21YTlZp/ZWpZR3I0SmU1RWQ0/SjA4cThHMDBGVVBZ/Q2Rnb2lQTkYtMlhB/cVdNWUFHQ0JySy1u/ME9NWUkzT0FMWj13/MjQwLWg0ODAtcnc' className='w-35 mb-10 rounded-2xl'/>
        <form className='flex flex-col items-start w-full' onSubmit={handleSubmit}>
          <label className='font-bold text-3xl mb-3'>Enter Captain's email</label>
          <input name='email' type='email' className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='email@example.com' value={formData.email} onChange={handleChange} required/> 
          <label className='font-bold text-3xl mb-3 '>Enter Password</label>
          <input name='password' type='password' className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='password' value={formData.password} onChange={handleChange} required/>

          {apiError && <h2 className='w-full text-center text-xl mb-2 text-red-600'>
              {apiError}
            </h2>}

          <button className=' flex items-center justify-center w-full py-6 bg-black text-white text-2xl rounded-xl cursor-pointer' >Login</button>
        </form>
        <h2 className='text-xl text-center mt-3 cursor-pointer'>Don't have an account? <Link to='/c-register' className='font-semibold'> Register </Link></h2>
        </div>
        <Link to='/login' className='flex items-center justify-center w-full py-6 bg-black text-white text-2xl rounded-xl cursor-pointer'>Login As User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin