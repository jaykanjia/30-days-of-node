require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 5001;

app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket server
wss.on("connection", (ws) => {
	console.log("Client connected");

	// Handle messages from clients
	ws.on("message", (message) => {
		console.log(`Received message: ${message}`);
		// Echo back the received message
		ws.send(message);
	});

	// Handle disconnection
	ws.on("close", () => {
		console.log("Client disconnected");
	});
});

app.get("/websocket", (req, res) => {
	res.sendFile(__dirname + "/public/day13.html");
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
