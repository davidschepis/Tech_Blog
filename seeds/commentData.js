const { Comment } = require('../models');
const date = new Date();

const commentData = [
    {
        content: "This is just a test comment",
        creator: "Morty",
        date: date,
        blogPost_id: 1
    },
    {
        content: "This is just a test comment 2",
        creator: "James",
        date: date,
        blogPost_id: 2
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
