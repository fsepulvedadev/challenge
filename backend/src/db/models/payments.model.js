const { Model, DataTypes } = require("sequelize");

const PAYMENTS_TABLE = "payments";

class Payment extends Model {
	static config(sequelize) {
		return {
			sequelize,
			tableName: PAYMENTS_TABLE,
			modelName: "Payment",
			timestamps: true,
		};
	}
}

const PaymentSchema = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "payment_id",
	},
	amount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
		field: "amount",
	},

	date: {
		type: DataTypes.DATE,
		allowNull: false,
		field: "date",
		isDate: true,
	},
	paidTo: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "paid_to",
	},
	paymentType: {
		type: DataTypes.ENUM,
		values: ["credit card", "debit card", "cash"],
		allowNull: false,
		field: "payment_type",
	},
};

module.exports = {
	Payment,
	PaymentSchema,
};
