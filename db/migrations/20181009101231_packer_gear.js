
exports.up = function(knex, Promise) {
 return knex.schema.createTable('packer_gearTable', (table) => {
   table.increments();
   table.integer('packer_id')
        .references('id')
        .inTable('packersTable')
        .onDelete('CASCADE');

   table.integer('gear_id')
        .references('id')
        .inTable('gearTable')
        .onDelete('CASCADE');
    table.string('status');
   table.timestamps(true, true);
 })

};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('packer_gearTable')
};
