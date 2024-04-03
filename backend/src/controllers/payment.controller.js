const PaymentService = require("../services/payment.service");

const paymentService = new PaymentService();

const createPayment = async (req, res) => {
	try {
		const payment = await paymentService.create(req.body);
		res.status(201).json(payment);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPayments = async (req, res) => {
	try {
		const payments = await paymentService.findAllRecent();
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPaymentById = async (req, res) => {
	try {
		const payment = await paymentService.findOne(req.params.id);
		res.json(payment);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getMostRecentFirst = async (req, res) => {
	try {
		const payments = await paymentService.findAllRecent();
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getOldestFirst = async (req, res) => {
	try {
		const payments = await paymentService.findAllOlder();
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPaymentsByDate = async (req, res) => {
	try {
		console.log(req.query);
		const { date } = req.query;
		const payments = await paymentService.findByDate(date);
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPaymentsByAmountRange = async (req, res) => {
	try {
		const { min, max } = req.query;

		const payments = await paymentService.findByAmountRange(min, max);
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPaymentsByPaymentType = async (req, res) => {
	try {
		const { type } = req.query;
		const payments = await paymentService.findByPaymentType(type);
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPaymentsByPaidTo = async (req, res) => {
	try {
		const { to } = req.query;
		const payments = await paymentService.findByPaidTo(to);
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updatePayment = async (req, res) => {
	try {
		const payment = await paymentService.update(req.params.id, req.body);
		res.json(payment);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deletePayment = async (req, res) => {
	try {
		await paymentService.delete(req.params.id);
		res.json({ deleted: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createPayment,
	getPayments,
	getPaymentById,
	updatePayment,
	deletePayment,
	getMostRecentFirst,
	getOldestFirst,
	getPaymentsByDate,
	getPaymentsByAmountRange,
	getPaymentsByPaymentType,
	getPaymentsByPaidTo,
};
