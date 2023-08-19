const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/ErrorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const path = require('path');

//! To start the server use: npm run server
//connect to database
connectDB()

const app = new express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/api/users', require('./routes/userRoutes'))
// app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if(process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
    app.get('/', (_, res) => {
      res.status(200).json({"message": "Welcome to the api of support desk"})
    })
}


// middlewares
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// asyncHandler => simple middleware for handling exception inside of async express routes and passing them to your express error handlers 
// else done with .then() .catch