import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Features/Home'
import CaptainLogin from './Features/auth/Pages/CaptainLogin'
import CaptainRegister from './Features/auth/Pages/CaptainRegister'
import Rides from './Features/Rides/Pages/Rides'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path='/login' element={<CaptainLogin/>}/>

      <Route path='/register' element={<CaptainRegister/>} />

      <Route path='/ride' element={<Rides/>}/>
    </Routes>
  )
}

export default App
