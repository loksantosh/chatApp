const asyncHandler = require("express-async-handler")
const Messege = require('../Models/messegeModel')
const User = require('../Models/userModel')
const Chat = require('../Models/chatModel')


exports.sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }
    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Messege.create(newMessage);

        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message },{new:true});
        return res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


exports.allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Messege.find({ chat: req.params.chatId }).populate("sender", "name pic email")
            .populate("chat");

        return res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})