const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/submit', contactController.submitContactForm);

module.exports = router;