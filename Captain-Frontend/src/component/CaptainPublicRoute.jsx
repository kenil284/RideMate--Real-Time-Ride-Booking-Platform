import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { captainContext } from "../Context/CaptainContext"


const CaptainPublicRoute = ({ children }) => {
  const { captainLogin, loading } = useContext(captainContext)

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <p className="text-sm font-semibold text-gray-500">Loading...</p>
      </div>
    )
  }

  if (captainLogin) {
    return <Navigate to="/captain-home" replace />
  }

  return children
}

export default CaptainPublicRoute