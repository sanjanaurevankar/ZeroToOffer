const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");


const generateToken = (userId) =>{
    return jwt.sign({id : userId},process.env.JWT_SECRET,{expiresIn:"7d"});
};

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
    
    const existingUser = await User.findOne({email}); 
    if (existingUser){
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    });
    const token = generateToken(user._id);

    res.status(200).json({
        message : "User registered succesfully",
        token,
        user: { id: user._id, name: user.name, email: user.email },
    });
    });

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 400);
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message: "Login Successful",
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(200).json(user);
});

module.exports = { registerUser, loginUser, getCurrentUser }; 


