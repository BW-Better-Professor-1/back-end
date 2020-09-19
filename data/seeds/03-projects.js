
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          id: 1, 
          student_id: 4, 
          project_name: "String Theory", 
          description: `Dissertation to be prepared on the finer points of merino yarn`, 
          due_date: "2021-01-15", 
          completed: false
        },
        {
          id: 2, 
          student_id: 3, 
          project_name: "Sculptural Shrubery", 
          description: `Shrubery shaped into clouds, dinosaurs, and snuggly creatures. Must look magical when showered with fake snow.`, 
          due_date: "2020-12-20", 
          completed: false
        },
        {
          id: 3, 
          student_id: 1, 
          project_name: "Resisting the Darkside", 
          description: `Be able to give examples for why turning the darkside is what actually kills Padme you cabron`, 
          due_date: "2020-07-15", 
          completed: false
        }, 
        {
          id: 4, 
          student_id: 5, 
          project_name: "Self Defence in Prison", 
          description: `How to protect yourself from surprise attacks`, 
          due_date: "1994-11-28", 
          completed: true
        }
      ]);
    });
};
