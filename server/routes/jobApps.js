const { getJobApps, addJobApp } = require("../controllers/jobApps");
const { deleteJobApp, updateJobApp } = require("../controllers/jobApps");
const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(getJobApps)
    .post(addJobApp)

router
    .route('/:id')
    .delete(deleteJobApp)
    .patch(updateJobApp)

module.exports = router;