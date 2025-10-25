import React from 'react'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'
import { Route, Routes } from 'react-router-dom'
import VehicleDetails from './pages/VehicleDetails'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<UserLogin/>}  />
      <Route path='/register' element={<UserRegister/>}  />
      <Route path='/c-login' element={<CaptainLogin/>}  />
      <Route path='/c-register' element={<CaptainRegister/>}  />
      <Route path='/vehicle-details' element={<VehicleDetails/>}  />
    </Routes>
  )
}

export default App