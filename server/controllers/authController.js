const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.register = async(req, res) =>{
    try{
        const {email, password} = req.body;

        //chech if user already exists to prvent duplicate
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"user already exists"
            });
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(password,10);

        //create the user
        const newUser = new User({email, password:hashedPassword});
        await newUser.save();

        res.status(201).json({message:"User created Successfully"});


    }catch(error){
        res.status(500).json({error:error.message});
    }
};

exports.login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        // find user by email
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({
            message:"User not found"
        });

        // check password
        //compare the plain text password input with hash in the db
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        // generate token
        // token is valid for 1 hour. it contain the user Id.

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});

        res.json({
            token,
            user:{id:user._id , email:user.email}
        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
}