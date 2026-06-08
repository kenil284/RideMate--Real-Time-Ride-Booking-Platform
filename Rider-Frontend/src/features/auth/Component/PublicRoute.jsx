import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { userContext } from "../../../Context/UserContextProvider"


const PublicRoute = ({ children }) => {
  const { login, loading } = useContext(userContext)

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <p className="text-sm font-semibold text-gray-500">Loading...</p>
      </div>
    )
  }

  if (login) {
    return <Navigate to="/ride" replace />
  }

  return children
}

export default PublicRoute