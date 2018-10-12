
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('packersTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('packersTable').insert([
        { packerName: 'Andy Zalit' , email:'andyzalit@gmail.com' , password:'1234'},
        { packerName: 'Chelsea Grimmett' , email:'c.grimmett@me.com' , password:'1234'},
        { packerName: 'Jon McCarthy' , email:'jtmcc93@gmail.com' , password:'1234'},
        { packerName: 'Michael Beamish' , email:'michaelbeamish89@gmail.com' , password:'1234'}
      ]);
    });
};
