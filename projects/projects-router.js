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



//* 🎠UPDATE project by ID🎠 *// 
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

router.delete("/:id", (req, res) => {

})



module.exports = router;