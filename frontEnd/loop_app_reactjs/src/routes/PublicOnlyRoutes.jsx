import { Navigate } from "react-router-dom";
import useAuthHook from "../hooks/authHook";
import Loader from "../components/Loader";

function PublicOnlyRoutes({children}){
    const {loading, sessionData} = useAuthHook()
    if(loading){
        return(<Loader />)
    }
    if(sessionData?.user){
        return <Navigate to="/" replace />
    }
    return children
}


export default PublicOnlyRoutes