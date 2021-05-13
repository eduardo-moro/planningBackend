const mongoose = require('mongoose')
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

         let db = mongoose.connection;

        db.on("error", console.error.bind(console, "connection error:"));

        db.once("open", function() {
          console.log("Mongoose connection started");
        });
    }

}

module.exports = Database
