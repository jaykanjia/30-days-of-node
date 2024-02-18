require("dotenv").config();
const express = require("express");
const app = express();
const connectToMongoDB = require("./db/config");

// import routes
const userRoute = require("./routes/userRoute");

const PORT = process.env.PORT || 5001;

// function call for database connection
connectToMongoDB();

app.use(express.json());
// defining the routes
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
	res.send("Welcome");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
