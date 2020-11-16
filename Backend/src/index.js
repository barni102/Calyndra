const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');

// import Routes
const userRoute = require("./routes/user");


dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
    console.log("connected to db")
);

//Middleware
app.use(express.json());
app.use("/api/user", userRoute);

app.listen(process.env.SERVER_PORT, () => console.log("Server Up and running in"));