
exports.up = function(knex, Promise) {
 return knex.schema.createTable('tripsTable', (table) => {
   table.increments();
   table.string('tripName');
   table.date('startDate');
   table.date('endDate');
   table.string('location');
   table.text('description');
   table.timestamps(true, true);
 })

};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('tripsTable')
};
