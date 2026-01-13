import {useContext } from "react";
import {AuthContext} from "../contexts/authSessionContext";

function useAuthHook() {
    const context = useContext(AuthContext);
    if (!context) {
    }
    return context;
    }
export default useAuthHook;