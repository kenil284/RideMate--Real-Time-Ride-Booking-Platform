import { io } from "socket.io-client"

export const connectTrackingSocket = ()=>{
 return io( `${import.meta.env.VITE_API_URL}/tracking`,
   {
      withCredentials:false
   }
 )

}