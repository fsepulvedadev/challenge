const supertest = require("supertest");
const app = require("../app.js");
const api = supertest(app);
const { models } = require("../libs/sequelize");

describe("POST /api/auth/login", () => {
	test("login with valid credentials", async () => {
		const response = await api.post("/api/auth/login").send({
			email: "admin@test.com",
			password: "123456",
		});
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("accessToken");
		expect(response.body).toHaveProperty("refreshToken");
	});
	test("login with invalid credentials", async () => {
		const response = await api.post("/api/auth/login").send({
			email: "wrong@wrong.com",
			password: "wrong",
		});
		expect(response.statusCode).toBe(500);
		expect(response.body).toHaveProperty("error");
	});
});

describe("POST /api/auth/register", () => {
	test("register with valid data", async () => {
		const response = await api.post("/api/auth/register").send({
			email: "test@test.com",
			password: "123456",
			name: "test",
		});
		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty("email");
		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("id");

		// Delete the user from the database
		await models.User.destroy({
			where: {
				email: `${response.body.email}`,
			},
		});
	});
	test("register with invalid data", async () => {
		const response = await api.post("/api/auth/register").send({
			email: "noemail",
			password: "123456",
			name: null,
		});
		expect(response.statusCode).toBe(500);
		expect(response.body).toHaveProperty("error");
	});
});
