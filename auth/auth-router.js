const router = require('express').Router();
const bcrypt = require('bcryptjs');



const { isValid, signToken } = require('../auth/auth-services.js');
const Users = require('./auth-model');


/* GET REQUESTS */

// returns all users in the DB ordered by default
router.get('/', (req,res) =>{
  Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
});

/* POST REQUESTS */
router.post('/register', (req, res) => {
  const creds = req.body;

  if(isValid(creds)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hash = bcrypt.hashSync(creds.password, rounds);
      creds.password = hash;

      Users.add(creds)
      .then(user => {
          const token = signToken(user);
          res.status(201).json({ data: user, token });
      })
      .catch(err => {
          res.status(500).json({ message: err.message });
      });
  } else {
      res.status(400).json({
          message: 'please provide username and password. your password is alphanumeric and case sensitve!'
      });
  }
});

router.post('/login', (req, res) => {
  const { name, password } = req.body;
    if (isValid(req.body)) {
        Users.findBy({ name: name })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user);
                res.status(200).json({ token: token, user: user });
            } else {
                res.status(401).json({ message: "Your username/password did not match our records. Please try again." });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
            console.log(err)
        });
    } else {
        res.status(400).json({
            message: "Please enter your username and password correctly."
        });
    }
});

// Post project specifically to user By ID
router.post("/:id/add-project", (req, res) => {
    const new_project = req.body; 
    const { id } = req.params; 
    Users.findById(id)
        .then(user => {
            if (user) {
                Users.addProject(new_project, id)
                    .then(project => {
                        res.status(201).json(project); 
                    })
            } else {
                res.status(404).json({ message: "Missing or Invalid user ID" }); 
            }
        })
        .catch(error => res.send(error)); 
}); 

// retrieves a list of  projects specific to that user
router.get("/:id/projects", (req, res) => {
    const { id } = req.params; 
    Users.findProjects(id)
        .then(projects => {
            if (projects.length) {
                res.status(200).json(projects);
            } else {
                res.status(404).json({ message: "No projects are available for this user" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// retrieves a list of students specific to that user
router.get("/:id/students", (req, res) => {
    const { id } = req.params; 
    Users.findStudents(id)
        .then(students => {
            if (students.length) {
                res.status(200).json(students);
            } else {
                res.status(404).json({ message: "You are not currently mentoring any students" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// NOTE: JwT does not have a destroy method - there is a way around this but there will be some reworking here - its a nice to have if we want to end up implmenting it. Or we can implement ssessions and tokens. 
// router.post('/logout', (req, res) => {
//   console.log(req.body)
//   if (req.token) {
//     req.token.isRevoked((error) => {
//       if (error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(204).end();
//       }
//     });
//   } else {
//     res.status(200).json({ message: 'already logged out' });
//   }
// });

module.exports = router;

/* TEST USERS CREATED */
/*
   {
        "id": 4,
        "name": "user_test1",
        "password": "password"
    },
    {
        "id": 5,
        "name": "user_test2",
        "password": "password"
    },
    {
        "id": 6,
        "name": "user_test3",
        "password": "password"
    }
*/
