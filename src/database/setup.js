const mongoose = require("mongoose");
const connectionString = "mongodb+srv://devten10la:devten10la@studentcluster.qxb3g.mongodb.net/students?retryWrites=true&w=majority"

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

