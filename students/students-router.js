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

router.get("/:id", (req, res) => {
    const { id } = req.params; 

    db.findById(id)
        .then(student => {
            const { name } = student; 
            res.status(200).json(name); 
        })
        .catch(err => {
            res.status(500).json(err.message); 
        })
})

router.post("/register", (req, res) => {
    const new_student = req.body; 

    if (isValid(new_student)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8; 
        const hash = bcrypt.hashSync(new_student.password, rounds);
        new_student.password = hash; 

        db.add(new_student)
            .then(student => {
                const token = signToken(student); 
                const { name } = student; 
                res.status(200).json({ message: `Welcome ${name}`, token})
            })
            .catch(err => {
                res.status(500).json(err.message);
            });
    } else {
        res.status(400).json({ message: "Please provide username & password - keep in mind your password is case sensitive" }); 
    }
})

router.post("/login", (req, res) => {
    const { name, password } = req.body;

      if (isValid(req.body)) {
          db.findBy({ name: name })
          .then(([student]) => {
              if (student && bcrypt.compareSync(password, student.password)) {
                  const token = signToken(student);
                  res.status(200).json({ message: `Welcome back ${name}`, token });
              } else {
                  res.status(401).json({ message: "Your username/password did not match our records. Please try again." });
              }
          })
          .catch(err => {
              res.status(500).json({ message: err.message });
              console.log(err)
          });
      } else {
          res.status(400).json({
              message: "Please enter your username and password correctly."
          });
      }
  });

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