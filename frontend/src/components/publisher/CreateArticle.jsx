import React, { useState } from "react";
import { FaBold, FaItalic, FaFileImage, FaTrashAlt, FaRegPaperPlane } from "react-icons/fa";
import axios from "axios";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState("");
    const [tags, setTags] = useState("");
    const [featuredImages, setFeaturedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [activeTab, setActiveTab] = useState("content");

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFeaturedImages([...featuredImages, ...files]);
        
        // Create Preview URLs
        const newPreviews = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setPreviewImages([...previewImages, ...newPreviews]);
    };

    const removeImage = (index) => {
        const updatedImages = [...featuredImages];
        updatedImages.splice(index, 1);
        setFeaturedImages(updatedImages);
        
        const updatedPreviews = [...previewImages];
        updatedPreviews.splice(index, 1);
        setPreviewImages(updatedPreviews);
    };

    const handleBold = () => {
        setContent(content + "<b></b>");
    };

    const handleItalic = () => {
        setContent(content + "<i></i>");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("categories", categories);
        formData.append("tags", tags);
        featuredImages.forEach((image) => {
            formData.append("images", image);
        });
    
        try {
            const response = await axios.post("http://localhost:5000/api/articles/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            alert(response.data.message);
            setLoading(false);
            // Reset Fields After Submission
            setTitle("");
            setContent("");
            setCategories("");
            setTags("");
            setFeaturedImages([]);
            setPreviewImages([]);
        } catch (error) {
            setLoading(false);
            alert("Error creating article.");
        }
    };
    

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <FaRegPaperPlane className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">Create New Article</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all shadow-sm"
                        placeholder="Enter article title..."
                        required
                    />
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button
                            type="button"
                            className={`px-4 py-3 flex-1 font-medium text-sm ${activeTab === 'content' ? 'bg-gray-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('content')}
                        >
                            Content
                        </button>
                        <button
                            type="button" 
                            className={`px-4 py-3 flex-1 font-medium text-sm ${activeTab === 'media' ? 'bg-gray-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('media')}
                        >
                            Media
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-3 flex-1 font-medium text-sm ${activeTab === 'metadata' ? 'bg-gray-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('metadata')}
                        >
                            Categories & Tags
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'content' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Article Content</label>
                                <div className="bg-gray-50 p-2 rounded-lg mb-2 flex items-center space-x-2 text-gray-600">
                                    <button type="button" className="p-1 hover:bg-gray-200 rounded" onClick={handleBold}>
                                        <FaBold className="h-5 w-5" />
                                    </button>
                                    <button type="button" className="p-1 hover:bg-gray-200 rounded" onClick={handleItalic}>
                                        <FaItalic className="h-5 w-5" />
                                    </button>
                                </div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows="8"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                                    placeholder="Write your article content here..."
                                    required
                                />
                            </div>
                        )}

                        {activeTab === 'media' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Images</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        multiple
                                        className="hidden"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <FaFileImage className="h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm font-medium text-green-600">Click to upload</p>
                                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max 2MB)</p>
                                        </div>
                                    </label>
                                </div>
                                
                                {previewImages.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {previewImages.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img 
                                                    src={image.url} 
                                                    alt={`Preview ${index}`} 
                                                    className="h-24 w-full object-cover rounded-lg border border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTrashAlt className="h-4 w-4" />
                                                </button>
                                                <p className="text-xs mt-1 truncate">{image.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'metadata' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                                    <input
                                        type="text"
                                        value={categories}
                                        onChange={(e) => setCategories(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                                        placeholder="Separate categories with commas"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                    <input
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                                        placeholder="Separate tags with commas"
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                    <button
                        type="submit"
                        className={`w-full p-3 ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white font-semibold rounded-lg`}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Article"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;
