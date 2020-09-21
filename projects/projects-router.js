const router = require('express').Router();

const db = require("./projects-model"); 

//* 🎠READ🎠 *// 
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

//* 🎠READ🎠 *// 
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



//* 🎠UPDATE🎠 *// 
router.put("/:id", (req, res) => {
    const { id } = req.params; 
    const changes = req.body; 

    db.update(changes, id)
        .then(updatedProject => {
            res.status(201).json(updatedProject); 
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to update project, please try again" });
        })
        
})

//* 🎠REMOVE🎠 *// 
router.delete("/:id", (req, res) => {
    const { id } = req.params; 

    db.remove(id)
        .then(count => {
            if (count) {
                res.status(200).json({ message: "Project successfully removed" }); 
            } else {
                res.status(404).json({ message: "No project with this ID was found" }); 
            }
        })
        .catch(err => {
            res.send(err); 
        })
})



module.exports = router;