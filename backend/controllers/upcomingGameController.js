const cloudinary = require('cloudinary').v2;
const UpcomingGameRelease = require('../models/UpcomingGameRelease');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.createUpcomingGameRelease = async (req, res) => {
    try {
        const { title, description, releaseDate } = req.body;
        const images = [];

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            images.push(result.secure_url);
        }

        const userId = "67d18cd9b916d6dfdc44c9ac";

        const newUpcomingGameRelease = new UpcomingGameRelease({
            title,
            description,
            releaseDate,
            createdBy: userId,
            featuredImage: images[0],
        });

        await newUpcomingGameRelease.save();
        res.status(201).json({ message: "Upcoming game release created successfully", upcomingGameRelease: newUpcomingGameRelease });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating upcoming game release", error: err.message });
    }
};

exports.getUpcomingGameReleases = async (req, res) => {
    try {
        const upcomingGameReleases = await UpcomingGameRelease.find()
            .populate('createdBy', 'name')
            .exec();
        res.status(200).json({ upcomingGameReleases });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching upcoming game releases", error: err.message });
    }
};

exports.getUpcomingGameRelease = async (req, res) => {
    const { id } = req.params;
    try {
        const release = await UpcomingGameRelease.findById(id)
            .populate('createdBy', 'name')
            .exec();

        if (!release) {
            return res.status(404).json({ message: "Release not found" });
        }

        res.status(200).json({ release });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching release", error: err.message });
    }
};


// Update upcoming game release
exports.updateUpcomingGameRelease = async (req, res) => {
    try {
        const { id } = req.params; // Get the article id from params
        const { title, description, releaseDate } = req.body;
        const updatedData = { title, description, releaseDate };

        // Check if a new image is uploaded
        if (req.file) {
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            updatedData.featuredImage = result.secure_url;  // Update the image URL
        }

        // Update the upcoming game release
        const updatedRelease = await UpcomingGameRelease.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!updatedRelease) {
            return res.status(404).json({ message: "Upcoming Game Release not found" });
        }

        res.status(200).json({ message: "Upcoming Game Release updated successfully", updatedRelease });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating upcoming game release", error: err.message });
    }
};


// Delete upcoming game release
exports.deleteUpcomingGameRelease = async (req, res) => {
    try {
        const { id } = req.params; // Get the article id from params

        // Find and delete the release
        const deletedRelease = await UpcomingGameRelease.findByIdAndDelete(id);
        
        if (!deletedRelease) {
            return res.status(404).json({ message: "Upcoming Game Release not found" });
        }

        res.status(200).json({ message: "Upcoming Game Release deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting upcoming game release", error: err.message });
    }
};
