const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/ErrorHandler')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000


//! To start the server use: npm run server
//connect to database
connectDB()

const app = new express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.json({"message": "Welcome to the api of support desk"})
})

// middlewares
app.use(errorHandler)

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// asyncHandler => simple middleware for handling exception inside of async express routes and passing them to your express error handlers 
// else done with .then() .catch