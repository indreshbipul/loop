import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard.jsx"; 
import productService from "../services/productServices.jsx";
import useAuthHook from "../hooks/authHook.jsx";
import Loader from "../components/Loader";

function Cart() {
  const { sessionData, setContext_Error } = useAuthHook(); 
  const [items, setItems] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionData?.user) {
      productService.getCartitems()
        .then(({res, status}) => {
          if (status !== 200 ){
            return setContext_Error({req : "Get Cart", message : res.message})
          }
          setItems(res.CartItem);
          setSelectedVariantId(varientId);
        })
        .catch((err) => setContext_Error({req : "Get cart", message : "Please try again after sometime" }));
      }
  }, [sessionData, navigate]);

  const removeCartItem = (id) => {
    productService.removeCartItem(id)
      .then(({res, status}) => {
        if (status !== 200 ){
          return setContext_Error({req : "Remove item from cart", message : res.message})
        }
        setItems(prev =>prev.filter(item => item._id !== id));
      })
      .catch((err) => {
        setContext_Error({req : "Remove item from cart", message : "Please try again after sometime" })
      });
  };

  const summary = useMemo(() => {
    const subtotal = items?.reduce((acc, item) => 
      acc + (item.variantId?.price * item.quantity), 0) || 0;
    return { subtotal, tax: subtotal * 0.05, total: subtotal * 1.05 };
  }, [items]);

  if (!items) return <Loader />;

  return (
    <div className="min-h-screen  p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2">Shopping Cart</h1>
          <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"> 
          
          {/* List Section */}
          <div className="lg:col-span-7 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[2rem] border border-slate-100">
                <p className="text-slate-400 font-medium italic">Your Cart is empty.</p>
                <button onClick={() => navigate('/product')} className=" px-4 py-2 rounded-2xl mt-4 text-indigo-600 font-bold text-lg bg-gray-200 border-2 border-black hover:text-white hover:bg-indigo-400">Shop Now</button>
              </div>
            ) : (
              items.map((item) => (
                <CartCard key={item.variantId?._id} product={item} removeCartItem= {removeCartItem} />
              ))
            )}
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-5 sticky top-12">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-8">Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">Subtotal</span>
                  <span className="font-bold">₹{summary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">Shipping</span>
                  <span className="text-green-600 font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm pt-4 border-t border-slate-50">
                  <span className="text-slate-400 font-medium">Estimated Tax</span>
                  <span className="font-bold">₹{summary.tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Total</span>
                <span className="text-4xl font-black text-indigo-600 tracking-tighter">
                  ₹{summary.total.toLocaleString()}
                </span>
              </div>

              <button
                disabled={items.length === 0}
                onClick={() => {
                  localStorage.setItem('cartItems', JSON.stringify(items));
                  navigate('/ordercheckout');
                }}
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-indigo-100 disabled:bg-slate-100 disabled:shadow-none"
              >
                Checkout Now
              </button>
              
              <button onClick={() => navigate('/')} className="w-full mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors">
                Continue Browsing
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;