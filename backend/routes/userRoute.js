const express = require('express')
const router = express.Router()
const { registerUser, authUser, allUsers }=require('../Controllers/userController')
const {protect}=require("../middleware/authMiddleware")

router.route('/').post(registerUser).get(protect, allUsers) //used to chain routes
router.route('/login').post(authUser)



module.exports = router;