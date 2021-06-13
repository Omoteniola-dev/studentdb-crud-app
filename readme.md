# Documentation of the routes in the studentdb-crud-app

# Github link:
https://github.com/Omoteniola-dev/studentdb-crud-app

# Hosted link
https://studentdb-crud-app.herokuapp.com/

# Routes

# GET request to preview the url
### router.get("/", welcome)
    parameters: 
        endpoint
        callback function
    returns:
        Text

# GET request to fetch the students in the database.
### router.get("/students", fetchStudents)
    parameters:
        endpoint,
        callback function
    returns:
        Object

# GET request to fetch student by id
### router.get("/students/:id", fetchStudentsByID)
    parameters:
        endpoint,
        callback function
    returns:
        Object

# POST request to add a new student.
### router.post("/students", createNewStudent)
    parameters:
        endpoint,
        callback function
    returns:
        Object || error message

# DELETE request to clear the database
### router.delete("/students", deleteAllStudents)
    parameters:
        endpoint,
        callback function
    returns:
        Text || error message

# DELETE request to delete student by id
### router.delete("/students/:id", deleteStudentById)
    parameters:
        endpoint,
        callback function
    returns:
        Text


** TODO **
    * Add authentication to the routes