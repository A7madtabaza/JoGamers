import React from "react";

function PublisherMessages() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">Messages</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64 shadow-sm"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm">
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="flex items-center justify-center p-16 text-center">
          <div>
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No messages yet</h3>
            <p className="mt-3 text-gray-500">Messages from your readers will appear here.</p>
            <button className="mt-6 bg-green-50 text-green-600 px-6 py-3 rounded-lg border border-green-100 hover:bg-green-100 transition-colors duration-300 font-medium">
              Send a test message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublisherMessages;
