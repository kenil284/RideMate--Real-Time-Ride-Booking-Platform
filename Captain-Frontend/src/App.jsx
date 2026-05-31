import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Features/Home'
import CaptainLogin from './Features/auth/Pages/CaptainLogin'
import CaptainRegister from './Features/auth/Pages/CaptainRegister'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path='/login' element={<CaptainLogin/>}/>

      <Route path='/register' element={<CaptainRegister/>} />
    </Routes>
  )
}

export default App
