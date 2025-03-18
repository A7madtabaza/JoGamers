import React from "react";

function StatCard({ title, value, change, positive }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
      <div className="flex items-baseline mt-3">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <span
          className={`ml-3 text-sm font-medium ${positive ? "text-green-600 bg-green-50 border border-green-100" : "text-red-600 bg-red-50 border border-red-100"} px-2 py-1 rounded-full`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

export default StatCard;
