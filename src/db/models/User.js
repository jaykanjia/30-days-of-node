const mongoose = require("mongoose");

function validateEmail(email) {
	// Regular expression for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email); // Return true if the email matches the regex pattern
}

const userSchema = mongoose.Schema({
	username: { type: String, require: true },
	email: {
		type: String,
		require: true,
		validate: {
			validator: validateEmail, // Custom validator function for email property
			message: "Invalid email format",
		},
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
