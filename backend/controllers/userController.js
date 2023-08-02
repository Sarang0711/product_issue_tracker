const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
//? bcrypt => For hashing a password
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc    Register a new user
// @route   /api/users
// @access  public
const userRegister = asyncHandler (async (req, res) => {
  const {name, email, password} = req.body
  
  //* validation
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  
  //* Check if user already exists
  let userExists = await User.findOne({email: email})
  if(userExists) {
    console.log('error occurred')
    throw new Error('User already exists')
  }

  //* Hashing the password
  // @param no of rounds to use, default is 10
  // @return  Promise with resulting salt, 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // * Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })
  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }
  else {
    res.status(400);
    throw new Error('Invalid user data')
  }
})

// @desc    Login a user
// @route   /api/users/login
// @access  public
const userLogin = asyncHandler (async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email})

  //* Check whether the password match
  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }
  else {
    res.status(401);
    throw new Error('Invalid credentials')
  }

})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

//* Creating a protected route
const getInfo = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user)
})

module.exports = {userRegister, userLogin, getInfo}