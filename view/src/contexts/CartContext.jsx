import {createContext, useEffect, useState } from "react";
import useAuthHook from "../hooks/authHook";
import productService from "../services/productServices";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { sessionData, loading,useSessionData, setContext_Error} = useAuthHook()
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    if (loading) return; 

    if (!sessionData) {
      setCartItems([]);
      setCartLoaded(true);
      return;
    }

    productService.getCartitems()
      .then(({ res, status }) => {
        if(status === 400){
            authService.userLogout()
            useSessionData(null)
            navigate('/signin')   
            return            
        }
        if(status !== 200){
            return setContext_Error({req : "Cart Context" , message : res.message})
        }
        setCartItems(res.CartItem);
        setCartLoaded(true);
      })
      .catch(()=>{
            setContext_Error({req : "cart Context" , message : "Please try again after sometime"})
      })
  }, [sessionData, loading]);

  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  return (
    <CartContext.Provider value={{ contextcartItems : cartItems, setContextCartItems : setCartItems, cartCount}}>
      {children}
    </CartContext.Provider>
  );
};
