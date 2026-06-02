
import { use, useContext, useState } from "react";
import { login,Register } from "../services/auth.api";
import { captainContext } from "../../../Context/captainContext";


export const useAuth = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [registeredCaptain, setRegisteredCaptain] = useState(null);
    const [isloading,setIsLoading] = useState(false)

    const { captainData, setCaptainData, captainLogin, setCaptainLogin, openalert } = useContext(captainContext)

    const handleRegister = async ({
        fullname,
        email,
        password,
        phone,
        vehicle,
    }) => {
        try {
            setIsRegistering(true)

            const data = await Register({
                fullname,
                email,
                password,
                phone,
                vehicle,
            })


            openalert("Success", data?.message || "Captain registered successfully")

            return data

        } catch (error) {


            openalert(
                "Error",
                error?.message || error?.errors?.[0]?.msg || "Captain registration failed"
            )

            return null

        } finally {
            setIsRegistering(false)
        }
    }

    const handleLogin = async({email,password}) => {
        try {
            setIsLoading(true)

            const data = await login({email,password})

            openalert("Success", data?.message || "Captain registered successfully")

            return data

            
        } catch (error) {
             openalert(
                "Error",
                error?.message || error?.errors?.[0]?.msg || "Captain registration failed"
            )

             return null
        }
        finally{
            setIsLoading(false)
        }
    }

    return {
        handleRegister,
        isRegistering,
        registeredCaptain,
        handleLogin,
        isloading
    };
};

