const { Sequelize } = require("sequelize");
const { config } = require("../config/config");

const { setupModels } = require("../db/models/index");

const sequelize = new Sequelize(
	config.dbName,
	config.dbUser,
	config.dbPassword,
	{
		host: config.dbHost,
		port: config.dbPort,
		dialect: "postgres",
		logging: false,
	},
);

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
