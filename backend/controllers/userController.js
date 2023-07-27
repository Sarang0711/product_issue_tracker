const asyncHandler = require('express-async-handler')

// @desc    Register a new user
// @route   /api/users
// @access  public
const userRegister = asyncHandler (async (req, res) => {
  const {name, email, password} = req.body
  

  //validation
  if(!name || !email || !password) {
    res.status(400)
    // return res.send("Please check again")
    throw new Error('Please include all fields')
  }
})

// @desc    Login a user
// @route   /api/users/login
// @access  public
const userLogin = asyncHandler (async (req, res) => {
  res.send('user login')
})

module.exports = {userRegister, userLogin}