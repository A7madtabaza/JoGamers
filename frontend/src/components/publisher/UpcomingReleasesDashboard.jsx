import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";  // Import the required React icons

function UpcomingReleasesDashboard() {
    const [isHovered, setIsHovered] = useState(false);
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch upcoming releases from the API
    useEffect(() => {
        const fetchReleases = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/upcoming-releases");
                setReleases(response.data.upcomingGameReleases);
                setError(null);
            } catch (error) {
                console.error("Error fetching upcoming releases:", error);
                setError("Failed to load releases. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchReleases();
    }, []);

    // Delete an upcoming game release
    const deleteRelease = async (id) => {
        if (!confirm("Are you sure you want to delete this release?")) return;
        
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:5000/api/upcoming-releases/${id}`);
            setReleases(releases.filter(release => release._id !== id));
            showToast(response.data.message, "success");
        } catch (error) {
            console.error("Error deleting release:", error);
            showToast("Error deleting the release", "error");
        } finally {
            setLoading(false);
        }
    };

    // Simple toast function (you'd replace this with a proper toast component)
    const showToast = (message, type) => {
        console.log(`${type.toUpperCase()}: ${message}`);
    };

    // Redirect to the edit page
    const editRelease = (id) => {
        console.log(`Redirect to edit release with ID: ${id}`);
        // Implement redirection to edit page or modal
        window.location.href = `/edit-releases/${id}`;
    };

    // Format date in a more readable way
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-[#EFF5F5] p-6 rounded-2xl min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#497174] border-b-4 border-[#EB6440] pb-2 inline-block">
                        Upcoming Releases
                    </h2>
                    <p className="text-gray-600 mt-2">Plan and manage your product launch schedule</p>
                </div>
                <button
                    className={`bg-[#EB6440] hover:bg-[#d05a3a] text-white px-6 py-3 rounded-lg shadow-lg font-medium flex items-center gap-2 transition-all duration-300 ${isHovered ? "translate-y-1 shadow-md" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => window.location.href = "/create-release"}
                >
                    <FaPlus className="h-5 w-5" />
                    Schedule Release
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-[#D6E4E5] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#497174] p-2 rounded-full">
                            <FaPlus className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#497174]">Release Calendar</h3>
                    </div>
                    
                    <div className="text-sm text-[#497174] bg-[#D6E4E5] px-3 py-1 rounded-full">
                        {releases.length} {releases.length === 1 ? 'Release' : 'Releases'}
                    </div>
                </div>

                <p className="text-gray-600 text-lg mb-8">
                    Manage upcoming releases here. Add, edit, and schedule releases for future publication.
                </p>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#497174]"></div>
                    </div>
                )}

                {error && !loading && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && releases.length === 0 && (
                    <div className="flex flex-col items-center py-12">
                        <div className="relative bg-[#D6E4E5] p-8 rounded-lg mb-4">
                            <FaPlus className="h-24 w-24 text-[#497174] opacity-70" />
                            <div className="absolute bottom-4 right-4 bg-[#EB6440] text-white p-2 rounded-full">
                                <FaPlus className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-center text-[#497174] mt-2 font-medium text-lg">No upcoming releases scheduled</p>
                        <p className="text-center text-gray-500 mb-4">Start by creating your first release</p>
                        <button onClick={() => window.location.href = "/create-release"} className="mt-2 px-6 py-2 bg-[#EB6440] text-white font-medium rounded-lg hover:bg-[#d05a3a] transition-colors">
                            Create Release
                        </button>
                    </div>
                )}

                {!loading && !error && releases.length > 0 && (
                    <div className="mt-8 border-t border-[#D6E4E5] pt-8">
                        {releases.map((release, idx) => (
                            <div key={idx} className={`group border-b border-[#D6E4E5] py-4 hover:bg-[#EFF5F5] transition-colors rounded-lg px-3 ${idx === 0 ? 'border-t' : ''}`}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="flex-shrink-0 relative">
                                        <img
                                            src={release.featuredImage || "/api/placeholder/96/96"}
                                            alt={release.title}
                                            className="w-20 h-20 object-cover rounded-lg shadow border border-[#D6E4E5]"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/api/placeholder/96/96";
                                            }}
                                        />
                                        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-[#D6E4E5] text-[#497174] text-xs font-bold px-2 py-1 rounded-full">
                                            {new Date(release.releaseDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-[#497174] group-hover:text-[#EB6440] transition-colors">{release.title}</h3>
                                        <p className="text-gray-600 line-clamp-2">{release.description}</p>
                                        <p className="text-sm text-[#497174] mt-1">Release date: {formatDate(release.releaseDate)}</p>
                                    </div>
                                    <div className="sm:ml-auto flex flex-row sm:flex-col gap-3 mt-3 sm:mt-0">
                                        <button
                                            className="px-4 py-1 bg-[#497174] text-white rounded-lg hover:bg-[#3a5a5c] transition-colors flex items-center gap-1"
                                            onClick={() => editRelease(release._id)}
                                        >
                                            <FaEdit className="h-4 w-4" />
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-1 bg-[#EB6440] text-white rounded-lg hover:bg-[#d05a3a] transition-colors flex items-center gap-1"
                                            onClick={() => deleteRelease(release._id)}
                                        >
                                            <FaTrashAlt className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UpcomingReleasesDashboard;
