const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
const user = require("./routes/user");

///router middleware
app.use("/api", user);

module.exports = app;
