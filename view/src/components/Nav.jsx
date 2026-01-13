import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authServices";
import useAuthHook from "../hooks/authHook";
import logo from "../assets/logoDark.png";
import useCart from '../hooks/useCart'
import useWishList from "../hooks/useWishlist";

function Nav() {
  const { sessionData, setSessionData, setContext_Error } = useAuthHook();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishList();
  const [mobileView, setMobileView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.userLogout()
      .then(({ res, status }) => {
        if (status !== 200) {
          return setContext_Error({ req: "sign out", message: res.message })
        }
        setSessionData(null)
        setMobileView(false)
        navigate("/signin");
      })
      .catch((error) => {
        setContext_Error({ req: "sign out", message: "Server is not responding" })
      })
  };

  return (
    <div className="z-50 fixed bg-black h-20 w-full flex justify-between items-center px-2 sm:px-14 border-b border-gray-900">
      
      {/* Logo */}
      <div className="h-20 flex items-center justify-center">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-16 min-w-9" />
        </NavLink>
      </div>

      {/* Navigation Items */}
      <div className="flex gap-4 md:gap-10 items-center justify-center">
        
        {/* Home */}
        <NavLink to="/" className="text-white hover:text-gray-400 sm:block hidden">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" fill="currentColor">
              <path d="M25,1.05078c-0.2175,0 -0.43414,0.06898 -0.61914,0.20898l-23,17.95117c-0.43,0.34 -0.50992,0.9682 -0.16992,1.4082c0.34,0.43 0.9682,0.50992 1.4082,0.16992l1.38086,-1.07812v26.28906c0,0.55 0.45,1 1,1h14v-18h12v18h14c0.55,0 1,-0.45 1,-1v-26.28906l1.38086,1.07812c0.19,0.14 0.39914,0.21094 0.61914,0.21094c0.3,0 0.58906,-0.13086 0.78906,-0.38086c0.34,-0.44 0.26008,-1.0682 -0.16992,-1.4082l-23,-17.95117zM35,5v1.05078l6,4.67969v-5.73047z" />
            </svg>
            <span className="hidden md:block">Home</span>
          </div>
        </NavLink>

        {/* Wishlist and Cart - Only show if user is logged in */}
        {sessionData?.user && (
          <>
            <NavLink to="/mywishlist" className="relative text-white hover:text-gray-400 group">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="hidden md:block">Wishlist</span>
              </div>
              {/* Teal Wishlist Count Badge */}
              <span className="absolute bg-teal-600 text-white rounded-full top-[-5px] left-[7px] px-1.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold group-hover:top-[-15px] transition-all duration-200">
                {wishlistCount}
              </span>
            </NavLink>

            <NavLink to="/cart" className="relative text-white hover:text-gray-400 group block">
              <div className="flex items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor">
                  <path fillRule="nonzero" d="M0 .75A.75.75 0 0 1 .75 0h.558c.95 0 1.52.639 1.845 1.233.217.396.374.855.497 1.271a1.29 1.29 0 0 1 .1-.004h12.498c.83 0 1.43.794 1.202 1.593l-1.828 6.409a2.75 2.75 0 0 1-2.644 1.996H7.03a2.75 2.75 0 0 1-2.652-2.022l-.76-2.772-1.26-4.248-.001-.008c-.156-.567-.302-1.098-.52-1.494-.21-.385-.378-.454-.529-.454H.75A.75.75 0 0 1 0 .75zM6.5 17.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM13.5 17.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
                <span className="hidden md:block">Cart</span>
              </div>
              {/* Red Cart Count Badge */}
              <span className="absolute bg-red-600 text-white rounded-full top-[-10px] left-[7px] px-1.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold group-hover:top-[-15px] transition-all duration-200">
                {cartCount}
              </span>
            </NavLink>
          </>
        )}

        {/* User Profile Area */}
        <div className="relative group text-white">
          <button
            onClick={() => { if (window.innerWidth < 1024) setMobileView(!mobileView); }}
            className="hover:text-gray-400 flex items-center gap-2 focus:outline-none"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
              <circle cx="16" cy="13.5" r="5.5" />
              <path d="M6.1 26.8C7.6 24.2 9.99 22.3 12.8 21.4c1.3-.57 6-.57 7.4 0 2.8.91 5.2 2.82 6.7 5.4a.75.75 0 0 1-.7 1.2H6.8a.75.75 0 0 1-.7-1.2z" />
            </svg>
            <span className="hidden sm:block">{(sessionData?.user?.firstName)?.toUpperCase() || "LOGIN"}</span>
          </button>

          {/* Desktop Dropdown */}
          <div className="hidden lg:group-hover:flex flex-col absolute right-0 top-full bg-black border border-gray-800 p-2 min-w-[150px] shadow-2xl z-50">
            {sessionData?.user ? (
              <>
                <Link to="/userprofile" className="p-2 border-b border-gray-800 hover:bg-gray-900 transition-colors">Profile</Link>
                <Link to="/myorders" className="p-2 border-b border-gray-800 hover:bg-gray-900 transition-colors">My Orders</Link>
                <Link to="/useraccount" className="p-2 border-b border-gray-800 hover:bg-gray-900 transition-colors">Account</Link>
                <button onClick={handleLogout} className="p-2 text-left text-red-500 hover:bg-gray-900 transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="p-2 border-b border-gray-800 hover:bg-gray-900 transition-colors">Sign In</Link>
                <Link to="/signup" className="p-2 hover:bg-gray-900 transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Overlay Menu */}
          {mobileView && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileView(false)} />
              <div className="absolute right-0 top-0 h-full w-64 bg-white text-gray-900 p-6 flex flex-col shadow-2xl">
                <button onClick={() => setMobileView(false)} className="self-end mb-8">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <ul className="flex flex-col gap-6 font-bold uppercase tracking-widest text-sm">
                  <li><Link to="/" onClick={() => setMobileView(false)}>Home</Link></li>
                  {sessionData?.user ? (
                    <>
                      <li><Link to="/cart" onClick={() => setMobileView(false)} className="flex justify-between">Cart <span>({cartCount})</span></Link></li>
                      <li><Link to="/mywishlist" onClick={() => setMobileView(false)} className="flex justify-between">Wishlist <span>({wishlistCount})</span></Link></li>
                      <li><Link to="/userprofile" onClick={() => setMobileView(false)}>Profile</Link></li>
                      <li><button onClick={handleLogout} className="text-red-600">Logout</button></li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/signin" onClick={() => setMobileView(false)}>Sign In</Link></li>
                      <li><Link to="/signup" onClick={() => setMobileView(false)}>Sign Up</Link></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;