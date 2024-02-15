require("dotenv").config();
const express = require("express");

const app = express();

const limit = 5;
const window = 60 * 1000;

const reqDict = {};

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
	// Your implementation here
	const ip = req.ip;
	const now = Date.now();
	if (ip && !reqDict[ip]) {
		reqDict[ip] = {
			count: 1,
			lastReq: now,
		};
	} else {
		const lastReq = reqDict[ip].lastReq;
		const elapsed = now - lastReq;
		if (elapsed < window && reqDict[ip].count >= limit) {
			res.status(429).json({ error: "Too many requests" });
		} else {
			reqDict[ip].count += 1;
			reqDict[ip].lastReq = now;
		}
	}
	next();
}

app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
