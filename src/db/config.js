const mongoose = require("mongoose");

/**
 * Establishes a connection to MongoDB using Mongoose
 */
function connectToMongoDB() {
	// Your implementation here
	mongoose.connect(process.env.DB_URL);
	db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => {
		console.log("database connected...");
	});
}

module.exports = connectToMongoDB;
