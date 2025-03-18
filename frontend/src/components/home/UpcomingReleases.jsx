import React, { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";
import { FaGamepad } from "react-icons/fa"; // For PlayStation icon
import { IoGameController } from "react-icons/io5"; // For Xbox and GameController icon

const UpcomingReleases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  // Color palette
  const colors = {
    lightBg: "#EFF5F5",
    mediumBg: "#D6E4E5",
    primary: "#497174",
    accent: "#EB6440",
  };

  const upcomingGames = [
    {
      title: "ATOMFALL",
      releaseDate: "2025-03-27T00:00:00",
      platforms: ["Xbox", "PlayStation", "PC"],
      image: "/api/placeholder/800/450",
      description: "A post-apocalyptic action RPG",
      developer: "Quantum Studios",
      genre: "Action RPG",
    },
    {
      title: "THE FIRST BERSERKER: KHAZAN",
      releaseDate: "2025-03-27T00:00:00",
      platforms: ["Xbox", "PlayStation", "PC"],
      image: "/api/placeholder/800/450",
      description: "An intense fighting game",
      developer: "Nexus Games",
      genre: "Fighting",
    },
    {
      title: "ASSASSIN'S CREED SHADOWS",
      releaseDate: "2025-03-20T00:00:00",
      platforms: ["Xbox", "PlayStation", "PC"],
      image: "/api/placeholder/800/450",
      description: "A new stealth action game from the famous series",
      developer: "Ubisoft",
      genre: "Action Adventure",
    },
    {
      title: "STARFIELD: SHATTERED SPACE",
      releaseDate: "2025-04-10T00:00:00",
      platforms: ["Xbox", "PC"],
      image: "/api/placeholder/800/450",
      description: "First major expansion for Bethesda's space RPG",
      developer: "Bethesda Game Studios",
      genre: "RPG",
    },
    {
      title: "FROSTPUNK 2",
      releaseDate: "2025-04-25T00:00:00",
      platforms: ["PC", "PlayStation", "Xbox"],
      image: "/api/placeholder/800/450",
      description: "Survival city-builder sequel",
      developer: "11 bit studios",
      genre: "Strategy",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      upcomingGames.forEach((game) => {
        newTimeLeft[game.title] = calculateTimeLeft(game.releaseDate);
      });
      setTimeLeft(newTimeLeft);
    }, 60000);

    // Initial calculation
    const initialTimeLeft = {};
    upcomingGames.forEach((game) => {
      initialTimeLeft[game.title] = calculateTimeLeft(game.releaseDate);
    });
    setTimeLeft(initialTimeLeft);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeLeft = (releaseDate) => {
    const timeLeft = new Date(releaseDate) - new Date();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  };

  const visibleGames = () => {
    const displayCount =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const games = [];
    for (let i = 0; i < displayCount; i++) {
      const index = (currentIndex + i) % upcomingGames.length;
      games.push(upcomingGames[index]);
    }
    return games;
  };

  const nextGame = () => {
    setCurrentIndex((currentIndex + 1) % upcomingGames.length);
  };

  const prevGame = () => {
    setCurrentIndex(
      (currentIndex - 1 + upcomingGames.length) % upcomingGames.length
    );
  };

  // Platform icon mapping
  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "pc":
        return <Monitor className="h-4 w-4 mr-1" />;
      case "xbox":
        return <IoGameController className="h-4 w-4 mr-1" />;
      case "playstation":
        return <FaGamepad className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-12 bg-[#EFF5F5] text-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#497174]">
            Upcoming <span className="text-[#EB6440]">Releases</span>
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevGame}
              className="bg-[#D6E4E5] hover:bg-[#497174] hover:text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextGame}
              className="bg-[#D6E4E5] hover:bg-[#497174] hover:text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleGames().map((game, index) => {
            const time = timeLeft[game.title] || {
              days: 0,
              hours: 0,
              minutes: 0,
            };
            return (
              <div
                key={`${game.title}-${index}`}
                className="bg-white border border-[#D6E4E5] rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#497174] to-transparent opacity-50 rounded-t-xl"></div>

                  <div className="absolute top-0 right-0 p-3">
                    <button className="bg-[#497174] bg-opacity-80 hover:bg-[#EB6440] text-white p-2 rounded-full transition-colors">
                      <Bell className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="bg-[#EB6440] text-white text-xs uppercase font-bold px-2 py-1 rounded">
                      {game.genre}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                    <p className="text-gray-100 text-sm">{game.description}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#497174]" />
                      <span className="text-sm">
                        {formatDate(game.releaseDate)}
                      </span>
                    </div>
                    <div className="text-xs text-[#497174]">
                      {game.developer}
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex justify-between mb-4 bg-[#D6E4E5] rounded-lg p-3">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-2xl text-[#497174]">
                        {time.days}
                      </span>
                      <span className="text-xs uppercase text-gray-600">
                        Days
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-2xl text-[#497174]">
                        {time.hours}
                      </span>
                      <span className="text-xs uppercase text-gray-600">
                        Hours
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-2xl text-[#497174]">
                        {time.minutes}
                      </span>
                      <span className="text-xs uppercase text-gray-600">
                        Minutes
                      </span>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-[#EFF5F5] px-3 py-1 rounded-full text-xs font-medium text-[#497174]"
                      >
                        {getPlatformIcon(platform)}
                        {platform}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <a
                    href="#"
                    className="block text-center bg-[#497174] hover:bg-[#EB6440] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {upcomingGames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 rounded-full ${
                  currentIndex === idx ? "bg-[#EB6440]" : "bg-[#D6E4E5]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingReleases;
