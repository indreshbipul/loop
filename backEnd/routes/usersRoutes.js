const usersController = require('../controllers/usersController');
const authCheck = require('../middleware/authCheck')
const express = require('express');
const usersrouter = express.Router();


usersrouter.put('/profileupdate', authCheck,usersController.updateUser);
usersrouter.put('/addCart', authCheck, usersController.addToCart);
usersrouter.get('/cartItems', authCheck, usersController.getCartItems);
usersrouter.delete('/removeCartItem', authCheck, usersController.removeFromCart);
usersrouter.post('/addWishlist', authCheck, usersController.addToWishlist);
usersrouter.get('/wishlistItems', authCheck,usersController.getWishlistItems);
usersrouter.delete('/removeWishlistItem',authCheck, usersController.removeFromWishlist);


//this will be used only for admin panel to manage users
usersrouter.get('/userall', usersController.getAllUsers);
usersrouter.get('/loggedinUserdata/:id', usersController.getLoggedinUser);
//this will be used for deleting user in admin panel as well as for user profile page
usersrouter.delete('/user/:id', usersController.deleteUser);
usersrouter.put('/updateCartItem', usersController.handelCartQuantity);



module.exports = usersrouter;