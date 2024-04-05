const app = require("../app.js");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const api = supertest(app);

describe("Payment Routes", () => {
	let token;
	let testPayment;
	let examplePayment;

	beforeAll(async () => {
		// Generate a JWT token for testing purposes
		token = jwt.sign(
			{ userId: "testUser" },
			"87708246f150f04969d23be57ebdc34d618dda8abc307f341482672b6fa0783b",
			{
				expiresIn: "1h",
			},
		);

		// Mock a payment for test
		examplePayment = {
			amount: 120.05,
			date: "2021-07-01T00:00:00.000Z",
			paidTo: "Test",
			paymentType: "credit card",
		};

		// Mock a payment for testing
		testPayment = await api
			.post("/api/payment/")
			.set("Authorization", `Bearer ${token}`)
			.send(examplePayment);

		// Wait for the test payment to be created
		testPaymentId = testPayment.body.id;

		console.log("testPaymentId: ", testPaymentId);
	});

	it("should get all payments", async () => {
		const response = await api
			.get("/api/payment/")
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
	});
	it("should create a new payment", async () => {
		const response = await api
			.post("/api/payment/")
			.set("Authorization", `Bearer ${token}`)
			.send(examplePayment);
		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({
			amount: "120.05",
			date: "2021-07-01T00:00:00.000Z",
			paidTo: "Test",
			paymentType: "credit card",
		});
	});

	it("should get a specific payment", async () => {
		const response = await api
			.get(`/api/payment/id/${testPaymentId}`)
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", testPaymentId);
	});

	it("should update a payment", async () => {
		const response = await api
			.put(`/api/payment/${testPaymentId}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				amount: 20.0,
				date: "2021-07-01",
				paidTo: "Test2",
				paymentType: "cash",
			});
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", testPaymentId);
	});

	it("should delete a payment", async () => {
		const response = await api
			.delete(`/api/payment/${testPaymentId}`)
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).toBe(204, () => {
			console.log(response.body);
		});
	});
});
