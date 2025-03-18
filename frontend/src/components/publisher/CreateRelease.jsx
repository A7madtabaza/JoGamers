import React, { useState } from "react";
import axios from "axios";

const CreateRelease = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [featuredImage, setFeaturedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState({ message: "", type: "" });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormStatus({ message: "", type: "" });

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("releaseDate", releaseDate);
        if (featuredImage) {
            formData.append("featuredImage", featuredImage);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/upcoming-releases/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFormStatus({ message: response.data.message, type: "success" });
            // Reset form fields
            setTitle("");
            setDescription("");
            setReleaseDate("");
            setFeaturedImage(null);
            setImagePreview(null);
        } catch (error) {
            setFormStatus({ 
                message: error.response?.data?.message || "Error creating release", 
                type: "error" 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto my-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">📝</span>
                Create New Release
            </h2>

            {formStatus.message && (
                <div className={`p-4 mb-6 rounded-md ${
                    formStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                    {formStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        placeholder="Enter release title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        placeholder="Describe the release"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-grow">
                            <label className="flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 focus:outline-none">
                                <span className="flex flex-col items-center space-y-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <span className="text-sm text-gray-500">
                                        {featuredImage ? featuredImage.name : "Choose or drag and drop image"}
                                    </span>
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {imagePreview && (
                            <div className="flex-shrink-0 h-32 w-32 border rounded-md overflow-hidden">
                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-4 ${
                            loading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                        } text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:-translate-y-0.5`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        ) : (
                            "Create Release"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateRelease;