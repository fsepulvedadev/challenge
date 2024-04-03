const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.get("/", paymentController.getPayments);
router.get("/id/:id", paymentController.getPaymentById);
router.get("/recent", paymentController.getMostRecentFirst);
router.get("/older", paymentController.getOldestFirst);
router.get("/date", paymentController.getPaymentsByDate);
router.get("/type", paymentController.getPaymentsByPaymentType);
router.get("/amount", paymentController.getPaymentsByAmountRange);
router.get("/paidto", paymentController.getPaymentsByPaidTo);
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
