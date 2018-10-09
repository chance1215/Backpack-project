
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gearTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('gearTable').insert([
        {gearName: 'backpack' , trip_id: 1, type:'individual'},
        {gearName: 'sleeping bag' , trip_id: 1, type:'individual'},
        {gearName: 'headlamp' , trip_id: 1, type:'individual'},
        {gearName: 'food' , trip_id: 1, type:'individual'},
        {gearName: 'clothes' , trip_id: 1, type:'individual'},
        {gearName: 'stove' , trip_id: 1, type:'community'},
        {gearName: 'bear spray' , trip_id: 1, type:'community'},
        {gearName: 'tent' , trip_id: 1, type:'community'},
        {gearName: 'first-aid' , trip_id: 1, type:'community'},

        {gearName: 'backpack' , trip_id:2, type:'individual'},
        {gearName: 'sleeping bag' , trip_id: 2, type:'individual'},
        {gearName: 'headlamp' , trip_id: 2, type:'individual'},
        {gearName: 'food' , trip_id: 2, type:'individual'},
        {gearName: 'clothes' , trip_id: 2, type:'individual'},
        {gearName: 'stove' , trip_id: 2, type:'community'},
        {gearName: 'bear spray' , trip_id: 2, type:'community'},
        {gearName: 'tent' , trip_id: 2, type:'community'},
        {gearName: 'first-aid' , trip_id: 2, type:'community'},

        {gearName: 'backpack' , trip_id: 3, type:'individual'},
        {gearName: 'sleeping bag' , trip_id: 3, type:'individual'},
        {gearName: 'headlamp' , trip_id: 3, type:'individual'},
        {gearName: 'food' , trip_id: 3, type:'individual'},
        {gearName: 'clothes' , trip_id: 3, type:'individual'},
        {gearName: 'stove' , trip_id: 3, type:'community'},
        {gearName: 'bear spray' , trip_id: 3, type:'community'},
        {gearName: 'tent' , trip_id: 3, type:'community'},
        {gearName: 'first-aid' , trip_id: 3, type:'community'}

      ]);
    });
};
