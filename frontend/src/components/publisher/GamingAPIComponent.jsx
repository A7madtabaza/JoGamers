import React, { useState, useEffect } from "react";
import { Star, List, Grid } from "lucide-react";
import Navbar from "../navbar/Navbar";

const GamingAPIComponent = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://api.rawg.io/api/games?page_size=50&ordering=-added&key=3d02fb394f4845d8ab49066b17433a46");
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        setGames(data.results);
      } catch (err) {
        setError("Failed to fetch data from the API.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const sortGames = (method) => {
    setSortBy(method);
    let sortedGames = [...games];
    switch (method) {
      case "name":
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        sortedGames.sort((a, b) => b.rating - a.rating);
        break;
      case "release":
        sortedGames.sort((a, b) => new Date(b.released) - new Date(a.released));
        break;
      default:
        sortedGames.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0));
        break;
    }
    setGames(sortedGames);
  };

  const toggleView = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading the top games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <p className="text-center text-red-500 font-bold text-xl">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 mx-auto block"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
     <Navbar/ >
    <div className="mt-15 min-h-screen bg-gray-50" style={{ backgroundColor: "#EFF5F5" }}>
     
      <header className=" bg-gray-800 text-white py-6 sticky" style={{ backgroundColor: "#497174" }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Top 50 Most Profitable Games</h1>
          <p className="text-center mt-2 text-gray-300" style={{ color: "#D6E4E5" }}>The definitive ranking of gaming's biggest money-makers</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 pt-32"> {/* Added padding top here */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-medium mr-2" style={{ color: "#497174" }}>Sort by:</span>
            <div className="inline-flex rounded-md shadow-sm">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${sortBy === "popularity" ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`} 
                style={sortBy === "popularity" ? { backgroundColor: "#EB6440", color: "#FFFFFF" } : {}}
                onClick={() => sortGames("popularity")}
              >
                Popularity
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${sortBy === "rating" ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                style={sortBy === "rating" ? { backgroundColor: "#EB6440", color: "#FFFFFF" } : {}}
                onClick={() => sortGames("rating")}
              >
                Rating
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${sortBy === "name" ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                style={sortBy === "name" ? { backgroundColor: "#EB6440", color: "#FFFFFF" } : {}}
                onClick={() => sortGames("name")}
              >
                Name
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${sortBy === "release" ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                style={sortBy === "release" ? { backgroundColor: "#EB6440", color: "#FFFFFF" } : {}}
                onClick={() => sortGames("release")}
              >
                Release Date
              </button>
            </div>
          </div>
          <button 
            className="px-4 py-2 bg-white text-gray-700 rounded-md shadow hover:bg-gray-100 flex items-center" 
            onClick={toggleView}
          >
            <span className="mr-2">{viewMode === "grid" ? "List View" : "Grid View"}</span>
            {viewMode === "grid" ? <List size={18} /> : <Grid size={18} />}
          </button>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <div 
                key={game.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="relative">
                  <img
                    src={game.background_image || "/api/placeholder/400/200"}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                  />
                  <div 
                    className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center text-white font-bold rounded-br-lg"
                    style={{ backgroundColor: "#EB6440" }}
                  >
                    {index + 1}
                  </div>
                  {game.metacritic && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-70 text-white text-sm rounded">
                      {game.metacritic}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 truncate" style={{ color: "#497174" }}>{game.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-sm" style={{ color: "#497174" }}>
                      {game.released ? new Date(game.released).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "TBA"}
                    </p>
                    <div className="flex items-center">
                      <Star size={16} fill="#FFD700" color="#FFD700" />
                      <span className="ml-1 text-sm" style={{ color: "#497174" }}>
                        {game.rating ? game.rating.toFixed(1) : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {game.genres && game.genres.slice(0, 3).map(genre => (
                      <span 
                        key={genre.id} 
                        className="px-2 py-1 text-xs rounded-full" 
                        style={{ backgroundColor: "#D6E4E5", color: "#497174" }}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-left" style={{ backgroundColor: "#497174", color: "#FFFFFF" }}>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Game</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Release Date</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Genres</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {games.map((game, index) => (
                  <tr key={game.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: "#EB6440" }}>
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-sm object-cover" 
                            src={game.background_image || "/api/placeholder/40/40"} 
                            alt={game.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium" style={{ color: "#497174" }}>{game.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#497174" }}>
                      {game.released ? new Date(game.released).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "TBA"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star size={16} fill="#FFD700" color="#FFD700" />
                        <span className="ml-1 text-sm" style={{ color: "#497174" }}>
                          {game.rating ? game.rating.toFixed(1) : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {game.genres && game.genres.slice(0, 2).map(genre => (
                          <span 
                            key={genre.id} 
                            className="px-2 py-1 text-xs rounded-full" 
                            style={{ backgroundColor: "#D6E4E5", color: "#497174" }}
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default GamingAPIComponent;
