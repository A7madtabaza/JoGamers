const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
    upcomingReleases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UpcomingGameRelease",
        },
    ],
});

const Publisher = mongoose.model('Publisher', publisherSchema);
module.exports = Publisher;