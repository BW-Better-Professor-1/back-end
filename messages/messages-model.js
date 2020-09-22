const db = require('../data/db-config.js');


module.exports = {
    find,
    findMsgByUser,
    sendMessage,
    getById,
    // insert
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
        .join('students AS s', 's.id', '=', 'm.student_id')
        .select('m.title', 'u.id as user_id', 'm.professor_id', 'm.body', 'u.name as username', 's.name as student_name', 'm.send_time', 'm.sent')
        .orderBy('m.professor_id')
}

function sendMessage(message, professor_id) {
    message.professor_id = professor_id; 
    return db('messages')
        .insert(message, 'id')
            .then(ids => {
                const [ id ] = ids; 
                return db('messages')  
                    .where({ id })
                    .first(); 
            }); 
}

function getById(id) {
    return db('messages')
      .where({ id })
      .first()
  }

      