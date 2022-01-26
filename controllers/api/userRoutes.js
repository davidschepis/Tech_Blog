const router = require('express').Router();
const { User } = require('../../models');

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

module.exports = router;