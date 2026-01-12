import React, { useState } from "react";
import useAuthHook from "../hooks/authHook";
import productService from "../services/productServices";

function CartCard({ product: item, removeCartItem }) {
  const {sessionData, setContext_Error } = useAuthHook();
  const [loading, setLoading] = useState(false);
  const variant = item?.variantId || {};
  const productInfo = variant?.productId || {};

  if (!item || !variant._id) return null;

  const handleRemove = () => {
    setLoading(true);
    removeCartItem(item?._id)
  };

  const handleQty = (e) => {
    const inputVal = parseInt(e.target.value) || 1;
    const validatedQty = Math.max(1, Math.min(variant.stock, inputVal));
    
    productService.cartQuantityChange(userData?.user?._id, item._id, validatedQty)
      .then(() => refresh([]));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-5 rounded-[2rem] border border-slate-100 group transition-all hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5">
      
      {/* Image Container */}
      <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-slate-50">
        <img
          src={variant.imageUrl}
          alt={productInfo.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <div className="mb-2">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">
            {productInfo.brand}
          </p>
          <h3 className="text-base font-bold text-slate-900 truncate leading-tight uppercase tracking-tight">
            {productInfo.title}
          </h3>
        </div>

        <div className="flex justify-center sm:justify-start gap-3 mb-4">
          <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded-md">{variant.color}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded-md">{variant.size}</span>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-6">
          <p className="font-black text-slate-900 text-sm">₹{variant.price.toLocaleString()}</p>
          
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
              <span className="text-[8px] font-black text-slate-300 uppercase">Qty</span>
              <input
                type="number"
                min="1"
                max={variant.stock}
                value={item.quantity}
                onChange={handleQty}
                className="w-8 bg-transparent text-xs font-bold text-slate-900 outline-none text-center"
              />
            </div>
            {item.quantity >= variant.stock && (
               <p className="text-[7px] text-orange-500 font-bold uppercase pl-2">Max Limit Reached</p>
            )}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="p-4 rounded-full text-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
      >
        {loading ? (
          <div className="h-4 w-4 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default CartCard;