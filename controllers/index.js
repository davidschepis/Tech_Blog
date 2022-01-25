const router = require('express').Router();

const homepage = require("./homeRoutes.js");

router.use("/", homepage);

module.exports = router;