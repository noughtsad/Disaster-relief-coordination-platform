import React, { useState, useContext } from "react";
import { useSelector } from 'react-redux';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye 
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const ManageDonationsSection = () => {
  const { theme } = useContext(ThemeContext);
  const { donations } = useSelector((state) => state.donations);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1
          className={`text-3xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Manage Donations
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Donation
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
              theme === "light"
                ? "bg-white border-gray-300"
                : "bg-gray-800 border-gray-600 text-white"
            }`}
          />
        </div>
        <button
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
            theme === "light"
              ? "border-gray-300 hover:bg-gray-50"
              : "border-gray-600 hover:bg-gray-700 text-white"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Donations Table */}
      <div
        className={`rounded-xl shadow overflow-hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <table className="w-full">
          <thead
            className={`${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`}
          >
            <tr>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Donor
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Amount/Items
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Campaign
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Date
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              theme === "light" ? "divide-gray-200" : "divide-gray-700"
            }`}
          >
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {donation.donor}
                </td>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {donation.type === "Money"
                    ? `$${donation.amount}`
                    : `${donation.amount} ${donation.type}`}
                </td>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {donation.campaign}
                </td>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {donation.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      donation.status === "Received"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonationsSection;