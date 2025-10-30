import React, { useContext } from 'react'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'
import { Route, Routes } from 'react-router-dom'
import VehicleDetails from './pages/VehicleDetails'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './components/CaptainRiding'



const App = () => {


  
  return (
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<UserLogin/>}  />
      <Route path='/register' element={<UserRegister/>}  />
      <Route path='/c-login' element={<CaptainLogin/>}  />
      <Route path='/c-register' element={<CaptainRegister/>}  />
      <Route path='/vehicle-details' element={<VehicleDetails/>}  />
      <Route path ='/home' element={<UserProtectedWrapper>
        <Home/>
      </UserProtectedWrapper>}/>
      <Route path='/user/logout' element={<UserProtectedWrapper>
        <UserLogout/>
      </UserProtectedWrapper>}/>
      <Route path='captain-home' element={<CaptainProtectedWrapper>
        <CaptainHome/>
      </CaptainProtectedWrapper>}/>
      <Route path='captain/logout' element={<CaptainProtectedWrapper>
        <CaptainLogout/>
      </CaptainProtectedWrapper>}/>
      <Route path='/riding' element={<UserProtectedWrapper>
        <Riding/>
      </UserProtectedWrapper>}/>
      <Route path='captain-riding' element={<CaptainProtectedWrapper>
        <CaptainRiding/>
      </CaptainProtectedWrapper>}/>
    </Routes>

  )
}

export default App