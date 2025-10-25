import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const UserLogin = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  }

  return (
    <div>
      <div className='w-full h-screen p-7 flex flex-col justify-between '>
        <div>
          <img src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw' className='w-35 mb-15'/>
        <form className='flex flex-col items-start w-full' onSubmit={handleSubmit}>
          <label className='font-bold text-3xl mb-3'>What's your email</label>
          <input name='email' type='email' className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='email@example.com' value={formData.email} onChange={handleChange} required/> 
          <label className='font-bold text-3xl mb-3 '>Enter Password</label>
          <input name='password' type='password' className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='password' value={formData.password} onChange={handleChange} required/>
          <button className=' flex items-center justify-center w-full py-6 bg-black text-white text-2xl rounded-xl cursor-pointer' >Login</button>
        </form>
        <h2 className='text-xl text-center mt-3 cursor-pointer'>Don't have an account? <Link to='/register' className='font-semibold'> Register </Link></h2>
        </div>
        <Link to='/c-login' className='flex items-center justify-center w-full py-6 bg-black text-white text-2xl rounded-xl cursor-pointer'>Login As Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin