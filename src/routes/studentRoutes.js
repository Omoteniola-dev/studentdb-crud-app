const express = require("express")
const router = express.Router()
const { welcome, fetchStudents, fetchStudentsByID, createNewStudent, deleteAllStudents, deleteStudentById, updateStudentById } = require("../controllers/dbControllers")

// Welcome message
router.get("/", welcome)

//GET request to fetch the students in the database.
router.get("/students", fetchStudents)

// GET request to fetch student by id
router.get("/students/:id", fetchStudentsByID)

//POST request to add a new student.
router.post("/students", createNewStudent)


// DELETE request to clear the database
router.delete("/students", deleteAllStudents)


//DELETE request to delete student by id
router.delete("/students/:id", deleteStudentById)

// PUT request to update the data created by ID
router.put("/students/:id", updateStudentById)

module.exports = router;

