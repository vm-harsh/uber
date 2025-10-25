import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const  navigate = useNavigate();
  return (
    <div>
     <div className='bg-[url(https://plus.unsplash.com/premium_photo-1682834983265-27a10ba5232c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500)] w-full h-screen flex flex-col justify-end '>
    
      <img src='https://imgs.search.brave.com/vrBt1R3kr7qnpjz1aNh2d2iDXRS5YhPNQndZEhix3bE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZGlkTmJpaU9k/L3RoZW1lL2xpZ2h0/L2xvZ28uc3ZnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTY2ODA3MTAzNjQ2/OQ' className='absolute top-15 left-10 w-35'/>
        
      <div className='w-full flex flex-col bg-white  p-4 pb-6 justify-between gap-15'>
        <h2 className='text-4xl font-bold'>Get started with Uber</h2>
        <button className='w-full py-6 bg-black text-white text-xl rounded-xl cursor-pointer' onClick={()=>navigate('/login')}>Continue</button>
        </div>
     </div>
    </div>
  )
}

export default Home