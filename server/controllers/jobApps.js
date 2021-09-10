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

}

exports.updateJobApp = async (req, res) => {

}

exports.deleteJobApp = async (req, res) => {

}