import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, Clock, CheckCircle, Search, Filter, XCircle, ArrowUp } from "lucide-react";

function ArticlesDashboard() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/articles");
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
        
        // Add scroll listener for the scroll-to-top button
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filteredArticles = articles
        .filter(article => {
            const matchesFilter = filter === "all" 
                ? true 
                : filter === "approved" 
                    ? article.approved 
                    : !article.approved;
                    
            const matchesSearch = searchTerm === "" 
                ? true 
                : article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  article.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
                  
            return matchesFilter && matchesSearch;
        });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); 
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">My Articles</h1>
                    <p className="text-blue-100 max-w-2xl">Manage and discover your content collection with our modern dashboard.</p>
                </div>
            </div>
            
            {/* Search and filters */}
            <div className="max-w-7xl mx-auto px-4 py-6 -mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search articles by title, content or category..." 
                                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm("")} 
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    <XCircle size={18} />
                                </button>
                            )}
                        </div>
                        
                        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                            <Filter size={16} className="ml-2 text-gray-500" />
                            <button 
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    filter === "all" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                All
                            </button>
                            <button 
                                onClick={() => setFilter("approved")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    filter === "approved" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                Approved
                            </button>
                            <button 
                                onClick={() => setFilter("pending")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    filter === "pending" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                Pending
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                {filteredArticles.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
                            <Clock size={64} />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No articles found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
                        <button 
                            onClick={() => {setFilter("all"); setSearchTerm("");}}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-6">
                            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article) => (
                                <Link 
                                    to={`/articles/${article._id}`}
                                    key={article._id} 
                                    className="group"
                                >
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col transform group-hover:-translate-y-1">
                                        <div className="h-52 overflow-hidden relative">
                                            <img
                                                src={article.images[0]}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                <span className="text-white font-medium">Click to view details</span>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 backdrop-blur-md ${
                                                        article.approved
                                                            ? "bg-green-100/90 text-green-800 border border-green-300"
                                                            : "bg-yellow-100/90 text-yellow-800 border border-yellow-300"
                                                    }`}
                                                >
                                                    {article.approved ? (
                                                        <>
                                                            <CheckCircle size={12} />
                                                            Approved
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock size={12} />
                                                            Pending
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                                {article.content.substring(0, 120)}...
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {article.categories.slice(0, 3).map((category, idx) => (
                                                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">
                                                        {category}
                                                    </span>
                                                ))}
                                                {article.categories.length > 3 && (
                                                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200">
                                                        +{article.categories.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {formatDate(article.updatedAt)}
                                                </span>
                                                <span className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                                                    <Eye size={16} />
                                                    View
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            {/* Scroll to top button */}
            {showScrollTop && (
                <button 
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </div>
    );
}

export default ArticlesDashboard;