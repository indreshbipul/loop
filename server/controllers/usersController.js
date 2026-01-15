const UserModel = require('../models/usersModel');
const CartModel = require('../models/cartModel')
const CartItemModel = require('../models/cartItemsModel')
const productData = require('../models/productModel');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const productVarientModel = require('../models/productVariantModel');
const WishlistModel = require('../models/wishlistModel')

exports.getAllUsers = ((req, res, next) => {
    res.status(200).json({
        message: 'List of all users',
        users: [] // This should be replaced with actual user data from the database
    });
});

exports.getLoggedinUser = (async (req, res, next) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId)
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            cart: user.cart,
            wishlist: user.wishlist,
            email: user.email,
            mobile: user.mobile,         
    });
    
})

exports.updateUser = async (req, res) => {
  const userId = req.user;
  const updates = req.body;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if(!updates){
    return res.status(400).json({message:""})
  }
  const allowedUpdates = ["firstName", "lastName", "gender", "mobile"];
  const updateData = {};

  allowedUpdates.forEach((field) => {
    if (updates[field] !== undefined && updates[field] !== "") {
        updateData[field] = updates[field];
    }});

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
    }
  try {
    const User = await UserModel.findByIdAndUpdate(userId,
        { $set: updateData },
        { new: true, runValidators: true }).select("-password -__v ");

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message: "Profile updated",data : {
            firstName : User.firstName,
            lastName : User.lastName,
            email : User.email,
            mobile : User.mobile,
            gender : User.gender
        }});

  } 
  catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Mobile or email already exists" });
    }
    res.status(500).json({ message: "Please try again later" });
  }
};


exports.deleteUser = ((req, res, next) => {
    const userId = req.params.id;
    res.status(200).json({
        message: `User with ID ${userId} deleted successfully`
    });
});

exports.addToCart = async (req, res, next) => {
    async function getCart(cartId){
        const cartItm = await CartItemModel.find({cartId}).populate({
            path : "variantId",
            select : "color size price stock imageUrl productId",
            populate : {
                path : "productId",
                select : "title brand "
                }
        })  
        if(!cartItm){
            return
        }
        const response = cartItm.map(item => ({
            cartItemId: item._id,
            quantity: item.quantity,
            price: item.priceAtAdd,
            stock: item.variantId.stock,
            variant: {
                variantId : item.variantId._id,
                color: item.variantId.color,
                size: item.variantId.size,
                image: item.variantId.imageUrl
            },
            product: {
                id: item.variantId.productId._id,
                title: item.variantId.productId.title,
                brand: item.variantId.productId.brand
        }
        }));  
        return response         
    }

    const userId = req.user
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const {variantId}  = req.body.payload
    if (!variantId) {
      return res.status(400).json({ message: 'Product not found' });
    }
    try {
        const Variant = await productVarientModel.findById(variantId).select("price stock")
        if(!Variant || Variant.stock <= 0){
            return res.status(400).json({ message: 'Product is out of Stock' });
        }
        const priceAtAdd = Variant.price
        const stock = Variant.stock
        let cart = await CartModel.findOne({userId : userId, status : "active"})
        if(!cart){
            cart = await CartModel.create({userId})
            if(!cart){
                return res.status(500).json({ message: 'Plaease try again later' });
            }            
        }
        const cartId = cart._id
        const CartItem = await CartItemModel.findOne({cartId : cartId, variantId: variantId})
        if(!CartItem){
            await CartItemModel.create({
                cartId : cartId,
                variantId : variantId,
                priceAtAdd : priceAtAdd
            })
            return res.status(200).json({message : "Cart updated Sucessfully", CartItem : await getCart(cartId) || []})  
        }
        if(CartItem.quantity > stock){
            CartItem.quantity = stock
            CartItem.priceAtAdd  = priceAtAdd
            await CartItem.save() 
            return res.status(409).json({message : `Only ${stock} items available in Stock`, CartItem : await getCart(cartId) || []})
        }
        if(CartItem.quantity +1 > stock){
            return res.status(409).json({message : `Only ${stock} items available in Stock`, CartItem : await getCart(cartId) || []})
        }
        CartItem.quantity += 1
        CartItem.priceAtAdd  = priceAtAdd
        await CartItem.save()  
        return res.status(200).json({message : "Cart updated Sucessfully", CartItem : await getCart(cartId) || []})                 
  } 
  catch (err) {
    return res.status(500).json({ message: 'Please try again later' });
  }
};

exports.removeFromCart = async (req, res) => {
    async function getCart(cartId){
        const cartItm = await CartItemModel.find({cartId}).populate({
            path : "variantId",
            select : "color size price stock imageUrl productId",
            populate : {
                path : "productId",
                select : "title brand "
                }
        })  
        if(!cartItm){
            return
        }
        const response = cartItm.map(item => ({
            cartItemId: item._id,
            quantity: item.quantity,
            price: item.priceAtAdd,
            stock: item.variantId.stock,
            variant: {
                variantId : item.variantId._id,
                color: item.variantId.color,
                size: item.variantId.size,
                image: item.variantId.imageUrl
            },
            product: {
                id: item.variantId.productId._id,
                title: item.variantId.productId.title,
                brand: item.variantId.productId.brand
        }
        }));  
        return response         
    }

    const userId = req.user;
    const { cartItemId } = req.body;
    if (!cartItemId){
        return res.status(404).json({ message: "Invalid request", CartItem : await getCart(cart._id) });
    }
    try {
        const cart = await CartModel.findOne({ userId, status: "active" });
        if (!cart) return res.status(200).json({ CartItem: [] });

        const result = await CartItemModel.deleteOne({_id: cartItemId, cartId: cart._id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Item not found in your cart", CartItem : await getCart(cart._id) });
        }
        return res.status(200).json({ message: "Item removed", CartItem : await getCart(cart._id) });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Please try again later' });
    }
};


exports.getCartItems = async (req, res, next) => {
    const userId  = req.user;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const Cart = await CartModel.findOne({userId, status: "active"}).select("_id");
        if (!Cart) {
            return res.status(200).json({ items: [] });
        }
        const cartId = Cart._id
        const items = await CartItemModel.find({cartId}).populate({
            path: "variantId",
            select: "color size price stock imageUrl productId",
            populate: {path: "productId",select: "title brand"}
        }).select(" -__v -createdAt -updatedAt -cartId")
        if (!items) {
            return res.status(200).json({ items: [] });
        }
        const stockModified = []
        const priceModified = []
        for (let item of items) {
            const liveStock = item.variantId.stock;
            const livePrice = item.variantId.price;
            
            if (item.quantity > liveStock) {
                item.quantity = liveStock;
                await item.save();
                stockModified.push(item.variantId.productId.title);
            }
            if (item.priceAtAdd !== livePrice) {
                item.priceAtAdd = livePrice;
                await item.save();
                priceModified.push(item.variantId.productId.title);
            }
        }
        const response = items.map(item => ({
            cartItemId: item._id,
            quantity: item.quantity,
            price: item.priceAtAdd,
            stock: item.variantId.stock,
            variant: {
                variantId : item.variantId._id,
                color: item.variantId.color,
                size: item.variantId.size,
                image: item.variantId.imageUrl
            },
            product: {
                id: item.variantId.productId._id,
                title: item.variantId.productId.title,
                brand: item.variantId.productId.brand
            }
        }));
        if (stockModified.length > 0 || priceModified.length > 0) {
            return res.status(200).json({CartItem : response, stockModified, priceModified})
        }
        return res.status(200).json({CartItem : response })

    }
    catch(err){
        return res.status(500).json({ message: 'Please try again later' });
    }
}

exports.handelCartQuantity = async (req, res, next) => {
    const userId = req.user
    if(!userId){
        return res.status(401).json({message : "Unauthorized"})
    }
    const {productId, quantity } = req.body;
    if(!productId){
        return res.status(404).json({message : "Product Not Found"})
    }
    try{
        const product = await productModel.findOne()
        const cart = await cartModel.findOne({userId, status : "active"})
        if(!cart){
            return res.status(500).json({message : "Please try again later"})
        }
    }
    catch(err){
        return res.status(500).json({message : "Please try again later"})        
    }

   
}

exports.addToWishlist = async (req, res, next) => { 
    async function getWishlist(userId) {
        const wishlist = await WishlistModel.find({ userId }).populate({
            path: "variantId",
            select: "productId color size price imageUrl stock",
            populate: { path: "productId", select: "title brand" }
            });

        const response = wishlist.map(item => ({
            price: item.variantId.price,
            stock: item.variantId.stock,
            variant: {
                variantId : item.variantId._id,
                color: item.variantId.color,
                size: item.variantId.size,
                image: item.variantId.imageUrl
            },
            product: {
                id: item.variantId.productId._id,
                title: item.variantId.productId.title,
                brand: item.variantId.productId.brand
            }
        }))
        return response || [];
    }

    const userId = req.user
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const {variantId } = req.body
    if (!variantId) {
      return res.status(400).json({ message: "Invailid request" });
    }
    try {
        const adding = await WishlistModel.create({userId,variantId})
        if(adding){
            return res.status(200).json({message : "added sucessfully", items : await getWishlist(userId)})
        }
    } 
    catch (err) {
        if(err.code === 11000){
            return res.status(200).json({message : "wishlist already have this item", items : await getWishlist(userId)})
        }
        return res.status(500).json({ message: 'please try again after Sometime' });
    }
};

exports.getWishlistItems = async (req, res, next) => {
    const userId = req.user
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const Wishlist = await WishlistModel.find({userId}).populate({
            path : "variantId",
            select : "productId color size price imageUrl stock",
            populate :{path : "productId", select : "title brand"}
        }).select("-__v -createdAt -updatedAt -userId")
        if (Wishlist.length === 0){
            return res.status(200).json({ items: [] });
        }
        const response = Wishlist.map(item => ({
            price: item.variantId.price,
            stock: item.variantId.stock,
            variant: {
                variantId : item.variantId._id,
                color: item.variantId.color,
                size: item.variantId.size,
                image: item.variantId.imageUrl
            },
            product: {
                id: item.variantId.productId._id,
                title: item.variantId.productId.title,
                brand: item.variantId.productId.brand
            }
        }))
        return res.status(200).json({ items : response});
    }
    catch(err){
        return res.status(500).json({ message: 'please try again after Sometime' });
    }
}

exports.removeFromWishlist = async(req,res,next) =>{
    async function getWishlist(userId) {
        const wishlist = await WishlistModel.find({ userId }).select("-userId ").populate({
            path: "variantId",
            select: "productId color size price imageUrl stock",
            populate: { path: "productId", select: "title brand" }
            });
        
        const response = wishlist.map(item => ({
            price: item.variantId.price,
            stock: item.variantId.stock,
            variant: {
                variantId : item.variantId._id,
                color: item.variantId.color,
                size: item.variantId.size,
                image: item.variantId.imageUrl
            },
            product: {
                id: item.variantId.productId._id,
                title: item.variantId.productId.title,
                brand: item.variantId.productId.brand
            }
        }))
        return response || [];
    }

    const userId = req.user
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const {variantId } = req.body
    if (!variantId) {
      return res.status(404).json({ message: "Invailid request", items : await getWishlist(userId) });
    }
    try {
        const removed = await WishlistModel.findOneAndDelete({userId,variantId})
        if(removed){
            return res.status(200).json({message : "removed sucessfully", items : await getWishlist(userId)})
        }
        return res.status(200).json({ message: "item was not in wishlist", items : await getWishlist(userId) })
    } 
    catch (err) {
        return res.status(500).json({ message: 'please try again after Sometime' });
    }
}