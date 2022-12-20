
const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
require('dotenv').config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true
        })
        console.log(`MongoDb connected : ${conn.connection.host}`.yellow.underline);

    } catch (error) {
        console.log(error.messege)
    }
}

module.exports = connectDB