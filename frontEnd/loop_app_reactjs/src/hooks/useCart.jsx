import {CartContext} from "../contexts/CartContext"
import { useContext } from "react"

function useCart(){
    const context = useContext(CartContext)
    return context
}

export default useCart