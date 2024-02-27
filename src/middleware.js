const jwt = require("jsonwebtoken");

function authenticateAndAuthorize(role) {
	return (req, res, next) => {
		const token = req.headers.authorization;

		// Check if token is provided
		if (!token) {
			return res
				.status(401)
				.json({ message: "Authorization token is required." });
		}

		try {
			// Verify the token
			const decoded = jwt.verify(token, process.env.jwt_secret);

			// Check if user has the required role
			if (role && decoded.role !== role) {
				return res
					.status(403)
					.json({ message: "You are not authorized to access this resource." });
			}

			// Attach user information to the request object
			req.user = decoded;

			// Proceed to the next middleware or route handler
			next();
		} catch (error) {
			return res.status(401).json({ message: "Invalid token." });
		}
	};
}

module.exports = authenticateAndAuthorize;
