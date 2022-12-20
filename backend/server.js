require('dotenv').config()
const express = require('express')
const app = express()
const Port = process.env.PORT || 5000
const data = require('./data/dummy')
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes=require('./routes/userRoute')
const chatRoutes=require('./routes/chatRoutes')
const {notFound,errorHandler}=require('./middleware/errorMiddleware')


//DataBase connection
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', async (req, res) => {
    res.send("API is Running")
})

//user route
app.use('/api/user', userRoutes)

//chat route
app.use('/api/chat',chatRoutes)

app.use(notFound)
app.use(errorHandler)







app.listen(Port, () => console.log(`Server running on port ${Port}`.cyan.bold))
