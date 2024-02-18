const { User } = require("../db/models");

/**
 * Express route to get all users from MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUsers(req, res) {
	// Your implementation here
	try {
		const userList = await User.find({});
		if (!userList) return res.status(500).send("Something went wrong...");

		return res.json({ users: userList });
	} catch (err) {
		console.log(err);
		return res.status(500).send("Something went wrong...");
	}
}

module.exports = getAllUsers;
