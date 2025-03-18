const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true,
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
