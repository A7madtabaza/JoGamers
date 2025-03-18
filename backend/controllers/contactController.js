const Contact = require('../Models/Contact');

exports.submitContactForm = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, subject, message } = req.body;
        const newContact = new Contact({ firstName, lastName, email, phone, subject, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while submitting the form' });
    }
};