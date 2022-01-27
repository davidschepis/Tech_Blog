const router = require('express').Router();
const { BlogPost } = require("../models");

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
router.get("/dashboard", async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("login");
    }
    else {
        try {
            const blogs = await BlogPost.findAll({where: {creator_id: req.session.user_id}});
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
    }
});


module.exports = router;