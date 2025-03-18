const mongoose = require("mongoose");

const upcomingGameReleaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
        required: true,
    },
    featuredImage: {
        type: String,
        required: true,
    },
});

const UpcomingGameRelease = mongoose.model("UpcomingGameRelease", upcomingGameReleaseSchema);
module.exports = UpcomingGameRelease;
