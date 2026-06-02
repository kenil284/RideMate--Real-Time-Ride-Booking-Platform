// src/context/CaptainContext.jsx

import React, { createContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export const captainContext = createContext()

const CaptainContext = ({ children }) => {

  const [captainData, setCaptainData] = useState()
  const [captainLogin, setCaptainLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  const openalert = (status, msg) => {
    if (status === "Success") {
      toast.success(msg)
    }

    if (status === "Error") {
      toast.error(msg)
    }
  }

  return (
    <captainContext.Provider
      value={{
        captainData,
        setCaptainData,
        captainLogin,
        setCaptainLogin,
        loading,
        setLoading,
        openalert
      }}
    >
      {children}
    </captainContext.Provider>
  )
}

export default CaptainContext