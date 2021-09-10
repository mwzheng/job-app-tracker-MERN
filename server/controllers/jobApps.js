const JobApp = require('../models/JobApp');

exports.getJobApps = async (req, res) => {
    try {
        const allJobApps = await JobApp.find();

        return res.status(200).json({
            success: true,
            mssg: 'Retreiving all job apps',
            count: allJobApps.length,
            data: allJobApps,
        });
    } catch {
        return res.status(500).json({
            success: false,
            mssg: 'Failed to retrieve all job apps',
            error: "Server error"
        });
    }
}

exports.addJobApp = async (req, res) => {
    try {
        const newJobApp = await JobApp.create(req.body);

        return res.status(201).json({
            success: true,
            mssg: 'Added new job app',
            newJobApp: newJobApp
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                mssg: 'Failed to add new job app',
                type: 'Bad Request',
                error: messages,
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error',
            });
        }
    }
}

exports.updateJobApp = async (req, res) => {

}

exports.deleteJobApp = async (req, res) => {

}