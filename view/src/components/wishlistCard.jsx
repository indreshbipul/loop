import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productServices";
import useAuthHook from "../hooks/authHook";

function WishlistCard({ item, handelRemoveWishlist }) {
  const navigate = useNavigate();
  const { sessionData } = useAuthHook();
  const [isProcessing, setIsProcessing] = useState(false);

  const variant = item?.variantId;
  const product = variant?.productId;
  const userId = sessionData?.user?.id;

  const onRemove = (e) => {
    e.stopPropagation();
    setIsProcessing(true);
    handelRemoveWishlist(item._id);
  };

  const onAddToCart = async (e) => {
    e.stopPropagation();
    if (!userId) return navigate("/signin");

    setIsProcessing(true);
    try {
      await productService.addProductToCart({
        productId: product?._id,
        userId: userId,
        selectedVariant: variant?._id,
      });
      handelRemoveWishlist(item._id); 
    } catch (error) {
      console.error("Cart error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <article className="group bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg flex flex-col h-full max-w-full md:max-w-[280px] mx-auto w-full">
      
      {/* Smaller Visual Header */}
      <div className="relative aspect-square overflow-hidden bg-[#f8f8f8]">
        <img
          src={variant?.imageUrl}
          alt={product?.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Compact Badge */}
        <div className="absolute top-2 left-2">
           <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider text-slate-900 shadow-sm border border-slate-50">
             {variant?.size}
           </span>
        </div>

        {variant?.stock === 0 && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-[0.1em] shadow-sm border border-slate-100">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Compact Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3 flex-grow">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">
              {product?.brand}
            </p>
            <p className="text-xs font-bold text-slate-900">₹{variant?.price}</p>
          </div>
          <h2 className="text-sm font-medium text-slate-800 tracking-tight leading-tight truncate">
            {product?.title}
          </h2>
          <p className="text-[10px] text-slate-400 mt-1 italic">Color: {variant?.color}</p>
        </div>

        {/* Action Buttons: Tighter sizing */}
        <div className="flex gap-1.5 mt-2">
          <button
            type="button"
            disabled={variant?.stock === 0 || isProcessing}
            onClick={onAddToCart}
            className={`flex-grow flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${
              variant?.stock !== 0
                ? "bg-slate-900 text-white hover:bg-black active:scale-95"
                : "bg-slate-50 text-slate-300 cursor-not-allowed"
            }`}
          >
            {isProcessing ? (
              <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                {variant?.stock !== 0 ? "Bag" : "Out"}
              </>
            )}
          </button>

          <button
            onClick={onRemove}
            disabled={isProcessing}
            className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-colors border border-slate-50"
            aria-label="Remove"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default WishlistCard;