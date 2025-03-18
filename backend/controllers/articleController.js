const cloudinary = require('cloudinary').v2;
const Article = require('../Models/Article');
const Publisher = require('../Models/Publisher');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.createArticle = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const images = [];

        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const result = await cloudinary.uploader.upload(req.files[i].path);
                images.push(result.secure_url);
            }
        }

        const userId = "67d18cd9b916d6dfdc44c9ac";
        const newArticle = new Article({
            title,
            content,
            tags: tags.split(","), 
            categories,
            publishedBy: userId,  
            images: images,
        });

        await newArticle.save();
        res.status(201).json({ message: "Article created successfully", article: newArticle });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating article", error: err.message });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find()
          .sort({ createdAt: -1 })
          .populate("publishedBy", "name")
          .exec();
        res.status(200).json({ articles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching articles", error: err.message });
    }
};

exports.getArticleById = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id)
            .populate("publishedBy", "name")  // If you want to populate the publisher details
            .exec();

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ article });
    } catch (err) {
        console.error("Error fetching article:", err);
        res.status(500).json({ message: "Error fetching article", error: err.message });
    }
};


// Update Article
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params; // Get the article ID from the params
        const { title, content, categories, tags } = req.body;
        const updatedData = { title, content, categories, tags };

        // Check if any new images are uploaded
        if (req.files && req.files.length > 0) {
            const images = [];
            for (let i = 0; i < req.files.length; i++) {
                const result = await cloudinary.uploader.upload(req.files[i].path);
                images.push(result.secure_url);
            }
            updatedData.images = images; // Update the images array
        }

        // Update the article
        const updatedArticle = await Article.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ message: "Article updated successfully", article: updatedArticle });
    } catch (err) {
        console.error("Error updating article:", err);
        res.status(500).json({ message: "Error updating article", error: err.message });
    }
};





