const express = require('express')
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

// We want to use protect middleware in /me route hence given as 2nd argument

module.exports = router;