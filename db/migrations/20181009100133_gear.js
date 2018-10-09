
exports.up = function(knex, Promise) {
 return knex.schema.createTable('gearTable', (table) => {
   table.increments();
   table.string('gearName');
   table.integer('trip_id')
        .references('id')
        .inTable('tripsTable')
        .onDelete('CASCADE');

   table.string('type');
   table.timestamps(true, true);
 })

};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('gearTable')
};
