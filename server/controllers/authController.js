// external imports
const {validationResult, check} = require('express-validator');

// local imports
const UserModel = require('../models/usersModel');
const tokenGen = require('../utils/tokenGen');
const usersModel = require('../models/usersModel');

exports.login= async (req,res,next)=>{
   const {email, password} = req.body;
   if(!email || !password) {
       return res.status(400).json({ error: 'Email and password are required' });
   }
   try{
        const user = await UserModel.findOne({ email: email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
        }
        const stateUpdate = await usersModel.updateOne(({"_id" : user._id},{$set :{isLoggedIn : true}}))
        const token = tokenGen({data : user._id})
        res.cookie("sid", token, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({message : "User Logged In sucessfully", 
            data :{email : user.email, firstName : user.firstName}
        })
   }
   catch(err){
    console.log(err)
        return res.status(500).json({message : "Please try again aftre Sometime"})
   }
};

exports.logout= (async(req,res,next)=>{
    const userId = req.user
    if(!userId){
        return res.status(401).json({message : 'Unauthorized'})
    }
    try{
        const User = await UserModel.findOne({"_id" : userId}).select("isLoggedIn")
        if(!User || !User.isLoggedIn){
            return res.status(401).json({message : "Session Expired"})
        }
        await UserModel.updateOne({ _id: userId },
            { $set: { isLoggedIn: false } })
        res.clearCookie("sid",{ httpOnly: true, secure: true, sameSite: 'none'})
        return res.status(200).json({ message: "Logged out successfully" })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Please try again aftre Sometime"})
    }
   
});

exports.register= [
    check('firstName')
        .trim()
        .isLength({ min: 3 })
        .withMessage('First name must be at least 2 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('First name should only contain alphabets'),
    check('lastName')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 2 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Last name should only contain alphabets'),
    check('gender')
        .notEmpty()
        .withMessage('User Gender is required')
        .isIn(["male", "female", "other"]),
    check('email')
        .isEmail()
        .withMessage('Invalid email format'),
    check('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[@!#&*%$]/)
        .withMessage('Password must contain at least one special character (@!#&*%$)'),
    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            }),
    check('mobile')
        .matches(/^[6-9]\d{9}$/)
        .withMessage('Invalid Mobile number'),


    async (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message : errors.array()?.[0].msg});
        }
        const { firstName, lastName, gender, email, password, mobile } = req.body;
        const newUser = new UserModel({
            firstName,
            lastName,
            gender,
            email,
            password, 
            mobile,
        });
        newUser.save()
            .then(() => {
                return res.status(201).json({ message: 'User registered successfully' });
            })
            .catch(err => {
                if(err.code === 11000){
                    if(err.keyPattern?.email){
                        return res.status(409).json({message : "Email Id already Exists"})
                    }
                    if(err.keyPattern?.mobile){
                        return res.status(409).json({message : "Mobile Number already Exists"})
                    }
                }
                return res.status(500).json({message :"Please Try again after Sometime"});
            });
   
}]; 

exports.getProfile= (async(req,res,next)=>{
    const userId = req.user
    if(!userId){
        return res.status(401).json({message : "Unauthorized"})
    }
    try{
        const User = await UserModel.findOne({"_id" : userId}).select("-password -__v -_id" )
        if(!User){
            return res.status(401).json({message : "User Not Found"})
        }
        if(!User.isLoggedIn){
            return res.status(401).json({message: "Session Expired, !relogin"});
        }
        return res.status(200).json({message : "User", data : {
            firstName : User.firstName,
            lastName : User.lastName,
            email : User.email,
            mobile : User.mobile,
            gender : User.gender
        }})
    }
    catch(err){
        return res.status(500).json({message : "Please try again aftre sometime"})
    }
});

exports.loginSession = (async(req, res, next) => {
    const userId = req.user;
    if(!userId){
        return res.status(401).json({message : "Unauthorized"})
    }
    try{
        const User = await UserModel.findOne({"_id" : userId}).select("-_id -password -__v")
        if(!User){
            return res.status(401).json({message: "User no longer exists"});
        }
        if(!User.isLoggedIn){
            return res.status(401).json({message: "Session Expired, !relogin"});
        }
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private")
        res.setHeader("Pragma", "no-cache")
        res.setHeader("Expires", "0")
        return res.status(200).json({message : "User Found", data :{
            email : User.email,
            firstName : User.firstName
        }})
    }
    catch(err){
        return res.status(500).json({message : "Please try again aftre sometime"})
    }
});

