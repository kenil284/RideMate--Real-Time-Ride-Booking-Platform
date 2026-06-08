import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { userContext } from "../../../Context/UserContextProvider"
import ServerWakeupScreen from "./ServerWakeupScreen"


const ProtectedRoute = ({ children }) => {
    const { login, loading } = useContext(userContext)

    if (loading) {
        return <ServerWakeupScreen />
    }

    if (!login) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute