const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User =  require('../models/userModel');

const protect = asyncHandler(async(req, res, next) => {
  let token;
  //* The token is send in the format Bearer fdadjjdftoken 
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from number
      token = req.headers.authorization.split(' ')[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')
      if (!req.user) {
        res.status(401)
        throw new Error('Not authorized')
      }
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }

  }
  if(!token) {
    res.status(401)
    throw new Error('Not authorized')
  }

})

module.exports = {protect}