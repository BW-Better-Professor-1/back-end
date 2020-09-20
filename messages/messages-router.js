const router = require('express').Router();

const db = require("./messages-model"); 


/* GET - TEST ROUTER THAT ENDPOINT IS UP AND RUNNING */
router.get("/", (req, res) => {
    db.find()
        .then(messages => { 
            res.status(200).json(messages); 
        })
        .catch(error => res.send(error)); 
})

/* GET - grabs a list of all messages by user id. If we need to split sent/received, we can in separate endpoints but we have the boolean as 0 = false, 1 = true  */
router.get("/:id", (req, res) => {
    const { id } = req.params; 
    db.findMsgByUser(id)
        .then(messages => {
            if (messages) {
                res.status(200).json(messages); 
            } else {
                res.status(404).json({ message: "No messages found for user with this ID" }); 
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding messages", error: err.message }); 
        })
}); 


// **ASHLEY - This is where I'm stuck - this is the endpoint to insert a message into messaging database. Trying to grab the id from the url and put that as the professor_id but either my code has only been able to make that a message id which broke things or else I changed my code and now its just returning a blank response but still adds it to the general GET / endpoint with professor_id as null.
router.post("/:id", (req, res) => {
    const new_message = req.body; 
    const { id } = req.params; 

    db.findMsgByUser({id})
        .then(message => {
            if (message) {
                db.sendMessage(new_message, id)
                    .then(message => {
                        res.status(201).json(message); 
                    })
            } else {
                res.status(404).json({ message: "Missing or Invalid user ID" }); 
            }
        })
        .catch(error => res.send(error)); 
})

module.exports = router;