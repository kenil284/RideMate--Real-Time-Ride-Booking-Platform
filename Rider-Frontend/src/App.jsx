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
import ProtectedRoute from './features/auth/Component/ProtectedRoute'
import PublicRoute from './features/auth/Component/PublicRoute'

function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
      <Route path="/" element={
        <PublicRoute><Home /></PublicRoute>
      } />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/ride"
        element={
          <ProtectedRoute>
            <Ride />
          </ProtectedRoute>
        }
      />
    </Routes >
      
    </>
  )
}

export default App
