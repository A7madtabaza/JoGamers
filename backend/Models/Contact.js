// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     subject: {
//         type: String,
//         required: true,
//     },
//     message: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Contact = mongoose.model("Contact", contactSchema);
// module.exports = Contact;

const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = mongoose.model('Contact', ContactSchema);