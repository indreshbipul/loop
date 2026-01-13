import {WishlistContext} from "../contexts/wishListContext"
import { useContext } from "react"

function useWishList(){
    const context = useContext(WishlistContext)
    return context
}

export default useWishList