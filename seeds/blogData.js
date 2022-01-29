const { BlogPost } = require('../models');
const date = new Date();
let date2 = new Date();
date2.setDate(date.getDate() - 1);
let date3 = new Date();
date3.setDate(date.getDate() - 2);

const blogData = [
    {
        title: "New Algorithm Allows Sorting In O(n/4)",
        content: "Renowned computer scientist Morty James Jr has done the impossible, months of research has led to a new algorithm based off quicksort that allows searching in 4 factors less than linear time",
        creator: "Morty James Jr",
        date: date,
        creator_id: 1
    },
    {
        title: "How the fall of bitcoin allowed the GPU market to flourish",
        content: "With bitcoin at its lowest point in over a year, crypto miners are auctioning off their gpus, selling them at the lowest prices in decades.",
        creator: "Frank Ocean",
        date: date2,
        creator_id: 2
    },
    {
        title: "Safari Makes a Comeback",
        content: "The antiquated internet brower Safari has made a comeback, push past 50% of the current market share.",
        creator: "Lance Vance",
        date: date3,
        creator_id: 3
    },
    {
        title: "Harvard Students create a giant cookie",
        content: "In celebration of the first internet cookie being created 30 years ago, students at Harvard have constructed a giant edible cookie.",
        creator: "Lance Vance",
        date: date2,
        creator_id: 4
    }
];

const seedBlog = () => BlogPost.bulkCreate(blogData);

module.exports = seedBlog;
