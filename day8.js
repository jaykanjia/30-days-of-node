const express = require("express");
const app = express();

/**
 * Express route to handle requests with a positive integer parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function positiveIntegerHandler(req, res) {
	// Your implementation here
	const number = req.query.number;
	if (!isNaN(number) && number > 0) res.send("Success! Number is positive.");
	else res.status(400).send("Number must be a positive.");
}

app.get("/positive", positiveIntegerHandler);

const PORT = 5001;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
