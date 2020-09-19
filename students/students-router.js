const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { isValid, signToken } = require("../auth/auth-services"); 

const db = require("./students-model"); 

router.get("/", (req, res) => {
    db.find()
        .then(students => { 
            res.status(200).json(students); 
        })
        .catch(error => res.send(error)); 
})

router.post("/register", (req, res) => {
    //TODO: This route will register a new student
    // a new student needs: professor_id, name, password
    // const { professor_id, name, password } = req.body; 
    //? Should I update the database and allow the professor_id to be null? It could be assigned/reassigned later this way, and allow students to make a profile without an immediate need for an instructor? 
    // if valid, the new student will be added to the database, return token and welcome message.
})

//* 🎠Projects need student IDs, this route will allow students to add projects directly 🎠 *// 
//TODO: We should probably implement a way for professors to add project and assign a student to that project - unless that would be better handled on the front end? // 

router.post("/:id/add-project", (req, res) => {
    const new_project = req.body; 
    const { id } = req.params; 

    db.findById(id)
        .then(student => {
            if (student) {
                db.addProject(new_project, id)
                    .then(project => {
                        res.status(201).json(project); 
                    })
            } else {
                res.status(404).json({ message: "Missing or Invalid student ID" }); 
            }
        })
        .catch(error => res.send(error)); 
})

module.exports = router;