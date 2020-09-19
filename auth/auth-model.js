const db = require('../data/db-config.js');


module.exports = {
    find,
    findBy,
    findById,
    add
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