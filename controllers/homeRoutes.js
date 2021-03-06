const router = require('express').Router();
const { BlogPost } = require("../models");
const withAuth = require('../utils/auth');

//returns all blog posts after formatting
router.get("/", async (req, res) => {
    try {
        const blogs = await BlogPost.findAll();
        const data = blogs.map((blog) => blog.get({ plain: true }));
        data.map((obj) => {
            obj.date = obj.date.toLocaleDateString("en-US");
        });
        res.render("homepage", { data, logged_in: req.session.logged_in });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//if the user goes to the login page when they are already logged in, go home
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
    }
    else {
        res.render("login");
    }
});

////if the user goes to the signup page when they are already logged in, go home
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
    }
    else {
        res.render("signup");
    }
});

//if the user is logged in go to the dashboard, otherwise login page
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const blogs = await BlogPost.findAll({ where: { creator_id: req.session.user_id } });
        const data = blogs.map((blog) => blog.get({ plain: true }));
        data.map((obj) => {
            obj.date = obj.date.toLocaleDateString("en-US");
        });
        res.render("dashboard", { data, logged_in: req.session.logged_in });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//render new blog post page
router.get("/dashboard/new", withAuth, async (req, res) => {
    res.render("new", { logged_in: req.session.logged_in });
});

//get blogpost based off id
router.get("/blogContent/:id", async (req, res) => {
    try {
        const blogs = await BlogPost.findAll({ where: { id: req.params.id } });
        const data = blogs.map((blog) => blog.get({ plain: true }));
        res.status(200).json(data[0].content);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;