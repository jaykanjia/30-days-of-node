require("dotenv").config();
const express = require("express");
const app = express();
const connectToMongoDB = require("./db/config");

// import routes
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const { errorHandler } = require("./middleware");

const PORT = process.env.PORT || 5001;

// function call for database connection
connectToMongoDB();

app.use(express.json());
// defining the routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

app.get("/", (req, res) => {
	res.send("Welcome");
});

app.get("/error", simulateErrorMiddleware, (req, res) => {
	throw new Error("custom error");
});

// Apply the error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
