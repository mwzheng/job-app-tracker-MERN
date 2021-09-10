const JobApp = require('../models/JobApp');

exports.getJobApps = async (req, res) => {
    try {
        const allJobApps = await JobApp.find();

        return res.status(200).json({
            success: true,
            count: allJobApps.length,
            data: allJobApps,
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
}

exports.addJobApp = async (req, res) => {
    try {
        const newJobApp = await JobApp.create(req.body);

        return res.status(201).json({
            success: true,
            newJobApp: newJobApp
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                errors: messages,
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error',
            });
        }
    }
}

exports.deleteJobApp = async (req, res) => {
    try {
        const jobAppId = req.params.id;
        const removedJobApp = await JobApp.findByIdAndDelete(jobAppId);

        if (!removedJobApp) {
            return res.status(404).json({
                success: false,
                error: `Job app with id ${jobAppId} not found`,
            })
        }

        return res.status(200).json({
            success: true,
            jobRemoved: removedJobApp,
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
}

exports.updateJobApp = async (req, res) => {

}