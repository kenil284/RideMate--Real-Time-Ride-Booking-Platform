import { useContext } from "react"
import { userContext } from "../../../Context/UserContextProvider"
import { Login, Register } from "../Service/auth.api"


export const useAuth = () => {
    const {userData,setuserData,login,setLogin,openalert} = useContext(userContext)

     const handleLogin = async ({ email, password }) => {
        try {
            const data = await Login({ email, password })
            setuserData(data.user)
            return data;
        } catch (err) {
            console.log(err)
            throw err;
        } 
    }

    const handleRegister = async ({ fullname, email, password, phone }) => {
        try {
            const data = await Register({ fullname, email, password, phone })
            setuserData(data.user)
            return data;
        } catch (err) {
            console.log(err)
            throw err;
        }
        
    }

    return {handleLogin,handleRegister,openalert}


}