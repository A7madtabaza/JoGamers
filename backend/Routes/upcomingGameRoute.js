const express = require("express");
const router = express.Router();
const multer = require("multer");
const upcomingGameController = require("../controllers/upcomingGameController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single("featuredImage");

router.post("/create", upload, upcomingGameController.createUpcomingGameRelease);
router.get("/", upcomingGameController.getUpcomingGameReleases);
router.get("/:id", upcomingGameController.getUpcomingGameRelease);
router.put("/:id", upload, upcomingGameController.updateUpcomingGameRelease);
router.delete("/edit-releases/:id", upcomingGameController.deleteUpcomingGameRelease);

module.exports = router;
