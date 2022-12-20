const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const messegeModel=mongoose.Schema(
    {
    sender:{type:ObjectId ,ref:"User"},
    content:{type:String ,trim:true},
    chat:{type:ObjectId ,ref:"Chat"}
    },
    {timestamps:true}
)

const Messege=mongoose.model("Messege",messegeModel)
module.exports=Messege