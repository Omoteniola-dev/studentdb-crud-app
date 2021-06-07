const express = require("express");
require("dotenv").config();
const Student = require("./models/student");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const dbSetup = require("./database/setup");
const port = process.env.PORT;
//SETUP mongoose

app.use(express.json());

dbSetup();
app.use(authRoutes);
app.use(studentRoutes);

app.listen(port, (err) => {
    if(err) console.log(err)
    else console.log(`Server running at port ${port}`)
})