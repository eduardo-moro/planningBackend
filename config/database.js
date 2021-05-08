const mongoose = require('mongoose')
let client
require("dotenv").config();


class Database
{
     constructor() {
         mongoose.connect(process.env.MONGO_DEV_URI, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true,
         }).then(
             () => console.log("Database connected successfully")
         ).catch(
             err => console.log(err)
         );

    }
}

module.exports = new Database()
