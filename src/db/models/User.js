const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: { type: String, require: true },
	email: { type: String, require: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
