//routes index
const router = require('express').Router();

const homepage = require("./homeRoutes.js");
const api = require("./api");

router.use("/", homepage);
router.use("/api", api);

module.exports = router;