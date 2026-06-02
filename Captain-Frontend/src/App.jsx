import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Features/Home'
import CaptainLogin from './Features/auth/Pages/CaptainLogin'
import CaptainRegister from './Features/auth/Pages/CaptainRegister'
import { Toaster } from "react-hot-toast";
import CaptainHome from './Features/captain-ride/pages/CaptainHome'

const App = () => {
  return (
    <>
    <Toaster position="top-center" />
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path='/login' element={<CaptainLogin/>}/>

      <Route path='/register' element={<CaptainRegister/>} />

      <Route path='/captain-home' element={<CaptainHome/>} />

    </Routes>
    </>
  )
}

export default App
