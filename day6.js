const express = require("express");
const app = express();

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
	// Your implementation here
	const { name } = req.query;
	if (name) return res.send(`Hello, ${name}!`);
	return res.send("Hello, Guest!");
}

app.get("/greet", greetHandler);

const PORT = 5001;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
