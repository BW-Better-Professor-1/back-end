# The Better Professor API 

## End points: We'll fill out details on the end points as we build them

### Auth (Login & Register) End Points 

* POST to: *"api/auth/register"* 
    * Expects: User = {
        "name": "example_username",     
        "password" : "example_password"
    }
    Both fields are **required** 
    **name** must be unique (cannot match the name of another user)
    An id will be dispensed by the server in incrimenting order
    
    * Returns: A token (JWT) to be stored in headers.authorization 

* POST to: *"api/auth/login"* 
    * Expects: User = {
        "name": "example_username",     
        "password" : "example_password"
    }
    Both fields are **required** and must be a correct (must match an existing name and password)

    * Returns: A token (JWT) to be stored in headers.authorization 


