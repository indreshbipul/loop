const jwt = require('jsonwebtoken')

const authChecks = (req,res,next)=>{
    const token = req.cookies.sid
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    try{
        const decrypt = jwt.verify(token,process.env.jwt_secrate)
        req.user = decrypt.data
        next()
    }
    catch(err){
        return res.status(401).json({mesage : "Unauthorized"})
    }
}

module.exports = authChecks