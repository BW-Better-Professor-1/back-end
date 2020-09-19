
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'wacky_math_guy', password: 'i_like_pi'},
        {id: 2, name: 'prof_paquin', password: 'trubl00d'},
        {id: 3, name: 'r.Martin', password: 'loca'}
      ]);
    });
};
