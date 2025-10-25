import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const UserRegister = () => {

  const [formData, setFormData] = useState({ firstname:'', lastname:'', email:'', password:'' });

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
          <img src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw' className='w-35 mb-10'/>
        <form className='flex flex-col items-start w-full' onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            <div className='w-full flex flex-col gap-3'>
            <label className='font-semibold text-3xl'>First Name</label>
            <input type='text' name='firstname' value={formData.firstname}  className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='Jhon' onChange={handleChange} />
          </div> 
          <div className='w-full flex flex-col gap-3'>
            <label className='font-semibold text-3xl'>Last Name</label>
            <input type='text' name='lastname' value={formData.lastname}   className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='Doe' onChange={handleChange}/>
          </div>
          </div>
          <label className='font-semibold text-3xl mb-3'>Enter Captain's email</label>
          <input name='email' type='email' className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='email@example.com' value={formData.email} onChange={handleChange} required/> 
          <label className='font-semibold text-3xl mb-3 '>Enter Password</label>
          <input name='password' type='password' className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='password' value={formData.password} onChange={handleChange} required/>

         
          
          <button className=' flex items-center justify-center w-full py-6 bg-black text-white text-2xl rounded-xl cursor-pointer' >Register</button>
        </form>
        <h2 className='text-xl text-center mt-3 cursor-pointer'>Already have an account? <Link to='/login' className='font-semibold'> Login </Link></h2>
        </div>
        <Link to='/c-register' className='flex items-center justify-center w-full py-6 bg-black text-white text-2xl rounded-xl cursor-pointer'>Register As Captain</Link>
      </div>
    </div>
  )
}

export default UserRegister