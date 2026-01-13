const productModel = require('../models/productModel');
const productVariantModel = require("../models/productVariantModel")

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productVariantModel.aggregate([
        {$lookup: {from: "products", localField: "productId", foreignField: "_id", as: "product"}},
        {$unwind: "$product" }, // convert array → object
        {$project: { _id: 1, price: 1, stock: 1, color: 1,size: 1, imageUrl: 1,
            "product._id": 1,
            "product.title": 1,
            "product.brand": 1,
            "product.category": 1,
            "product.images": 1
            }
        }
        ]);
        res.status(200).json({ products });
    } 
    catch (err) {
        res.status(500).json({ message: "Please try again after sometime" });
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    try {
        const product = await productModel.findById(productId).lean();
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const variants = await productVariantModel.find({productId: product._id}).lean();
        res.status(200).json({product: {...product, variants}});
    } 
    catch (err) {
        res.status(500).json({ message: "Please try again after Sometime" });
    }
};

exports.createProduct = ((req,res,next)=>{
    const {productName, description, category, price, quantity, image} = req.body;
    console.log('Creating product:', productName, description, category, price, quantity, image);
    const newProduct = new productModel({
        title: productName,
        description: description,
        price: price,
        category: category,
        imageUrl: image,
        stock: quantity
    });
    newProduct.save()
        .then(() => {
            console.log('Product created successfully'),
            res.status(201).json({
                message: 'Product created successfully',
                product: newProduct // This should be replaced with actual product data from the database
            });
        })
        .catch(err => {
            console.error('Error creating product:', err);
            res.status(500).json({ message: 'Error creating product' });
        });

});

exports.updateProduct = ((req,res,next)=>{
    const productId = req.params.id;
    const updatedProduct = req.body;
    res.status(200).json({
        message: `Product with ID ${productId} updated successfully`,
        product: updatedProduct 
    });
});

exports.deleteProduct = ((req,res,next)=>{
    const productId = req.params.id;
    res.status(200).json({
        message: `Product with ID ${productId} deleted successfully`
    });
});
