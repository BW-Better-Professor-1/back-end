const db = require('../data/db-config.js');

module.exports = {
    find, 
    findById, 
    addProject
}

function find() {
    return db('students'); 
}

function findById(id) {
    return db('students')
        .where({ id })
        .first(); 
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