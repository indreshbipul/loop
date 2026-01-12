const jwt =  require("jsonwebtoken")

const generateToken = (data)=>{
    try{
        const token = jwt.sign(data, process.env.jwt_secrate,{expiresIn: "7d"})
        return token
    }
    catch(err){
        throw err
    }
}

module.exports = generateToken