
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, professor_id: 1, name: 'jed_eye', password: 'obey_juan'},
        {id: 2, professor_id: 3, name: 'newStudent', password: 'secretPass'},
        {id: 3, professor_id: 1, name: 'e.Scissorhands', password: 'sharpe'}, 
        {id: 4, professor_id: 2, name: 'iHateMath', password: 'password'}, 
        {id: 5, professor_id: 1, name: 'j.Dahmer', password: 'watchTheJogger'}
      ]);
    });
};
