import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const userContext = createContext()

const UserContextProvider = ({children}) => {

  const [userData,setuserData] = useState()
  const [login,setLogin] = useState(false)
  const [loading,setLoading] = useState(true)


  return (

    <userContext.Provider value={{userData,setuserData,login,setLogin,loading,setLoading}}>
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider
