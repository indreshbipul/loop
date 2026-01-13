import { createContext, useEffect, useState } from "react";
import UserSession from "../utils/UserSession"

export const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [sessionData, setSessionData] = useState(null);
    const [context_Error, setContext_Error] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        UserSession()
        .then(({res, status}) => {
            if(status !== 200){
            setSessionData(null)
            setLoading(false)
            setContext_Error({req: "Session",message : res?.message})
            return
            }
            setLoading(false)
            setContext_Error("")
            setSessionData(null)
            setSessionData({user : res.data});
        })
        .catch((error) => {
            setLoading(false)
            setContext_Error({req: "Session", message: "Server is not responding"});
        });
    },[])


    return(
        <AuthContext.Provider value={{ sessionData, setSessionData, context_Error, setContext_Error, loading }}>          
                    {children}
        </AuthContext.Provider>
    )
}