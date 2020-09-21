const db = require('../data/db-config.js');


module.exports = {
    find,
    findBy,
    findById,
    add, 
    addProject, 
    findProjects, 
    findStudents
};

// Returns list of all users
function find() {
    return db('users')
};

// returns user(s) based on filter param
function findBy(filter) {
    return db('users as u')
        .where(filter)
        .orderBy("u.id")
        .select("u.id", "u.name", "u.password");
};

// returns user by specific id
function findById(id) {
    return db('users')
        .where({ id }).first();
};

// adds new user to DB 
async function add(user) {
    try{
        const [id] = await db('users')
            .insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
};

// add a project through the professor 
function addProject(project, professor_id) {
    project.professor_id = professor_id; 

    return db('projects')
        .insert(project, 'id')
            .then(ids => {
                const [ id ] = ids; 
                return db('projects')  
                    .where({ id })
                    .first(); 
            }); 
}

// query for the professors projects
function findProjects(id) {
    return db('users')
        .join('projects', 'users.id', 'projects.professor_id' )
        .select('projects.professor_id','projects.student_id','projects.project_name', 'projects.description', 'projects.due_date', 'projects.description', 'projects.completed')
        .where({ professor_id: id });
}

function findStudents(id) {
    return db('users')
        .join('students', 'users.id', 'students.professor_id')
        .select('students.id','students.name')
        .where({ professor_id: id })
}