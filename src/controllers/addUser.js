const { User } = require("../db/models");

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
async function addUserToDatabase({ username, email }) {
	// Your implementation here
	const newUser = new User({ username, email });
	console.log(newUser);
	try {
		const userData = await newUser.save();
		return userData;
	} catch (err) {
		console.log(err);
		return;
	}
}

/**
 * Express route to handle requests for add user to database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function addUser(req, res) {
	// Your implementation here
	const { username, email } = req.body;
	if ((!username, !email)) res.status(400).send("bad request");

	// check for student in db
	const exist = await User.findOne({
		email,
	});
	if (exist)
		return res.json({
			msg: "User already exists with this email id",
		});

	const userData = await addUserToDatabase({ username, email });

	if (!userData) return res.status(500).send("Something went wrong...");

	return res.json({
		message: "New User added successfully",
		userData: userData,
	});
}

module.exports = addUser;
