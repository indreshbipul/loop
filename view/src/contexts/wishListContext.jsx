import { createContext, useEffect, useState } from "react";
import productService from "../services/productServices";
import useAuthHook from "../hooks/authHook";
import authService from "../services/authServices";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext(null)

export function WishlistProvider({children}){
    const navigate = useNavigate()
    const {sessionData, useSessionData, setContext_Error,loading} = useAuthHook()
    const [wishlistItems, setWishlistItems] = useState([])
    useEffect(()=>{
        productService.getWishlistitems()
        .then(({res, status})=>{
            if(status ===400){
                authService.userLogout()
                useSessionData(null)
                navigate('/signin')   
                return            
            }
            if(status !== 200){
                return setContext_Error({req : "wishlist Context" , message : res.message})
            }
            setWishlistItems(res.items)
        })
        .catch(()=>{
            setContext_Error({req : "wishlist Context" , message : "Please try again after sometime"})
        })
    },[sessionData, loading])

    const wishlistCount = wishlistItems?.length || 0;

    return (
        <WishlistContext.Provider value={{ wishlistItems, setWishlistItems, wishlistCount}}>
            {children}
        </WishlistContext.Provider>
    )
}