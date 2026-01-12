import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import productService from "../services/productServices";
import Loader from "../components/Loader";
import useAuthHook from "../hooks/authHook";
import Fallback from "../components/Fallback";

function Product() {
  const [items, setItems] = useState(null);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const {setContext_Error} = useAuthHook()
  const [load, setLoad] = useState(false)
  const [fall, setFall] = useState(false)
  const [reload, setReload] = useState({})

  useEffect(() => {
    setLoad(true)
    productService.getAllProducts()
      .then(({res, status}) => {
        setLoad(false)
        if(status !== 200){
          setFall(true)
          return setContext_Error({req : "Get all product", message : res.message})
        }
        setItems(res.products)
      })
      .catch((err) => {
        setLoad(false)
        setFall(true)
        setContext_Error({req : "Get all product", message :"Please try again after Sometime"})
      });
  }, [reload]);

  // Derived Categories
  const categories = useMemo(() => 
    ["All", ...new Set(items?.map(i => i.product?.category))].filter(Boolean)
  , [items]);

  // Combined Filter and Sort Logic
  const filteredItems = useMemo(() => {
    if (!items) return [];
    
    return items
      .filter(i => (category === "All" || i.product?.category === category))
      .filter(i => i.product?.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [items, category, search, sort]);

  if (load) return <Loader />;
  if(fall) return <Fallback setReload = {setReload} />

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-4 md:p-8">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-slate-100 pb-6">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{filteredItems.length} Variants Available</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <input type="text" placeholder="Search..." className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none w-40"
              onChange={(e) => setSearch(e.target.value)}/>
            
            <select className="text-xs font-bold border-slate-200 rounded-lg bg-white px-2 py-1.5 outline-none cursor-pointer" 
                    onChange={(e) => setCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select className="text-xs font-bold border-slate-200 rounded-lg bg-white px-2 py-1.5 outline-none cursor-pointer" 
                    onChange={(e) => setSort(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low-High</option>
              <option value="price-desc">Price: High-Low</option>
            </select>
          </div>
        </div>

        {/* Product card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item._id} variant={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
            No items match your filters
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;