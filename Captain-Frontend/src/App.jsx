import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Features/Home'
import CaptainLogin from './Features/auth/Pages/CaptainLogin'
import CaptainRegister from './Features/auth/Pages/CaptainRegister'
import { Toaster } from "react-hot-toast";
import CaptainHome from './Features/captain-ride/pages/CaptainHome'
import CaptainProtectedRoute from './component/CaptainProtectedRoute'
import CaptainPublicRoute from './component/CaptainPublicRoute'

const App = () => {
  return (
    <>
    <Toaster position="top-center" />
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path='/login' element={<CaptainPublicRoute><CaptainLogin/></CaptainPublicRoute>}/>

      <Route path='/register' element={<CaptainPublicRoute><CaptainRegister/></CaptainPublicRoute>} />

      <Route path='/captain-home' element={<CaptainProtectedRoute><CaptainHome/></CaptainProtectedRoute>} />

    </Routes>
    </>
  )
}

export default App
