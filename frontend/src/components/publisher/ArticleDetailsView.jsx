import { useParams } from "react-router-dom";  // Use to get the article ID from the URL
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const ArticleDetailsView = () => {
    const { id } = useParams();  // Capture the article ID from the URL
    const [article, setArticle] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [updatedCategories, setUpdatedCategories] = useState("");
    const [updatedTags, setUpdatedTags] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;  // Check if ID exists
            try {
                const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
                setArticle(response.data.article);  // Save the fetched article
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, [id]);  // Fetch article data whenever the ID changes

    useEffect(() => {
        if (article) {
            setUpdatedTitle(article.title);
            setUpdatedContent(article.content);
            setUpdatedCategories(article.categories.join(", "));
            setUpdatedTags(article.tags.join(", "));
        }
    }, [article]);

    const handleUpdate = async () => {
        console.log('Selected article:', article);

        if (!article._id) {
            console.error("Article ID is missing or invalid.");
            return;
        }

        const updatedArticle = {
            title: updatedTitle,
            content: updatedContent,
            categories: updatedCategories.split(",").map((cat) => cat.trim()),
            tags: updatedTags.split(",").map((tag) => tag.trim()),
        };

        const formData = new FormData();
        formData.append("title", updatedArticle.title);
        formData.append("content", updatedArticle.content);
        formData.append("categories", updatedArticle.categories);
        formData.append("tags", updatedArticle.tags);

        const imageFiles = fileInputRef.current?.files;
        if (imageFiles && imageFiles.length > 0) {
            Array.from(imageFiles).forEach(file => {
                formData.append("images", file);
            });
        }

        try {
            await axios.put(`http://localhost:5000/api/articles/${article._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating article:", error);
        }
    };

    if (!article) return <div>Loading...</div>;  // Render a loading state while fetching the article

    const getStatusBadge = (approved) => {
        return approved ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                Approved
            </span>
        ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <span className="w-2 h-2 mr-1 rounded-full bg-yellow-500"></span>
                Pending
            </span>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{isEditing ? "Edit Article" : article.title}</h2>
                    <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-md">
                        {isEditing ? "Cancel Edit" : "Edit"}
                    </button>
                </div>

                <div className="mt-4">
                    <p>{getStatusBadge(article.approved)}</p>
                </div>

                {/* Article content */}
                <div className="mt-6">
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            />
                            <textarea
                                value={updatedContent}
                                onChange={(e) => setUpdatedContent(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                rows="5"
                            />
                            <input
                                type="text"
                                value={updatedCategories}
                                onChange={(e) => setUpdatedCategories(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                placeholder="Categories (comma separated)"
                            />
                            <input
                                type="text"
                                value={updatedTags}
                                onChange={(e) => setUpdatedTags(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                placeholder="Tags (comma separated)"
                            />
                            <input type="file" ref={fileInputRef} multiple className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                    ) : (
                        <div>
                            <p>{article.content}</p>
                            <div className="mt-4">
                                <p><strong>Categories:</strong> {article.categories.join(", ")}</p>
                                <p><strong>Tags:</strong> {article.tags.join(", ")}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleUpdate}
                        disabled={!isEditing}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailsView;
