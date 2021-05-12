const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/studentdb"

// connect to database
module.exports = function () {
    mongoose.connect((connectionString), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if(err) console.log({ err })
        else console.log("database connected")
})
}

