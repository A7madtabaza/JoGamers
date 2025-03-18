
import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import LatestNews from "./LatestNews";
// import UpcomingReleases from "./UpcomingReleases";

import {
  Clock,
  ChevronRight,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
import UpcomingReleases from "./UpcomingReleases";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Current date for news timestamp
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#EFF5F5] min-h-screen mt-15">
      <Navbar />

      {/* <UpcomingReleases /> */}

      {/* Hero Section with Featured Article */}
      <section className="bg-[#497174] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured Article */}
            <div className="lg:col-span-2 relative rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img
                src="/api/placeholder/800/450"
                alt="Featured Game"
                className="w-full h-96 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="mb-2">
                  <span className="bg-[#EB6440] text-black font-bold px-2 py-1 rounded text-xs uppercase">
                    Breaking
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  Elder Scrolls VI: First Look and Everything We Know
                </h2>
                <p className="text-gray-200 mb-4">
                  Bethesda finally reveals gameplay footage and details on their
                  most anticipated title.
                </p>
                <div className="flex items-center text-sm">
                  <img
                    src="/api/placeholder/32/32"
                    alt="Author"
                    className="rounded-full h-8 w-8 mr-2"
                  />
                  <span>By Alex Johnson • March 12, 2025</span>
                </div>
              </div>
            </div>

            {/* Secondary Featured Articles */}
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg overflow-hidden group">
                <div className="relative">
                  <img
                    src="/api/placeholder/400/200"
                    alt="Game News"
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>
                <div className="p-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs uppercase">
                    Review
                  </span>
                  <h3 className="text-xl font-bold mt-2">
                    Starfield New DLC: Our Verdict
                  </h3>
                  <p className="text-gray-300 mt-1 text-sm">
                    The new expansion introduces amazing content but has some
                    flaws.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg overflow-hidden group">
                <div className="relative">
                  <img
                    src="/api/placeholder/400/200"
                    alt="Game News"
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>
                <div className="p-4">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs uppercase">
                    Guide
                  </span>
                  <h3 className="text-xl font-bold mt-2">
                    Elden Ring: Hidden Bosses Guide
                  </h3>
                  <p className="text-gray-300 mt-1 text-sm">
                    Discover the secret bosses you may have missed in your
                    playthrough.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
cxxxx
      
      <LatestNews />
    <UpcomingReleases/>

      
    </div>
  );
};

export default Home;
