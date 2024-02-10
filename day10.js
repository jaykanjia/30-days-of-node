const express = require("express");
const path = require("path");
const app = express();

const publicPath = path.join(__dirname, "public");

// Set up middleware to serve static files
app.use(express.static(publicPath));

// Route for serving index.html on root access
app.get("/", (req, res) => {
	res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/styles/style.css", (req, res) => {
	res.sendFile(path.join(publicPath, "styles", "style.css"));
});

const PORT = 5001;

app.listen(PORT, () => {
	console.log(`Server is running on Port ${PORT}`);
});
