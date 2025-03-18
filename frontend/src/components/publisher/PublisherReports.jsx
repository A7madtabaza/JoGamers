import React from "react";
import StatCard from "./StatCard";

function PublisherReports() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-green-500 pb-2">Performance Reports</h2>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm">
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <StatCard title="Total Views" value="12,456" change="+8.2%" positive={true} />
        <StatCard title="Avg. Read Time" value="3:24" change="-1.5%" positive={false} />
        <StatCard title="User Engagement" value="67%" change="+5.3%" positive={true} />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance by Article</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-l-lg">
                  Article
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-r-lg">
                  Avg. Read Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">Tech Revolution in 2025</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">8,245</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">78%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">4:12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PublisherReports;
