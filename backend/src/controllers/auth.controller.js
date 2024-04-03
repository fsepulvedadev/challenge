const AuthService = require("../services/auth.service");

const authService = new AuthService();

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { tokens } = await authService.login(email, password);
		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
		});
		res.json(tokens);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const register = async (req, res) => {
	try {
		const user = await authService.register(req.body);
		const newUser = { email: user.email, name: user.name, id: user.id };
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const refreshToken = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		console.log(req.cookies);
		const tokens = await authService.refreshToken(refreshToken);
		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
		});
		res.json(tokens);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const clearToken = async (req, res) => {
	try {
		res.clearCookie("refreshToken");
		res.status(200).json({ message: "Successful logout" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	login,
	register,
	refreshToken,
	clearToken,
};
