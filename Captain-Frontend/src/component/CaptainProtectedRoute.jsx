import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { captainContext } from "../Context/CaptainContext"
import ServerWakeupScreen from "./ServerWakeupScreen"


const CaptainProtectedRoute = ({ children }) => {
  const { captainLogin, loading } = useContext(captainContext)

  if (loading) {
          return <ServerWakeupScreen />
      }

  if (!captainLogin) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default CaptainProtectedRoute