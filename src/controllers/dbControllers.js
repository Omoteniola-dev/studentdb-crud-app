const Student = require("../models/student")

exports.welcome = function (req, res) {
    if (res.status === 200) return res.send("Welcome to a Nodejs app")
}

exports.fetchStudents = function (req, res) {
    Student.find({}, (err, students) => {
        if(err) return res.status(500).json({ err })
        else return res.status(200).json({ students })
    })
}

exports.fetchStudentsByID = function (req, res) {
    Student.findById({_id: req.params.id}, (err, student) => {
        if(err) return res.status(500).json({ message: "ID does not exist", err})
        else return res.status(200).json({ student })
    })
}

exports.createNewStudent = function (req, res) {
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
}

exports.deleteStudentById = function (req, res) {
    Student.deleteOne({ _id: req.params.id }, (err) => {
        if(err) return res.status(500).json({ message: err });
        else return res.status(200).json({ message: `Student with id: ${req.params.id} deleted`})
    })
}

exports.deleteAllStudents = function (req, res) {
    Student.deleteMany({}, (err) => {
        if(err) return res.status(500).json({ message: err})
        else return res.status(200).json({ message: "Database cleared"})
    })
}

exports.updateStudentById = function  (req, res) {
    Student.updateOne({ name: req.body.name, email: req.body.email, country: req.body.country }, (err, student) => {
        if(err) return res.status(500).json({ message: err})
        else return res.status(200).json({ message: `Changed info of student with id: ${req.params.id}`, student })
    })
}