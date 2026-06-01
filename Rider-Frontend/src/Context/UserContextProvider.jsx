import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export const userContext = createContext()

const UserContextProvider = ({children}) => {

  const [userData,setuserData] = useState()
  const [login,setLogin] = useState(false)
  const [loading,setLoading] = useState(true)

  const openalert = (status, msg) => {
    if (status == "Success") {
      toast.success(msg)
    }
    if (status == "Error") {
      toast.error(msg)
    }
  }


  return (

    <userContext.Provider value={{userData,setuserData,login,setLogin,loading,setLoading,openalert}}>
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider
