const db = require('../data/db-config.js');


module.exports = {
    find,
    findMsgByUser,
    sendMessage
};

// Returns list of all messages
function find() {
    return db('messages')
};

// Finds messages by user id
function findMsgByUser(id) {
    return db('users as u')
        .where('u.id', '=', id)
        .join('messages AS m', 'u.id', '=', 'm.professor_id' )
        .select('m.title', 'm.body', 'u.name as user', 'm.student_id', 'm.send_time', 'm.sent')
        .orderBy('m.id')
}

// grabs message in req.body and adds it to message db - ERROR: not working currently unable to grab professor ID as ID to sort
function sendMessage(message) {
    return db('messages')
        .where({})
        .insert(message, 'id')
            .then((id) => {
                return findMsgByUser(id)
            })
};


