const router = require('express').Router();

const db = require("./messages-model"); 


/* GET - TEST ROUTER THAT ENDPOINT IS UP AND RUNNING */
router.get("/", (req, res) => {
    db.find()
        .then(messages => { 
            res.status(200).json({ data: messages }); 
        })
        .catch(error => res.send(error)); 
})

//GET - specific message by message id
router.get("/:id/messages", (req, res) => {
    const { id } = req.params; 
    db.getById(id)
        .then(messages => {
            if (messages) {
                res.status(200).json({ data: messages }); 
            } else {
                res.status(404).json({ message: "No messages found for user with this ID" }); 
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding messages", error: err.message }); 
        })
}); 


/* GET - grabs a list of all messages by user id. If we need to split sent/received, we can in separate endpoints but we have the boolean as 0 = false, 1 = true  */
router.get("/:id/messages", (req, res) => {
    const { id } = req.params; 
    db.findMsgByUser(id)
        .then(messages => {
            if (messages) {
                res.status(200).json({ data: messages }); 
            } else {
                res.status(404).json({ message: "No messages found for user with this ID" }); 
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding messages", error: err.message }); 
        })
}); 

router.post("/:id", (req, res) => {
    const newMessage = req.body; 
    const { id } = req.params; 
    
    db.getById(id)
        .then(message => {
            if (message) {
                db.sendMessage(newMessage, id)
                    .then(message => {
                        res.status(201).json({ data: message });
                    })
            } else {
                res.status(404).json({ message: `Missing or Invalid user ID ${newMessage}` }); 
            }
        })
        .catch(error => res.send(error)); 
})

module.exports = router;