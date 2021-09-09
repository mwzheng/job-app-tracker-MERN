const express = require('express');

const portNumb = 5000;

const app = express();

app.use(express.json());

app.listen(portNumb, () => {
    console.log(`Starting job-app-tracker server, listening on port: ${portNumb}`);
})