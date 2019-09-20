exports.seed =async  function(knex, Promise) {
  await knex("users")
    .del()
    .then(function() {
      return knex("users").insert(
        [{
          first_name: "daniel",
          last_name:"zhou",
          email: "daniel@test.com",
          password: "$2b$08$0N1IIfc1nnA2iXvW9j4/uua495IgBA54EQnrLR8fuBAqTWkkLJnma",
          phone: "4033973186",
          locale:"en-GB",
          picture: "https://lh5.googleusercontent.com/-I_7U5ry4fHY/AAAAAAAAAAI/AAAAAAAAFuw/ENwXvROwFqU/s96-c/photo.jpg"
        }]
    );
   })

   return  knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {description: "buy a pair of glasses", completed: false, user_id: 1},
        {description: "build taks manager with postgres", completed: false, user_id: 1},
      ]);
    });
};
