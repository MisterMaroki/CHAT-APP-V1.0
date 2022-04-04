const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./server/routes/auth");
const messageRoutes = require("./server/routes/messages");
const app = express();
const socket = require("socket.io");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB Connetion Successful");
	})
	.catch((err) => {
		console.log(err.message);
	});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
	console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("public/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
	});
}

global.onlineUsers = new Map();
io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-recieve", data.msg);
		}
	});
});
