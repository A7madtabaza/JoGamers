const express = require("express");
const router = express.Router();
const multer = require("multer");
const articleController = require("../controllers/articleController");

// Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage }).array("images", 10);


router.get("/",                articleController.getArticles);
router.post("/create", upload, articleController.createArticle);
router.put("/articles/:id", upload, articleController.updateArticle);
router.get("/articles/:id", articleController.getArticleById);  // Fetch article by ID

module.exports = router;
