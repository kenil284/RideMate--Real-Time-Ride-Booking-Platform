import { useContext } from "react"
import { userContext } from "../../../Context/UserContextProvider"
import { Login } from "../Service/auth.api"


export const useAuth = () => {
    const {userData,setuserData,login,setLogin,loading,setLoading} = useContext(userContext)

     const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await Login({ email, password })
            setuserData(data.user)
            return data;
        } catch (err) {
            console.log(err)
            throw err;
        } finally {
            setLoading(false)
        }
    }

    return {userData,login,loading,handleLogin}


}