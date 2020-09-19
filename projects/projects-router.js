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

router.put("/:id", (req, res) => {
    
})



module.exports = router;