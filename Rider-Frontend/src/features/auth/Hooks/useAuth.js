import { useContext } from "react"
import { userContext } from "../../../Context/UserContextProvider"
import { Login, Register } from "../Service/auth.api"


export const useAuth = () => {
    const {openalert,checkAuth} = useContext(userContext)

     const handleLogin = async ({ email, password }) => {
        try {
            const data = await Login({ email, password })

            await checkAuth()
            
            return data;
        } catch (err) {

            throw err;
        } 
    }

    const handleRegister = async ({ fullname, email, password, phone }) => {
        try {
            const data = await Register({ fullname, email, password, phone })
       
            return data;
        } catch (err) {

            throw err;
        }
        
    }

    return {handleLogin,handleRegister,openalert}


}