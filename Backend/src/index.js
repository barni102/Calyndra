const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');


dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
    console.log("connected to db")
);

//Middleware
app.use(express.json());

app.listen(process.env.SERVER_PORT, () => console.log("Server Up and running in"));