import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRelease = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [featuredImage, setFeaturedImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchRelease = async () => {
            setFetchLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/upcoming-releases/${id}`);
                const release = response.data.release;
                setTitle(release.title);
                setDescription(release.description);
                setReleaseDate(formatDate(release.releaseDate));
                setCurrentImage(release.featuredImage);
                setError(null);
            } catch (err) {
                console.error("Error fetching release:", err);
                setError("Failed to fetch release details. Please try again later.");
            } finally {
                setFetchLoading(false);
            }
        };        
        fetchRelease();
    }, [id]);

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
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("releaseDate", releaseDate);
        if (featuredImage) {
            formData.append("featuredImage", featuredImage);
        }

        try {
            await axios.put(`http://localhost:5000/api/upcoming-releases/${id}`, formData);
            showNotification("Release updated successfully!", "success");
            navigate('/publisher');        
        } catch (err) {
            console.error("Error updating release:", err);
            showNotification("Error updating the release.", "error");
            setLoading(false);
        }
    };

    const showNotification = (message, type) => {
        alert(message);
    };

    const handleCancel = () => {
        navigate('/upcoming-releases');
    };

    if (fetchLoading) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto my-8 flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto my-8">
            <div className="flex items-center mb-6">
                <button 
                    onClick={handleCancel}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Go back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <h2 className="text-3xl font-bold text-gray-800">Edit Release</h2>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-gray-600">You are editing release ID: <span className="font-mono text-blue-600">{id}</span></p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            <label className="flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-500 focus:outline-none">
                                <span className="flex flex-col items-center space-y-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <span className="text-sm text-gray-500">
                                        {featuredImage ? featuredImage.name : "Choose a new image (optional)"}
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
                        <div className="flex-shrink-0">
                            {(imagePreview || currentImage) && (
                                <div className="relative h-32 w-32 border rounded-md overflow-hidden">
                                    <img 
                                        src={imagePreview || currentImage} 
                                        alt="Release preview" 
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/api/placeholder/128/128";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs">Current image</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 p-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 p-3 ${
                            loading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-semibold rounded-lg transition-colors flex items-center justify-center`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </>
                        ) : (
                            "Update Release"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditRelease;