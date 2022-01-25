const { BlogPost } = require('../models');
const date = new Date();

const blogData = [
    {
        title: "Test Post 1",
        content: "This is just a test",
        creator: "Morty",
        date: date,
        creator_id: 1
    },
    {
        title: "Test Post 2",
        content: "This is just a test 2",
        creator: "James",
        date: date,
        creator_id: 2
    }
];

const seedBlog = () => BlogPost.bulkCreate(blogData);

module.exports = seedBlog;
