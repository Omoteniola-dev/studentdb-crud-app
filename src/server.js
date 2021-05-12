const express = require("express");
const Student = require("./models/student")
const studentRoutes = require("./routes/studentRoutes")
const app = express();
const dbSetup = require("./database/setup")
const port = process.env.PORT || 5000
//SETUP mongoose



app.use(express.json());

dbSetup()
app.use(studentRoutes)

app.listen(port, (err) => {
    if(err) console.log(err)
    else console.log(`Server running at port ${port}`)
})