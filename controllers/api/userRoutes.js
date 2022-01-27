const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');

router.get("/", async (req, res) => {
    const data = await User.findAll();
    res.json(data);
});

//POST to /api/users which adds a new user to the DB
router.post("/", async (req, res) => {
    try {
        const data = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.logged_in = true;
            res.status(200).json(data);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/comments/:id", async (req, res) => {
    const data = await Comment.findAll({ where: { blogPost_id: req.params.id } });
    if (!data) {
        res.status(400).json({ message: 'Unable to get comments' });
        return;
    }
    res.json(data);
});

router.post("/new", async (req, res) => {
    try {
        const {title, content} = req.body;
        const date = new Date();
        const id = req.session.user_id;
        const creator = await User.findByPk(id);
        const { dataValues } = creator;
        const creator_name = dataValues.username;
        const data = await BlogPost.create({
            title: title,
            content: content,
            date: date,
            creator_id: id,
            creator: creator_name
        });
        console.log("here3")
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;