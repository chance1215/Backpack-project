
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('packer_gearTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('packer_gearTable').insert([
        {packer_id: 1, gear_id:1, status:'unpacked'},
        {packer_id: 2, gear_id:1, status:'unpacked'},
        {packer_id: 3, gear_id:1, status:'unpacked'},
        {packer_id: 4, gear_id:1, status:'unpacked'},

        {packer_id: 1, gear_id:2, status:'unpacked'},
        {packer_id: 2, gear_id:2, status:'unpacked'},
        {packer_id: 3, gear_id:2, status:'unpacked'},
        {packer_id: 4, gear_id:2, status:'unpacked'},

        {packer_id: 1, gear_id:3, status:'unpacked'},
        {packer_id: 2, gear_id:3, status:'unpacked'},
        {packer_id: 3, gear_id:3, status:'unpacked'},
        {packer_id: 4, gear_id:3, status:'unpacked'},

        {packer_id: 1, gear_id:4, status:'unpacked'},
        {packer_id: 2, gear_id:4, status:'unpacked'},
        {packer_id: 3, gear_id:4, status:'unpacked'},
        {packer_id: 4, gear_id:4, status:'unpacked'},

        {packer_id: 1, gear_id:5, status:'unpacked'},
        {packer_id: 2, gear_id:5, status:'unpacked'},
        {packer_id: 3, gear_id:5, status:'unpacked'},
        {packer_id: 4, gear_id:5, status:'unpacked'},

        {packer_id: undefined, gear_id:6, status:'unpacked'},
        {packer_id: undefined, gear_id:7, status:'unpacked'},
        {packer_id: undefined, gear_id:8, status:'unpacked'},
        {packer_id: undefined, gear_id:9, status:'unpacked'},

        {packer_id: 1, gear_id:10, status:'unpacked'},
        {packer_id: 2, gear_id:10, status:'unpacked'},
        {packer_id: 3, gear_id:10, status:'unpacked'},
        {packer_id: 4, gear_id:10, status:'unpacked'},

        {packer_id: 1, gear_id:11, status:'unpacked'},
        {packer_id: 2, gear_id:11, status:'unpacked'},
        {packer_id: 3, gear_id:11, status:'unpacked'},
        {packer_id: 4, gear_id:11, status:'unpacked'},

        {packer_id: 1, gear_id:12, status:'unpacked'},
        {packer_id: 2, gear_id:12, status:'unpacked'},
        {packer_id: 3, gear_id:12, status:'unpacked'},
        {packer_id: 4, gear_id:12, status:'unpacked'},

        {packer_id: 1, gear_id:13, status:'unpacked'},
        {packer_id: 2, gear_id:13, status:'unpacked'},
        {packer_id: 3, gear_id:13, status:'unpacked'},
        {packer_id: 4, gear_id:13, status:'unpacked'},

        {packer_id: 1, gear_id:14, status:'unpacked'},
        {packer_id: 2, gear_id:14, status:'unpacked'},
        {packer_id: 3, gear_id:14, status:'unpacked'},
        {packer_id: 4, gear_id:14, status:'unpacked'},

        {packer_id: undefined, gear_id:15, status:'unpacked'},
        {packer_id: undefined, gear_id:16, status:'unpacked'},
        {packer_id: undefined, gear_id:17, status:'unpacked'},
        {packer_id: undefined, gear_id:18, status:'unpacked'},

        {packer_id: 1, gear_id:19, status:'unpacked'},
        {packer_id: 2, gear_id:19, status:'unpacked'},
        {packer_id: 3, gear_id:19, status:'unpacked'},
        {packer_id: 4, gear_id:19, status:'unpacked'},

        {packer_id: 1, gear_id:20, status:'unpacked'},
        {packer_id: 2, gear_id:20, status:'unpacked'},
        {packer_id: 3, gear_id:20, status:'unpacked'},
        {packer_id: 4, gear_id:20, status:'unpacked'},

        {packer_id: 1, gear_id:21, status:'unpacked'},
        {packer_id: 2, gear_id:21, status:'unpacked'},
        {packer_id: 3, gear_id:21, status:'unpacked'},
        {packer_id: 4, gear_id:21, status:'unpacked'},

        {packer_id: 1, gear_id:22, status:'unpacked'},
        {packer_id: 2, gear_id:22, status:'unpacked'},
        {packer_id: 3, gear_id:22, status:'unpacked'},
        {packer_id: 4, gear_id:22, status:'unpacked'},

        {packer_id: 1, gear_id:23, status:'unpacked'},
        {packer_id: 2, gear_id:23, status:'unpacked'},
        {packer_id: 3, gear_id:23, status:'unpacked'},
        {packer_id: 4, gear_id:23, status:'unpacked'},

        {packer_id: undefined, gear_id:24, status:'unpacked'},
        {packer_id: undefined, gear_id:25, status:'unpacked'},
        {packer_id: undefined, gear_id:26, status:'unpacked'},
        {packer_id: undefined, gear_id:27, status:'unpacked'}


      ]);
    });
};
