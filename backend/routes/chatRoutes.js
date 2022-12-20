const express = require('express')
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup }=require("../Controllers/chatControllers")
//fetch Chats
router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChat)
//create group
router.route('/group').post(protect, createGroupChat)
//rename group
router.route('/rename').put(protect, renameGroup)
//remove from group
router.route('/groupremove').put(protect, removeFromGroup)
//add to group
router.route('/groupadd').put(protect, addToGroup)

module.exports=router