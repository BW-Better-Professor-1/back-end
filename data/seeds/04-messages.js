
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {professor_id: '3', student_id:'2', title:'Scholarship Opportunity', body: 'Hi, Found this awesome scholarship that you could look into. Reply with your transcript.', send_time:'2020-04-19', sent: true},
        {professor_id: '2', student_id:'4', title:'Student Advisor Opportunity', body: 'Hi, I think you will like this opportunity. Apply on the website.', send_time:'2020-04-20', sent: true},
        {professor_id: '1', student_id:'1', title:'Recommendation Letter', body: 'Hi, I need more details to complete your letter. Thanks!', send_time:'2020-04-20', sent: true},
        {professor_id: '1', student_id:'3', title:'Essay Prompt', body: 'Hi, I need more details to complete your task. Thanks!', send_time:'2020-04-21', sent: true},
        {professor_id: '2', student_id:'4', title:'Re: Student Advisor Opportunity', body: 'Does this opportunity include money or just college credit?', send_time:'2020-04-21', sent: false},
        {professor_id: '2', student_id:'4', title:'Re: Student Advisor Opportunity', body: 'Does this opportunity include money or just college credit?', send_time:'2020-04-21', sent: false},
        {professor_id: '1', student_id:'5', title:'Extra Credit', body: 'Hi, I really need this A. What can I do to make sure I will get an A?', send_time:'2020-04-22', sent: false},
        {professor_id: '2', student_id:'4', title:'Re: Student Advisor Opportunity', body: 'Does this opportunity include money or just college credit?', send_time:'2020-04-22', sent: false},
        {professor_id: '3', student_id:'2', title:'Re: Scholarship Opportunity', body: 'Hi, I dropped my transcript off at the office but you were in a meeting.', send_time:'2020-04-22', sent: false},
        {professor_id: '1', student_id:'5', title:'Re: Extra Credit', body: 'Hi, Come by my office hours we can discuss it then.', send_time:'2020-04-23', sent: true}
      ]);
    });
};

