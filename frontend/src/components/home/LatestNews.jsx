import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles"); // Correct API URL
        console.log("Fetched data:", response.data); // Log the fetched data to check its structure
        if (Array.isArray(response.data.articles)) {
          setNews(response.data.articles); // Access articles array from the response
        } else {
          console.error("Fetched data is not an array", response.data);
        }
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <a
          href="/articles"
          className="flex items-center text-[#497174] hover:text-[#497174] font-medium"
        >
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(news) &&
          news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="relative">
                <img
                  src={item.images[0]} // Assuming images is an array
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#497174] text-white px-2 py-1 rounded text-xs uppercase">
                    News
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.content.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-500">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>{" "}
                    {/* Format the date */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default LatestNews;
