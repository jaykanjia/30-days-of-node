const { User } = require("../db/models");

/**
 * Express route to calculate the average age of all users in MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function averageAgeOfUsers(req, res) {
	// Your implementation here
	try {
		// Use MongoDB aggregation to calculate the average age
		const result = await User.aggregate([
			{
				$group: {
					_id: null,
					averageAge: { $avg: "$age" },
				},
			},
		]);

		// Check if result is empty or not
		if (result.length === 0) {
			return res
				.status(404)
				.json({ message: "No users found in the database" });
		}

		// Send the average age in the response
		res.json({ averageAge: result[0].averageAge });
	} catch (error) {
		console.error("Error calculating average age:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

module.exports = averageAgeOfUsers;
