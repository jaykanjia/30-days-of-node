const router = require("express").Router();
const { addUser, getAllUsers } = require("../controllers");

router.get("/", getAllUsers);
router.post("/", addUser);

module.exports = router;
