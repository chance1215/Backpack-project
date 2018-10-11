
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('packer_tripTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('packer_tripTable').insert([
        {packer_id:1, trip_id:1, role:'admin', confirmed:true},
        {packer_id:2, trip_id:1, role:'packer', confirmed:true},
        {packer_id:3, trip_id:1, role:'packer', confirmed:true},
        {packer_id:4, trip_id:1, role:'packer', confirmed:true},

        {packer_id:1, trip_id:2, role:'packer', confirmed:true},
        {packer_id:2, trip_id:2, role:'admin', confirmed:true},
        {packer_id:3, trip_id:2, role:'packer', confirmed:true},
        {packer_id:4, trip_id:2, role:'packer', confirmed:true},

        {packer_id:1, trip_id:3, role:'packer', confirmed:true},
        {packer_id:2, trip_id:3, role:'packer', confirmed:true},
        {packer_id:3, trip_id:3, role:'admin', confirmed:true},
        {packer_id:4, trip_id:3, role:'packer', confirmed:true}
      ]);
    });
};
