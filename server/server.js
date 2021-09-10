const jobApp = require('./routes/jobApps');
const express = require('express');
const connectDb = require('./db');

const dotenv = require('dotenv');
dotenv.config();

connectDb();

const app = express();
app.use(express.json());
app.use('/api/v1/jobApps', jobApp);

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Starting job-app-tracker server, listening on port: ${process.env.PORT_NUMBER}`);
})