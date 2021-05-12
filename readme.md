# Documentation of the routes in the studentdb-crud-app

Get request to fetch all students in the database
# app.get()
    parameters: 
        endpoint, 
        callback function
    returns:
     Object || error message

Get request to fetch a student by id
# app.get()
    parameters: 
        endpoint, 
        callback function
    returns:
     Object || error message

POST request to add a new student
# app.post()
    parameters:
        endpoint,
        callback function
    returns: 
        Object || error message

DELETE request to clear the database
# app.delete()
    parameters:
        endpoint,
        callback function
    returns:
        Object || error message

DELETE request to delete a student by ID
# app.delete()
    parameters:
        endpoint,
        callback function
    returns:
        String || error message
