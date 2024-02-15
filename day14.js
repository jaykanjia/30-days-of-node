require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

const expirationTime = 3600000; // 1 hour
// Cache object to store responses
const cache = {};
// static data to replicate fetch api
const staticData = "Hello";

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
	// Your implementation here
	const { url } = req;
	const cacheEntry = cache[url];
	if (cacheEntry) {
		const { timestamp, data } = cacheEntry;

		if (Date.now() - timestamp < expirationTime) {
			console.log(`Cache hit for ${url}`);
			return res.send(`data from cache -> ${data}`);
		} else {
			// Cache expired, remove it
			delete cache[url];
		}
	} else {
		cache[url] = {
			timestamp: Date.now(),
			data: staticData,
		};
	}
	next();
}

app.use(cachingMiddleware);

app.get("/", (req, res) => {
	res.send(staticData);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
