require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

/**
 * Establishes a connection to MongoDB using Mongoose
 */
function connectToMongoDB() {
	// Your implementation here
	mongoose.connect(process.env.DB_URL, {});
	db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => {
		console.log("database connected...");
	});
}

connectToMongoDB();

app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
