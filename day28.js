require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT;

// Array to store connected clients
const clients = [];

// Event handler for new WebSocket connections
io.on("connection", (socket) => {
	// Add the new client to the clients array
	clients.push(socket);

	console.log("client connected.");

	// Event handler for receiving text changes from clients
	socket.on("textChange", (data) => {
		console.log("Text change received:", data);

		// Broadcast the text change to all connected clients except the sender
		socket.broadcast.emit("textChange", data);
	});

	// Event handler for disconnection
	socket.on("disconnect", () => {
		// Remove the disconnected client from the clients array
		const index = clients.indexOf(socket);
		if (index !== -1) {
			clients.splice(index, 1);
		}

		console.log("Client disconnected.");
	});
});

server.listen(PORT, () => {
	console.log("Server is running on port 3000.");
});
