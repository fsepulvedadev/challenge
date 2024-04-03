const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const USERS_TABLE = "users";

class User extends Model {
	static config(sequelize) {
		return {
			sequelize,
			tableName: USERS_TABLE,
			modelName: "User",
			timestamps: true,
		};
	}
}

const UserSchema = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "user_id",
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "name",
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "email",
		unique: {
			msg: "Email already exists",
		},
		validate: {
			isEmail: {
				msg: "Wrong email format",
			},
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "password",
		set(value) {
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(value, salt);
			this.setDataValue("password", hashedPassword);
		},
	},
};

module.exports = {
	User,
	UserSchema,
};
