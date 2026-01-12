import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistCard from "../components/wishlistCard.jsx";
import Fallback from "../components/Fallback.jsx";
import productService from "../services/productServices.jsx";
import useAuthHook from "../hooks/authHook.jsx";
import authService from "../services/authServices.jsx";
import Loader from "../components/Loader.jsx";

function Wishlist() {
  const { sessionData, useSessionData, setContext_Error, setSessionData } = useAuthHook();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchWishlist = () => {
    setLoading(true);
    productService.getWishlistitems()
    .then(({res, status})=>{
        setLoading(false)
        if(status ===400){
            authService.userLogout()
            useSessionData(null)
            navigate('/signin')               
        }
        if(status !== 200){
            setContext_Error({req : "wishlist Context" , message : res.message})
        }
        setWishlistItems(res.items)
    })
    .catch(()=>{
        setLoading(false)
        setContext_Error({req : "wishlist Context" , message : "Please try again after sometime"})
    })
  };

  useEffect(() => {
    if (sessionData?.user) fetchWishlist();
    else setLoading(false);
  }, [sessionData]);

  const handelRemoveWishlist = (id) => {
    productService.removeWishlistItem(id)
      .then(({ res, status }) => {
        if (status === 401) {
          authService.userLogout();
          setSessionData(null);
          navigate('/');
          return;
        }
        if (status !== 200) throw new Error(res.message);
        
        setWishlistItems(prev => prev.filter(item => item._id !== id));
      })
      .catch((err) => {
        setContext_Error({ req: "wishlist", message: err.message || "Failed to remove item" });
      });
  };

  if (loading) return (<Loader /> );

  if (error) return <Fallback message={error} onRetry={fetchWishlist} />;

  return (
    <div className=" selection:bg-black selection:text-white">
      <main className="max-w-[1440px] mx-auto px-6 py-10 md:px-12 lg:py-4">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-5 border-b border-slate-100 pb-10">
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-serif italic text-slate-900 tracking-tighter">Wishlist</h1>
          </div>
          <div className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-4 md:mt-0">
            {wishlistItems.length} Curated Pieces
          </div>
        </header>

        {/* Product Grid */}
        {wishlistItems.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-4">
            {wishlistItems.map((item) => (
              <WishlistCard 
                key={item._id} 
                item={item} 
                handelRemoveWishlist={() => handelRemoveWishlist(item._id)} 
              />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-px h-12 bg-slate-200 mb-8" />
            <h2 className="text-xl font-light text-slate-500 tracking-tight mb-8">
              Your collection is currently empty.
            </h2>
            <button
              onClick={() => navigate("/product")}
              className="group relative px-12 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all shadow-xl hover:shadow-slate-200"
            >
              <span className="relative z-10">Explore Items</span>
              <div className="absolute inset-0 bg-slate-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Wishlist;