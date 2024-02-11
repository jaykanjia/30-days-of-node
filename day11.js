require("dotenv").config();

const express = require("express");
const app = express();
jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 5001;

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
	// Your implementation here
	const authToken = req.headers.authorization;
	console.log(authToken);

	if (!authToken) res.status(403).json({ message: "access denied!" });
	const token = authToken.split(" ")[1];
	try {
		const data = jwt.verify(token, process.env.jwt_secret);
		req.body = data;
		next();
	} catch (err) {
		res.status(500).json({ message: "access denied!" });
	}
}

app.use(express.json());

app.get("/", authenticationMiddleware, (req, res) => {
	res.json({ message: "Welcome", data: req.body.data });
});

app.post("/signin", (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	if (!email || !password) res.status(401).json({ message: "invalid data" });
	try {
		const token = jwt.sign(
			{
				data: {
					email,
					password,
				},
			},
			process.env.jwt_secret,
			{ expiresIn: "1h" }
		);
		res.status(200).json({ message: "signed in successfully", token: token });
	} catch (err) {
		res.status(500).json({ message: "server error", error: err });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
