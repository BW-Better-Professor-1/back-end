const db = require("../data/db-config"); 

module.exports = {
    find, 
    findById, 
    add, 
    update, 
    remove
}

function find() {
    return db('projects'); 
}

function findById(id) {
    return db('projects')
        .where({ id })
        .first(); 
}

function add(project) {
    return db('projects')
        .insert(project, 'id')
            .then(([id]) => {
                return findById(id);
            });
}

function update(changes, id) {
    return db('projects')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        }); 
}

function remove(id) {
    return db('projects')   
        .where({ id })
        .del();
}