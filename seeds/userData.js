const { User } = require('../models');

const userData = [
    {
        username: "Morty",
        password: "password"
    },
    {
        username: "James",
        password: "password"
    }
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
});

module.exports = seedUser;
