const addUser = require("../controllers/addUser");
const router = require("express").Router();

router.post("/", addUser);

module.exports = router;
