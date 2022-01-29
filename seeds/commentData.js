const { Comment } = require('../models');
const date = new Date();
let date2 = new Date();
date2.setDate(date.getDate() - 1);
let date3 = new Date();
date3.setDate(date.getDate() - 2);

const commentData = [
    {
        content: "It's impossible to sort quicker than linear time!",
        creator: "Negative Nancy",
        date: date,
        blog_post_id: 1
    },
    {
        content: "When bitcoin comes back, will the prices increase again?",
        creator: "Lance Vance",
        date: date2,
        blog_post_id: 2
    },
    {
        content: "Will be dead again soon enough!",
        creator: "Negative Nancy",
        date: date3,
        blog_post_id: 3
    },
    {
        content: "LOL!",
        creator: "Morty James Jr",
        date: date2,
        blog_post_id: 3
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
