import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { captainContext } from "../Context/CaptainContext"
import ServerWakeupScreen from "./ServerWakeupScreen"


const CaptainPublicRoute = ({ children }) => {
  const { captainLogin, loading } = useContext(captainContext)

  if (loading) {
          return <ServerWakeupScreen />
      }

  if (captainLogin) {
    return <Navigate to="/captain-home" replace />
  }

  return children
}

export default CaptainPublicRoute