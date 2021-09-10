const express = require('express');
const connectDb = require('./db');

const dotenv = require('dotenv');
dotenv.config();

connectDb();

const app = express();

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Starting job-app-tracker server, listening on port: ${process.env.PORT_NUMBER}`);
})