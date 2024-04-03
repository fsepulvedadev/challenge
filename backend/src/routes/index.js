const express = require("express");
const paymentRouter = require("./payment.router");
const authRouter = require("./auth.router");
const authenticateToken = require("../middlewares/authorization");

function routerApi(app) {
	const router = express.Router();

	app.use("/api", router);
	router.use("/payment", authenticateToken, paymentRouter);
	router.use("/auth", authRouter);
}

module.exports = routerApi;
