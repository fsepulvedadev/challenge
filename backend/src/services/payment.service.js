const { models } = require("../libs/sequelize");
const { Op } = require("sequelize");

class PaymentService {
	constructor() {}

	async find() {
		const res = await models.Payment.findAll();

		return res;
	}

	async findOne(id) {
		const res = await models.Payment.findByPk(id);

		return res;
	}

	async create(data) {
		const res = await models.Payment.create(data);

		return res;
	}

	async update(id, data) {
		const model = await this.findOne(id);
		const res = await model.update(data);

		return res;
	}

	async delete(id) {
		const model = await this.findOne(id);
		const res = await model.destroy();

		return { deleted: true };
	}

	async findAllRecent() {
		const res = await models.Payment.findAll({
			order: [["createdAt", "DESC"]],
		});

		return res;
	}
	async findAllOlder() {
		const res = await models.Payment.findAll({
			order: [["createdAt", "ASC"]],
		});

		return res;
	}
	async findByDate(date) {
		const formattedDate = new Date(date);
		const res = await models.Payment.findAll({
			where: {
				createdAt: {
					[Op.gte]: `${formattedDate}`,
				},
			},
		});

		return res;
	}

	async findByAmountRange(minAmount, maxAmount) {
		const res = await models.Payment.findAll({
			where: {
				amount: {
					[Op.gte]: minAmount,
					[Op.lte]: maxAmount,
				},
			},
		});

		return res;
	}

	async findByPaymentType(paymentType) {
		const res = await models.Payment.findAll({
			where: {
				paymentType: paymentType,
			},
		});

		return res;
	}

	async findByPaidTo(paidTo) {
		const res = await models.Payment.findAll({
			where: {
				paidTo: paidTo,
			},
		});

		return res;
	}
}

module.exports = PaymentService;
