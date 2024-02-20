const router = require("express").Router();
const { addUser, getAllUsers, averageAgeOfUsers } = require("../controllers");

// list all users
router.get("/", getAllUsers);

// add new user
router.post("/", addUser);

router.get("/average-age", averageAgeOfUsers);

module.exports = router;
