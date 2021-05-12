const express = require("express")
const router = express.Router()
const dbCtrl = require("../controllers/dbControllers")


router.get("/", dbCtrl.welcome)

//GET request to fetch the students in the database.
router.get("/students", dbCtrl.fetchStudents)

// GET request to fetch student by id
router.get("/students/:id", dbCtrl.fetchStudentsByID)

//POST request to add a new student.
router.post("/students", dbCtrl.createNewStudent)


// DELETE request to clear the database
router.delete("/students", dbCtrl.deleteAllStudents)


//DELETE request to delete student by id
router.delete("/students/:id", dbCtrl.deleteStudentById)

// PUT request to update the data created by ID
router.put("/students/:id", dbCtrl.updateStudentById)

module.exports = router;

