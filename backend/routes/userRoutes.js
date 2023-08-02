const express = require('express')
const {userRegister, userLogin, getInfo} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', userRegister)

router.post('/login', userLogin)

router.get('/me', protect, getInfo)

// We want to use protect middleware in /me route hence given as 2nd argument

module.exports = router;