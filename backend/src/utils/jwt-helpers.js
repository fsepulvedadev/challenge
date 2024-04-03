const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function jwtTokens({ user_id, email, name }) {
	const payload = {
		user_id,
		email,
		name,
	};

	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});

	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "14d",
	});

	return { accessToken, refreshToken };
}

module.exports = {
	jwtTokens,
};
