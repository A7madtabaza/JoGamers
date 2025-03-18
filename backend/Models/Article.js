const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: [String],
    categories: [String],
    publishedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    images: [String],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
},
{ timestamps: true }
);

// ADD - Like
articleSchema.methods.addLike = function (userId) {
    if (!this.likes.includes(userId)) {
        this.likes.push(userId);
        return this.save();
    }
    throw new Error("User has already liked this article.");
};

// REMOVE - Like
articleSchema.methods.removeLike = function (userId) {
    this.likes = this.likes.filter(like => like.toString() !== userId.toString());
    return this.save();
};

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
