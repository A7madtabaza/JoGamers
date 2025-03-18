import React, { useState } from 'react';
import axios from 'axios';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaGamepad,
  FaDiscord,
  FaTwitch,
  FaSteam
} from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contact/submit', formData);
            alert('Message sent successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            alert('An error occurred while sending the message.');
        }
    };

    return (
        <div className="bg-[#EFF5F5] text-[#497174] min-h-screen">
            {/* Hero section with gaming graphics background */}
            <div className="bg-gradient-to-r from-[#497174] to-[#497174]/80 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1920x1080')] bg-cover bg-center"></div>
                </div>
                <div className="container mx-auto py-16 px-4 relative">
                    <div className="text-center mb-8">
                        <FaGamepad className="inline-block text-4xl mb-4 text-[#D6E4E5]" />
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D6E4E5] to-[#EFF5F5]">
                            Connect With Us
                        </h1>
                        <p className="text-[#D6E4E5] text-lg mt-4">
                            Have questions about gaming news? Want to contribute? Let's talk!
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto my-10 px-4">
                <div className="max-w-6xl mx-auto bg-[#D6E4E5] p-8 rounded-2xl shadow-2xl border border-[#497174]/30">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Contact Information */}
                        <div className="md:w-5/12">
                            <div className="bg-gradient-to-br from-[#497174] to-[#497174]/80 p-8 rounded-xl h-full shadow-lg">
                                <h4 className="font-bold text-white text-xl mb-6 flex items-center">
                                    <FaGamepad className="mr-2 text-[#D6E4E5]" /> 
                                    Contact Information
                                </h4>
                                <h6 className="text-[#D6E4E5] mb-8">Ready to level up your gaming experience?</h6>
                                
                                <div className="space-y-6">
                                    <p className="text-white text-sm flex items-center group">
                                        <FaPhoneAlt className="text-[#D6E4E5] group-hover:text-[#EFF5F5] transition-colors" /> 
                                        <span className="ml-4">+962 000000000</span>
                                    </p>
                                    <p className="text-white text-sm flex items-center group">
                                        <FaEnvelope className="text-[#D6E4E5] group-hover:text-[#EFF5F5] transition-colors" /> 
                                        <span className="ml-4">JoGamers@gmail.com</span>
                                    </p>
                                    <p className="text-white text-sm flex items-center group">
                                        <FaMapMarkerAlt className="text-[#D6E4E5] group-hover:text-[#EFF5F5] transition-colors" /> 
                                        <span className="ml-4">123 Gamer Street, Digital District, Amman, Jordan</span>
                                    </p>
                                </div>
                                
                                <div className="mt-12">
                                    <h6 className="text-[#D6E4E5] mb-4">Follow us</h6>
                                    <div className="flex space-x-4">
                                        <a href="#" className="bg-[#497174]/70 p-2 rounded-lg hover:bg-[#497174] transition-colors">
                                            <FaDiscord className="text-[#EFF5F5] text-xl" />
                                        </a>
                                        <a href="#" className="bg-[#497174]/70 p-2 rounded-lg hover:bg-[#497174] transition-colors">
                                            <FaTwitch className="text-[#EFF5F5] text-xl" />
                                        </a>
                                        <a href="#" className="bg-[#497174]/70 p-2 rounded-lg hover:bg-[#497174] transition-colors">
                                            <FaSteam className="text-[#EFF5F5] text-xl" />
                                        </a>
                                        <a href="#" className="bg-[#497174]/70 p-2 rounded-lg hover:bg-[#497174] transition-colors">
                                            <FaTwitter className="text-[#EFF5F5] text-xl" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="md:w-7/12">
                            <form id="feedbackForm" className="w-full" onSubmit={handleSubmit}>
                                <h3 className="text-2xl font-bold mb-6 text-[#497174]">Send Us A Message</h3>
                                
                                <div className="flex flex-col md:flex-row mb-6 gap-4">
                                    <div className="md:w-1/2">
                                        <label htmlFor="firstName" className="block text-[#497174] text-sm mb-2">First Name</label>
                                        <input 
                                            type="text" 
                                            id="firstName" 
                                            className="w-full p-3 bg-[#EFF5F5] border border-[#497174]/30 rounded-lg focus:ring-2 focus:ring-[#EB6440] focus:border-transparent text-[#497174]" 
                                            placeholder="John" 
                                            required 
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:w-1/2">
                                        <label htmlFor="lastName" className="block text-[#497174] text-sm mb-2">Last Name</label>
                                        <input 
                                            type="text" 
                                            id="lastName" 
                                            className="w-full p-3 bg-[#EFF5F5] border border-[#497174]/30 rounded-lg focus:ring-2 focus:ring-[#EB6440] focus:border-transparent text-[#497174]" 
                                            placeholder="Doe" 
                                            required 
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-[#497174] text-sm mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full p-3 bg-[#EFF5F5] border border-[#497174]/30 rounded-lg focus:ring-2 focus:ring-[#EB6440] focus:border-transparent text-[#497174]" 
                                        placeholder="you@example.com" 
                                        required 
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <label htmlFor="phone" className="block text-[#497174] text-sm mb-2">Phone Number (Optional)</label>
                                    <input 
                                        type="text" 
                                        id="phone" 
                                        className="w-full p-3 bg-[#EFF5F5] border border-[#497174]/30 rounded-lg focus:ring-2 focus:ring-[#EB6440] focus:border-transparent text-[#497174]" 
                                        placeholder="+962 00 000 0000" 
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-[#497174] text-sm mb-2">Topic</label>
                                    <select 
                                        id="subject" 
                                        className="w-full p-3 bg-[#EFF5F5] border border-[#497174]/30 rounded-lg focus:ring-2 focus:ring-[#EB6440] focus:border-transparent text-[#497174]" 
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a Topic</option>
                                        <option value="news">Gaming News</option>
                                        <option value="reviews">Game Reviews</option>
                                        <option value="tech">Gaming Tech</option>
                                        <option value="events">eSports Events</option>
                                        <option value="feedback">Website Feedback</option>
                                    </select>
                                </div>
                                
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-[#497174] text-sm mb-2">Your Message</label>
                                    <textarea 
                                        id="message" 
                                        className="w-full p-3 bg-[#EFF5F5] border border-[#497174]/30 rounded-lg focus:ring-2 focus:ring-[#EB6440] focus:border-transparent text-[#497174]" 
                                        rows="5" 
                                        placeholder="Tell us what's on your mind..." 
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="bg-[#EB6440] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#EB6440]/90 transition-all duration-300 flex items-center cursor-pointer"
                                >
                                    <FaGamepad className="mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map with gaming-themed styling */}
            <div className="container mx-auto px-4 my-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#497174] mb-6 flex items-center">
                        <FaMapMarkerAlt className="mr-2" /> Find Our Gaming Hub
                    </h2>
                    <div className="rounded-xl overflow-hidden border-4 border-[#497174] shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3897576302284!2d36.08261977567354!3d32.05870537397211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sen!2sjo!4v1737142763031!5m2!1sen!2sjo"
                            width="100%" 
                            height="450" 
                            style={{border: 0}} 
                            allowFullScreen="" 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            
            {/* Call to action banner */}
            <div className="bg-gradient-to-r from-[#497174] to-[#497174]/80 py-12 mt-10">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with the Latest Gaming News</h3>
                    <p className="text-[#D6E4E5] mb-8">Subscribe to our newsletter for exclusive gaming content and updates</p>
                    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-grow p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB6440] bg-[#EFF5F5] text-[#497174] border border-[#497174]/30"
                        />
                        <button className="bg-[#EB6440] hover:bg-[#EB6440]/90 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;