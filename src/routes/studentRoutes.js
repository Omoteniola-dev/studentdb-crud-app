const express = require("express")
const router = express.Router()
const { welcome, fetchStudents, fetchStudentsByID, createNewStudent, deleteAllStudents, deleteStudentById, updateStudentById } = require("../controllers/dbControllers")
const { authenticateUser } = require("../middlewares/authentication");

// Welcome messageg
router.get("/", welcome);

//GET request to fetch the students in the database.
router.get("/students", authenticateUser, fetchStudents);

// GET request to fetch student by id
router.get("/students/:id", authenticateUser, fetchStudentsByID);

//POST request to add a new student.
router.post("/students", createNewStudent);


// DELETE request to clear the database
router.delete("/students", authenticateUser, deleteAllStudents);


//DELETE request to delete student by id
router.delete("/students/:id", authenticateUser, deleteStudentById);

// PUT request to update the data created by ID
router.put("/students/:id", authenticateUser, updateStudentById);

module.exports = router;

