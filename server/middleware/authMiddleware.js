const jwt = require("jsonwebtoken");

const protect = (req,res,next) => {
    const token = req.headers['authorization'];

    // check if token exist 
    if(!token){
        return res.status(401).json({
            message:'No token, authorization denied'
        })
    }
    
    try{
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user to request
        req.user = decoded;

        next();
    }catch(err){
        res.status(403).json({
            message:"Token is not valid"
        });
    }
}

module.exports = protect;