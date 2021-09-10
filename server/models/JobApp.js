const mongoose = require('mongoose');

const JobAppSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Missing App Date"],
    },
    name: {
        type: String,
        required: [true, "Missing App Name"],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Missing App Location"],
        trim: true,
    },
    link: {
        type: String,
        required: [true, "Missing App Link"],
        trim: true,
    },
    progress: {
        type: String,
        required: [true, "Missing App Link"],
    },
    status: {
        type: String,
        required: [true, "Missing App Status"],
    }
});

module.exports = mongoose.model("JobApp", JobAppSchema);