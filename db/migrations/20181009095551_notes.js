
exports.up = function(knex, Promise) {
 return knex.schema.createTable('notesTable', (table) => {
   table.increments();
   table.text('content');
   table.integer('trip_id')
        .references('id')
        .inTable('tripsTable')
        .onDelete('CASCADE');

   table.integer('packer_id')
        .references('id')
        .inTable('packersTable')
        .onDelete('CASCADE');

   table.timestamps(true, true);
 })

};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('notesTable')
};
