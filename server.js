const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { Schema } = mongoose;
const connectionString = "mongodb://localhost:27017/studentdb"


app.use(express.json());

// connect to database
mongoose.connect((connectionString), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) console.log({ err })
    else console.log("database connected")
})

// create a schema for the student.
const studentSchema = new Schema({
    name: String,
    email: String,
    country: String
})

const Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res) => {
    res.send("Welcome to a Nodejs app")
})

//GET request to fetch the students in the database.
app.get("/students", (req, res) => {
    Student.find({}, (err, students) => {
        if(err) return res.status(500).json({ err })
        else return res.status(200).json({ students })
    })
})

// GET request to fetch student by id
app.get("/students/:id", (req, res) => {
    Student.findById({_id: req.params.id}, (err, student) => {
        if(err) return res.status(500).json({ message: err })
        else return res.status(200).json({ student })
    })
})

//POST request to add a new student.
app.post("/students", (req, res) => {
    //create a new student data and save to database
    Student.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, newStudent) => {
        if(err) return res.status(500).json({ message: err })
        else {
            return res.status(200).json({ message: "new student added", newStudent })
        }
    })
})


// DELETE request to clear the database
app.delete("/students", (req, res) => {
    Student.deleteMany({}, (err) => {
        if(err) return res.status(500).json({ message: err})
        else return res.status(200).json({ message: "Database cleared"})
    })
})


//DELETE request to delete student by id
app.delete("/students/:id", (req, res) => {
    Student.deleteOne({ _id: req.params.id }, (err) => {
        if(err) return res.status(500).json({ message: err });
        else return res.status(200).json({ message: `Student with id: ${req.params.id} deleted`})
    })
})

// PUT request to update the data created by ID
app.put("/students/:id", (req, res) => {
    Student.updateOne({ name: req.body.name, email: req.body.email, country: req.body.country }, (err, student) => {
        if(err) return res.status(500).json({ message: err})
        else return res.status(200).json({ message: `Changed info of student with id: ${req.params.id}`, student })
    })
})


const port = 4000

app.listen(port)