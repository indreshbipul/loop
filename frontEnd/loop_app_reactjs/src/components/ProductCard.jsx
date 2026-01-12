import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ variant }) {
  const navigate = useNavigate();
  const p = variant?.product || {};

  if (!variant) return null;

  return (
    <div 
      onClick={() => navigate(`/product/${p._id}/${variant?._id}`)}
      className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col"
    >
      {/* 1:1 Aspect Ratio Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={variant.imageUrl || "/fallback-image.png"}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
         
        />
        <div className="absolute bottom-2 left-2 flex gap-1">
          <span className="bg-slate-900/80 text-[8px] text-white px-1.5 py-0.5 rounded backdrop-blur-sm font-bold uppercase">
            {variant.size}
          </span>
          <span className="bg-white/90 text-[8px] text-slate-600 px-1.5 py-0.5 rounded backdrop-blur-sm font-bold uppercase shadow-sm border border-slate-100">
            {p.brand}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-[11px] font-bold text-slate-800 line-clamp-1 mb-0.5 group-hover:text-blue-600 transition-colors">
            {p.title}
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            {variant.color} Edition
          </p>
        </div>
        
        <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between">
          <span className="text-sm font-black text-slate-900">₹{variant.price}</span>
          {/* <button className="h-7 w-7 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;