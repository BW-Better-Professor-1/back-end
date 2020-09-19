# The Better Professor API 

## End points: We'll fill out details on the end points as we build them

### Note on tokens: 

This server dispenses tokens for authorization, these will have expiry times attached to them, but will have to be set and should be destroyed via the front end. 

### Auth (Login & Register Professors) End Points 
**Users data structure** 
id | name | password
---|------|---------
1 | "new-user" | "password"

* POST to: *"api/auth/register"* 
    * Expects: 
    
    User = {
        "name": "example_username",     
        "password" : "example_password"
    }


    Both fields are **required** 
    * **name** must be unique (cannot match the name of another user)
    * An id will be dispensed by the server in incrimenting order
    
    * Returns: A token (JWT) to be stored in headers.authorization 

* POST to: *"api/auth/login"* 
    * Expects: User = {
        "name": "example_username",     
        "password" : "example_password"
    }
    * Both fields are **required** and must be a correct (must match an existing name and password)

    * Returns: A token (JWT) to be stored in headers.authorization 

### Student End Points 
**students data structure** 
id | professor_id | name | password
---|--------------|------|---------
1 | 2 | "new-student" | "password"

* Name must be **unique** 

* POST to: *"/api/students/:id/add-project"* 
    * Expects: a new project object:
    
    new_project = {
        "project_name": "Project_title", 
        "description": "up to 400 characters", 
        "due_date": "2020-12-12", 
        "completed": true
     }

    * All fields above are **required**
    * Datetime format is year-month-day, in quotes
    * Returns: The newly added project 

### Projects End Points 
**Projects data structure** 
id | student_id | project_name | description | due_date | completed
---|------------|--------------|-------------|----------|----------
1 | 1 | "New Project" | "Details about the project" | "2020-01-01" | true

* GET to: *"api/projects/"*
    * Returns: A list of all projects - full details 

* GET to: *"api/projects/:id"*
    * Returns: The project with the provided id number 


