import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import ArticlesDashboard from "./ArticlesDashboard";
import CreateArticle from "./CreateArticle";
import CreateRelease from "./CreateRelease";
import UpcomingReleasesDashboard from "./UpcomingReleasesDashboard";
import PublisherReports from "./PublisherReports";
import PublisherMessages from "./PublisherMessages";

function Publisher() {
  const [activeTab, setActiveTab] = useState("articles");

  const renderTabContent = () => {
    switch (activeTab) {
      case "articles":
        return <ArticlesDashboard />;
      case "create-article":
        return <CreateArticle />;
      case "create-release":
        return <CreateRelease />;
      case "upcoming":
        return <UpcomingReleasesDashboard />;
      case "reports":
        return <PublisherReports />;
      case "messages":
        return <PublisherMessages />;
      default:
        return <ArticlesDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Publisher Header */}
          <div className="bg-gradient-to-r from-[#EB6440] to-[#497174] px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Publisher Dashboard</h1>
          </div>

          {/* Publisher Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6 -mb-px">
              <TabButton label="Articles" tab="articles" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Create Article" tab="create-article" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Create Release" tab="create-release" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Upcoming Releases" tab="upcoming" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Reports" tab="reports" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Messages" tab="messages" activeTab={activeTab} setActiveTab={setActiveTab} />
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

// TabButton Component
const TabButton = ({ label, tab, activeTab, setActiveTab }) => (
  <button
    className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
      activeTab === tab
        ? "border-b-2 border-[#EB6440] text-[#EB6440]"
        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
    onClick={() => setActiveTab(tab)}
  >
    {label}
  </button>
);

export default Publisher;
