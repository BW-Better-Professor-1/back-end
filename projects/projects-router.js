const router = require('express').Router();

const db = require("./projects-model"); 

router.get("/", (req, res) => {
    db.find()
        .then(projects => {
            res.status(200).json(projects); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ message: "Error finding projects" }); 
        })
}); 

router.get("/:id", (req, res) => {
    const { id } = req.params; 
    db.findById(id)
        .then(project => {
            if (project) {
                res.status(200).json(project); 
            } else {
                res.status(404).json({ message: "No project found with this ID" }); 
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error finding projects" }); 
        })
}); 


//TODO - This route makes more sense to be routed through the students router, so that the student id can be grabbed from req.params // 

// router.post("/", (req, res) => {
//     const new_project = req.body; 

//     db.add(new_project)
//         .then(project => {
//             res.status(201).json(project); 
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Unable to add new project" }); 
//         })
// })


module.exports = router;