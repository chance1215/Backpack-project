
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notesTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('notesTable').insert([
        { content: "Don't forget to bring a towel!", trip_id: 1, packer_id: 1},
        { content: "Can I bring my neighbor's cat?", trip_id: 1, packer_id: 3},
        { content: "The weather is predicting tornados.", trip_id: 1, packer_id: 2},
        { content: "I lost my hiking underwear. Anybody have a pair I can borrow?", trip_id: 1, packer_id: 4},

        { content: "That's ok. I can drive too.", trip_id: 2, packer_id: 4},
        { content: "I'll drive also!", trip_id: 2, packer_id: 2},
        { content: "There's only for of us.", trip_id: 2, packer_id: 3},
        { content: "I'll drive.", trip_id: 2, packer_id: 1},

        { content: "I'm so excited!", trip_id: 3, packer_id: 1},
        { content: "Yes. But I am bringing tiger spray.", trip_id: 3, packer_id: 3},
        { content: "Will there be tigers?", trip_id: 3, packer_id: 2},
        { content: "Will I need shoes or are flip-flips ok?", trip_id: 3, packer_id: 4},
      ]);
    });
};
