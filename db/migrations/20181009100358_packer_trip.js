
exports.up = function(knex, Promise) {
 return knex.schema.createTable('packer_tripTable', (table) => {
   table.increments();
   table.integer('packer_id')
        .references('id')
        .inTable('packersTable')
        .onDelete('CASCADE');

   table.integer('trip_id')
        .references('id')
        .inTable('tripsTable')
        .onDelete('CASCADE');
    table.string('role');
    table.boolean('confirmed');
   table.timestamps(true, true);
 })

};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('packer_tripTable')
};
