require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

/**
 * Logging middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function loggingMiddleware(req, res, next) {
	// Your implementation here
	// Get the current timestamp
	const timestamp = new Date().toISOString();
	// Log request details
	console.log(`[${timestamp}] - ${req.method} - ${req.url} request received`);
	console.log("Headers:", req.headers);
	console.log("Body:", req.body);

	// Proceed to the next middleware
	next();
}

app.use(loggingMiddleware);

app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
