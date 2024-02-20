const router = require("express").Router();
const { addUser, getAllUsers } = require("../controllers");

// list all users
router.get("/", getAllUsers);

// add new user
router.post("/", addUser);

module.exports = router;
