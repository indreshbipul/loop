import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import authServices from "../services/authServices.jsx";
import productService from "../services/productServices.jsx";
import useAuthHook from "../hooks/authHook.jsx";
import Loader from "../components/Loader";

function ProductDetail() {
  const { productId, varientId } = useParams();
  const navigate = useNavigate();
  const { setSessionData, setContext_Error } = useAuthHook();
  const [product, setProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  useEffect(() => {
    productService.getProductById(productId)
      .then(({res, status}) => {
        if (status !== 200){
          return setContext_Error({req : "Get all product", message : res.message})
        }
        setProduct(res.product);
        setSelectedVariantId(varientId);
      })
      .catch((err) => setContext_Error({req : "Get product details", message : "Please try again after sometime" }));
  }, [productId]);

  // Derived Data: Currently selected variant object
  const selectedVariant = useMemo(() => {
    return product?.variants?.find(v => v._id === selectedVariantId);
  }, [product, selectedVariantId]);

  // Derived Data: Unique color options for the UI circles
  const colorOptions = useMemo(() => {
    const seen = new Set();
    return product?.variants?.filter(v => {
      if (!seen.has(v.color)) {
        seen.add(v.color);
        return true;
      }
      return false;
    }) || [];
  }, [product]);

  // Derived Data: Size options for the currently selected color
  const sizeOptions = useMemo(() => {
    return product?.variants?.filter(v => v.color === selectedVariant?.color) || [];
  }, [product, selectedVariant?.color]);

  if (!product || !selectedVariant) return <Loader />;

  const handleColorChange = (color) => {
    // When color changes, find the first variant with that color
    const firstOfColor = product.variants.find(v => v.color === color);
    setSelectedVariantId(firstOfColor._id);
  };

  const handleAddToCart = () => {
    setLoadingCart(true);
    productService.addProductToCart({variantId : selectedVariantId, priceAtAdd :selectedVariant?.price })
      .then(({ res, status }) => {
        setLoadingCart(false);
        if (status === 401) {
          authServices.userLogout();
          setSessionData(null);
          navigate('/signin');
        } else if (status !== 200) {
          setContext_Error({ req: "add to cart", message: res.message });
        }
      })
      .catch(() => {
        setLoadingCart(false);
        setContext_Error({ req: "add to cart", message: "Error adding to cart" });
      });
  };

  const handleWishlist = () => {
    setLoadingCart(true);
    productService.addProductWishlist({variantId : selectedVariantId})
      .then(({ res, status }) => {
        setLoadingCart(false);
        if (status === 401) {
          authServices.userLogout();
          setSessionData(null);
          navigate('/signin');
        } else if (status !== 200) {
          setContext_Error({ req: "add to Wishlist", message: res.message });
        }
      })
      .catch(() => {
        setLoadingCart(false);
        setContext_Error({ req: "add to Wishlist", message: "Error adding to cart" });
      });
  };


  return (
    <div className="min-h-screen p-4 md:p-12 bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="md:w-1/2 p-8 bg-slate-50/50">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-100">
              <img 
                src={selectedVariant.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{product.brand}</span>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{product.title}</h1>
            <p className="text-3xl font-black text-slate-900 mb-6">₹{selectedVariant.price}</p>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Available Colors</h3>
              <div className="flex gap-3">
                {colorOptions.map((v) => (
                  <button
                    key={v._id}
                    onClick={() => handleColorChange(v.color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedVariant.color === v.color ? "border-blue-600 ring-2 ring-blue-100 scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: v.color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-10">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((v) => (
                  <button
                    key={v._id}
                    onClick={() => setSelectedVariantId(v._id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedVariantId === v._id 
                      ? "bg-slate-900 text-white border-slate-900" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                disabled={selectedVariant.stock === 0 || loadingCart}
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-blue-600 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-slate-200 disabled:shadow-none"
              >
                {selectedVariant.stock > 0 ? (loadingCart ? "Adding..." : "Add to Cart") : "Out of Stock"}
              </button>
              
              <button
                onClick={handleWishlist}
                className="w-14 h-14 border border-slate-200 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all"
              >
                {loadingWishlist ? "..." : "❤"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;