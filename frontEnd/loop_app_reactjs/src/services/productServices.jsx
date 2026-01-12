const API_URL = import.meta.env.VITE_API_URL;

const getAllproducts = async() =>{
    try{
        const response = await fetch(`${API_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json();
        return {res, status : response.status}
    }
    catch(err){
        throw err
    }
};
const getProductById = async (productId) => {
    try{
        const response = await fetch(`${API_URL}/product/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json();
        return {res, status : response.status}
    }
    catch(err){
        throw err
    }
};

const addProductCart = async (payload) =>{
    try{
        const response = await fetch(`${API_URL}/addCart`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({payload}),
            credentials : "include"
        });
        const res = await response.json();
        return {res, status : response.status}
    }
   catch(err){
        throw err
   }
};

const getCartitems = async () =>{
    try{
        const response = await fetch(`${API_URL}/cartItems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials :"include"
        });
        const res = await response.json();
        return {res,status : response.status}
    }
    catch(err){
        throw err
    }
};

const removeCartItem = async (cartItemId) => {
    try{
        const response = await fetch(`${API_URL}/removeCartItem`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cartItemId }),
            credentials : "include"
        });
        const res = await response.json();
        return {res, status : response.status}
    }
    catch(err){
        throw err
    }
}

const cartQuantityChange = async (userId, productId, quantity) => {
    const response = await fetch(`${API_URL}/updateCartItem`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
    });
    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }
    const updatedCartItem = await response.json();
    return updatedCartItem;
}

const addProductWishlist = async (payload) =>{
    try{
        const response = await fetch(`${API_URL}/addWishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials : "include"
        });
        const cartItem = await response.json();
        return {res: cartItem, status : response.status}
    }
    catch(err){
        throw err
    }
};

const removeWishlistItem = async (payload) => {
    try{
        const response = await fetch(`${API_URL}/addWishlist`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials : "include"
        });
        const cartItem = await response.json();
        return {res: cartItem, status : response.status}
    }
    catch(err){
        throw err
    }
};

const getWishlistitems = async (userId) =>{
    try{
        const response = await fetch(`${API_URL}/wishlistItems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials : "include"
        });
        const cartProducts = await response.json();
        return {res :cartProducts, status : response.status}
    }
    catch(err){
        throw err
    }
};



const productService = {
    getAllProducts: getAllproducts,
    getProductById: getProductById,
    addProductToCart: addProductCart,
    getCartitems: getCartitems,
    removeCartItem: removeCartItem,
    cartQuantityChange: cartQuantityChange,
    addProductWishlist:addProductWishlist,
    getWishlistitems: getWishlistitems,
    removeWishlistItem :removeWishlistItem 
    
};


export default productService;