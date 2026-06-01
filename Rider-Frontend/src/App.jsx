import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './features/Home'
import Login from './features/auth/Pages/login'
import Register from './features/auth/Pages/Register'
import Ride from './features/Rides/pages/Ride'
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />


        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/ride' element={<Ride />} />


      </Routes>
    </>
  )
}

export default App
