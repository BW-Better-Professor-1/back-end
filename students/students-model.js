const db = require('../data/db-config.js');

module.exports = {
    find, 
    findBy,
    findById, 
    add,
    addProject
}

function find() {
    return db('students'); 
}

function findBy(filter) {
    return db('students as s')
        .where(filter)
        .orderBy("s.id")
        .select("s.id", "s.name", "s.password");
};

function findById(id) {
    return db('students')
        .where({ id })
        .first(); 
}

function add(student) {
    return db('students')
        .insert(student, 'id')
            .then(([id]) => {
                return findById(id); 
            })
}

function addProject(project, student_id) {
    project.student_id = student_id; 

    return db('projects')
        .insert(project, 'id')
            .then(ids => {
                const [ id ] = ids; 
                return db('projects')  
                    .where({ id })
                    .first(); 
            }); 
}