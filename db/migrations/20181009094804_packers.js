
exports.up = function(knex, Promise) {
 return knex.schema.createTable('packersTable', (table) => {
   table.increments();
   table.string('packerName');
   table.string('email').unique();
   table.text('password');
   table.timestamps(true, true);
 })

};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('packersTable')
};
