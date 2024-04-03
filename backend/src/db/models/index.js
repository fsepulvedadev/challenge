const { Payment, PaymentSchema } = require("./payments.model");
const { User, UserSchema } = require("./user.model");

function setupModels(sequelize) {
	Payment.init(PaymentSchema, Payment.config(sequelize));
	User.init(UserSchema, User.config(sequelize));
}

module.exports = {
	setupModels,
};
