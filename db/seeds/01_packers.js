
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('packersTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('packersTable').insert([
        { packerName: 'Michael' , email:'mike@name.com' , password:'asdf'},
        { packerName: 'Andy' , email:'andy@name.com' , password:'asdf'},
        { packerName: 'Chelsea' , email:'chelsea@name.com' , password:'asdf'},
        { packerName: 'Jon' , email:'jon@name.com' , password:'asdf'}

      ]);
    });
};
