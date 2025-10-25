import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { useState } from 'react';

const VehicleDetails = () => {
  const navigate = useNavigate();
  const [prevData,setPrevData] = useState(()=>{
    const saved = localStorage.getItem('formdata')
    if(saved){
      return JSON.parse(saved)
    }
  })
  const[formData,setFormData]=useState({
    color:'',
    plateNo:'',
    capacity:'',
    type:''
  })

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = {...prevData, ...formData};
    localStorage.removeItem('formdata');
    console.log(combinedData);
  }
  return (
    <div className='w-full h-screen p-7 flex flex-col gap-10'>
       <div className='flex w-full justify-between items-start'>
        <button onClick={()=>navigate(-1)} className='text-5xl'><IoMdArrowBack /></button>
       </div>
       <label className='font-semibold text-4xl'>Vehicle Details</label>
      <form className='flex flex-col items-start w-full' onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4 w-full'>
          <div className='w-full flex flex-col gap-3'>
            <label className='font-semibold text-2xl'>Color</label>
            <input type='text' name='color' value={formData.color} onChange={handleChange} className='bg-[#ededed] text-2xl px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='ex-red' />
          </div> 
          <div className='w-full flex flex-col gap-3'>
            <label className='font-semibold text-2xl'>Plate No.</label>
            <input type='text' name='plateNo' value={formData.plateNo} className='bg-[#ededed] text-2xl px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='ex-UP15Bk0001'onChange={handleChange} />
          </div>
          <div className='w-full flex flex-col gap-3'>
            <label className='font-semibold text-2xl'>Capacity</label>
            <input type='number' name='capacity' value={formData.capacity}  className='bg-[#ededed] text-2xl px-3 py-6 rounded-2xl w-full outline-orange-300' placeholder='ex-1' onChange={handleChange} />
          </div>
            <div className='w-full flex flex-col gap-3'>
            <label className='font-semibold text-2xl'>Type</label>
            <select name='type' value={formData.type} className='bg-[#ededed] text-2xl mb-6 px-3 py-6 rounded-2xl w-full outline-orange-300'onChange={handleChange} > 
              <option>Bike</option>
              <option>Car</option>
              <option>Auto</option>
            </select>
          </div> 
       </div>
        <button className=' mt-5 flex items-center justify-center w-full py-6 bg-black text-white text-2xl rounded-xl cursor-pointer' >Register</button>
      </form>
    </div>
  )
}

export default VehicleDetails