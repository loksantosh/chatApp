const asyncHandler = require("express-async-handler")
const User = require('../Models/userModel')
const generateToken = require('../config/generateToken')

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please Enter all the Fields")
    }

    const userExit = await User.findOne({ email })
    if (userExit) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({ name, email, password, pic })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Failed to register user")
    }
})


exports.authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        return res.send({
            _id: user.id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })

    }
    else {
        res.status(404)
        throw new Error("No user found")
    }

})


exports.allUsers = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}
    const users = await (await User.find((keyword)).find({ _id: { $ne: req.user._id } }))//except current logedIn user return all users which match
    return res.send(users)


})
