import useAuthHook from "../hooks/authHook";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader"

function ProtectedRoutes({children}){
    const {sessionData, loading} = useAuthHook()
    if(loading){
        return(<Loader />)
    }
    if(!sessionData?.user){
        return <Navigate to="/signin" replace />
    }
    return children
}

export default ProtectedRoutes