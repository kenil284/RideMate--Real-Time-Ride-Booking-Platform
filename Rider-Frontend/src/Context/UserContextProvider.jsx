import React, { createContext, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { getUserProfileService, refreshAccessTokenService } from "../features/auth/Service/auth.api"


export const userContext = createContext()

const UserContextProvider = ({ children }) => {
  const [userData, setuserData] = useState(null)
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  const openalert = (status, msg) => {
    if (status === "Success") {
      toast.success(msg)
    }

    if (status === "Error") {
      toast.error(msg)
    }

    if (status === "Info") {
      toast(msg)
    }
  }

  const checkAuth = async () => {
    try {
      setLoading(true)

      const data = await getUserProfileService()

      setuserData(data.user)
      setLogin(true)

      return true
    } catch (error) {
      console.log(error)
      if (error.response?.status !== 400) {
        setuserData(null)
        setLogin(false)
        setLoading(false)
        return false
      }

      try {
        await refreshAccessTokenService()

        const data = await getUserProfileService()

        setuserData(data.user)
        setLogin(true)

        return true
      } catch (refreshError) {
        setuserData(null)
        setLogin(false)

        return false
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <userContext.Provider
      value={{
        userData,
        setuserData,
        login,
        setLogin,
        loading,
        setLoading,
        openalert,
        checkAuth,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider