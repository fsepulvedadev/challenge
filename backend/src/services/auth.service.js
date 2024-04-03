const { models } = require("../libs/sequelize");
const bcrypt = require("bcrypt");
const { jwtTokens } = require("../utils/jwt-helpers");
const jwt = require("jsonwebtoken");

class AuthService {
	constructor() {}

	async login(email, password) {
		const user = await models.User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			throw new Error("Invalid email");
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			throw new Error("Invalid password");
		}

		const tokens = jwtTokens({
			user_id: user.id,
			email: user.email,
			name: user.name,
		});

		return { tokens, user };
	}

	async register(data) {
		try {
			const user = await models.User.create(data);
			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async refreshToken(refreshToken) {
		const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		const tokens = jwtTokens({
			user_id: user.user_id,
			email: user.email,
			name: user.name,
		});

		return tokens;
	}
}

module.exports = AuthService;
