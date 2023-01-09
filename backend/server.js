require('dotenv').config()
const express = require('express')
const app = express()
const Port = process.env.PORT || 5000
const data = require('./data/dummy')
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoute')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')


//DataBase connection
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    res.send("API is Running")
})

//user route
app.use('/api/user', userRoutes)

//chat route
app.use('/api/chat', chatRoutes)
//message route
app.use("/api/message", messageRoutes)
app.use(notFound)
app.use(errorHandler)







const server = app.listen(Port, () => console.log(`Server running on port ${Port}`.cyan.bold))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));



    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            else
                socket.in(chat._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });

})
