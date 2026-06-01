import { Navigate } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"


const Protected = ({children}) => {
    const { isLoading,userData } = useAuth()


    if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-gray-300">
      
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm text-gray-400">Loading...</p>

      </div>

    </div>
  );
}

    if(!userData){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected