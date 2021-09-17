const JobApp = require('../models/JobApp');

// Returns server error
const errorStatus = (res, statusCode, errMsg) => {
    return res.status(statusCode).json({
        success: false,
        error: errMsg,
    });
}

exports.getJobApps = async (req, res) => {
    try {
        const allJobApps = await JobApp.find();

        return res.status(200).json({
            success: true,
            count: allJobApps.length,
            data: allJobApps,
        });
    } catch {
        return errorStatus(res, 500, "Server error");
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
            return errorStatus(res, 400, messages);
        } else {
            return errorStatus(res, 500, "Server error");
        }
    }
}

exports.deleteJobApp = async (req, res) => {
    try {
        const jobAppId = req.params.id;

        JobApp.findByIdAndDelete(jobAppId,
            (err, removedJob) => {
                if (err || removedJob == null)
                    errorStatus(res, 404, `Job app with id ${jobAppId} not found`);
                else {
                    return res.status(200).json({
                        success: true,
                        jobRemoved: removedJob,
                    });
                }
            })
    } catch {
        return errorStatus(res, 500, "Server error");
    }
}

exports.updateJobApp = async (req, res) => {
    try {
        const updatedJobApp = await JobApp.findByIdAndUpdate(req.params.id, { $set: req.body },
            { useFindAndModify: false, new: true })

        return res.status(200).json({
            success: true,
            data: updatedJobApp
        });
    } catch {
        return errorStatus(res, 500, "Server error");
    }
}