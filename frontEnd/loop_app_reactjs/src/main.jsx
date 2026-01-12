import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authSessionContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { WishlistProvider } from './contexts/wishListContext.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter> 
          <AuthProvider ><CartProvider><WishlistProvider><App /></WishlistProvider></CartProvider></AuthProvider>
      </BrowserRouter>
  </StrictMode>
)
