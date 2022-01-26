const router = require('express').Router();
const { BlogPost } = require("../models");

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

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
    }
    else {
        res.render("login");
    }
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
    }
    else {
        res.render("signup");
    }
});

module.exports = router;