const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routerApi = require("./routes/index");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

routerApi(app);

module.exports = app;
