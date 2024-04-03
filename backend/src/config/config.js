require("dotenv").config();

const config = {
	env: process.env.NODE_ENV || "dev",
	port: process.env.PORT || 3000,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	jwtSecret: process.env.ACCESS_TOKEN_SECRET,
	jwtExpiration: process.env.REFRESH_TOKEN_SECRET,
};

module.exports = { config };
