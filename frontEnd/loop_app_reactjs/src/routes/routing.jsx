import { Routes, Route } from 'react-router-dom'
import Index from '../pages/Index.jsx'
import Cart from '../pages/Cart.jsx'
import UserProfile from '../pages/UserProfile.jsx'
import Product from '../pages/Product.jsx'
import ProductDetail from '../pages/ProductDetail.jsx'
import Error from '../pages/Error.jsx'
import UserSignin from '../auth/UserSignin.jsx'
import UserSignUp from '../auth/UserSignUp.jsx'
import Myorder from '../pages/myorders.jsx'
import Account from '../pages/account.jsx'
import Checkout from '../pages/checkout.jsx'
import Addaddress from '../pages/addAddres.jsx'
import Address from '../pages/address.jsx'
import Wishlist from '../pages/wishlist.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import PublicOnlyRoutes from './PublicOnlyRoutes.jsx'


function routing() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<PublicOnlyRoutes><UserSignin /></PublicOnlyRoutes>} />
            <Route path="/signup" element={<PublicOnlyRoutes><UserSignUp /></PublicOnlyRoutes>} />
            <Route path="/userprofile" element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:productId/:varientId" element={<ProductDetail />} />
            <Route path="/myorders" element={<Myorder />} />
            <Route path="/useraccount" element={<Account />} />
            {/* <Route path="/ordercheckout" element={<Checkout />} /> */}
            {/* <Route path="/add_address" element={<Addaddress />} /> */}
            {/* <Route path="/savedaddress" element={<Address />} /> */}
            <Route path="/mywishlist" element={<Wishlist />} />            
            <Route path="*" element={<Error />} />

        </Routes>

    </>
  )
}

export default routing;