const { User } = require('../models');

const userData = [
    {
        username: "Morty James Jr",
        password: "password"
    },
    {
        username: "Frank Ocean",
        password: "password"
    },
    {
        username: "Lance Vance",
        password: "password"
    },
    {
        username: "Negative Nancy",
        password: "password"
    }
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
});

module.exports = seedUser;
